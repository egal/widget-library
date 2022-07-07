<template>
  <div :class="`breadcrumbs --size-${mergedData.size}`" :style="getVars">
    <template v-for="(link, i) in routes.shownRoutes" :key="link.path">
      <div class="breadcrumbs__hidden-container" v-if="routes.hiddenRoutes.length && i === 1">
        <BootstrapIcon
          class="breadcrumbs__show-hidden"
          icon="three-dots"
          @mouseenter="showHiddenRoutes(true)"
          @mouseleave="showHiddenRoutes(false)"
        />
        <EDropdown
          class="breadcrumbs__hidden-routes"
          :options="dropdownOptions"
          v-if="isHiddenRoutesShowing"
          @mouseenter="showHiddenRoutes(true)"
          @mouseleave="showHiddenRoutes(false)"
          @select="pushToRoute"
        ></EDropdown>
        <BootstrapIcon class="breadcrumbs__divider" icon="chevron-right" />
      </div>

      <router-link
        class="breadcrumbs__link"
        :class="{ inactive: !link.path }"
        :to="{ name: link.name, params: link.params }"
      >
        <BootstrapIcon
          class="breadcrumbs__icon breadcrumbs__icon--left"
          :icon="mergedData.leftIcon"
        />
        {{ link.breadcrumb || link.name }}
        <BootstrapIcon
          class="breadcrumbs__icon breadcrumbs__icon--right"
          :icon="mergedData.rightIcon"
        />
        <BootstrapIcon
          class="breadcrumbs__divider"
          icon="chevron-right"
          v-if="i < routes.shownRoutes.length - 1"
        />
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import EDropdown from '@/components/inputs/Dropdown/EDropdown.vue'
import { defineComponent } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'
import { IBreadcrumb } from '@/assets/breadcrumbs/interfaces'

export default defineComponent({
  name: 'EBreadcrumbs',
  components: { BootstrapIcon, EDropdown },
  data() {
    return {
      rawRoutes: [] as IBreadcrumb[],
      isHiddenRoutesShowing: false,
      hiddenRoutesTimeoutId: null as unknown as number,
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          size: 'md',
          leftIcon: '',
          rightIcon: '',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--divider-color': this.styleConfig?.dividerColor || '#a0aec0',
        '--color': this.styleConfig?.color || '#a0aec0',
        '--hover-color': this.styleConfig?.hoverColor || '#718096',
        '--active-color': this.styleConfig?.activeColor || '#2D3748',
        '--font': this.styleConfig?.font || 'Inter',
        '--font-weight': this.styleConfig?.weight || 500,
      }
    },

    /**
     * Разделяет роуты на "скрытые" и "отображаемые"
     * @return {Record<string, IBreadcrumb[]>>} - Объект с разделёнными роутами
     */
    routes(): Record<string, IBreadcrumb[]> {
      const routes = {
        shownRoutes: [] as IBreadcrumb[],
        hiddenRoutes: [] as IBreadcrumb[],
      }

      this.rawRoutes.forEach((route, index) => {
        index === 0 || index > this.rawRoutes.length - 3
          ? routes.shownRoutes.push(route)
          : routes.hiddenRoutes.push(route)
      })

      return routes
    },

    /**
     * Обёртка для использования роутов в дропдауне
     * @return {object}
     */
    dropdownOptions() {
      return this.routes.hiddenRoutes.map((route, index) => {
        return {
          key: index,
          name: route.name,
          value: route,
        }
      })
    },
  },
  mounted() {
    this.$router.isReady().then(() => {
      const currentRawRoute = this.extractBreadcrumbData(
        this.$route.matched[this.$route.matched.length - 1],
      )
      this.rawRoutes = this.generateBreadcrumbs(currentRawRoute)
    })
  },
  methods: {
    /**
     * Основной метод, отвечающий за генерацию хлебных крошек.
     * Путём перебора находятся предыдущие маршруты (на основе текущего), обрабатываются и собираются в итоговый массив breadcrumbs
     * @param currentRoute - Текущий роут
     * @return {IBreadcrumb[]} - Хлебные крошки
     */
    generateBreadcrumbs(currentRoute: IBreadcrumb): IBreadcrumb[] {
      const breadcrumbs: IBreadcrumb[] = []
      const splittedRoute = currentRoute.path.split('/')
      let routeForMatching = currentRoute.path

      // С помощью цикла с конца отсекаются строки вида '/route'
      // и проверяется есть ли такой маршрут
      for (let i = splittedRoute.length - 1; i > 0; i--) {
        const matchedRoute = this.getMatchedRoute(routeForMatching)
        routeForMatching = routeForMatching.replace(`/${splittedRoute[i]}`, '')

        if (!matchedRoute) {
          continue
        }

        // Проверка динамичный ли роут
        if (matchedRoute.path.includes(':')) {
          matchedRoute.params = this.getRouteParams(matchedRoute.path)
        }

        // Обработка шаблона текста хлебной крошки
        if (matchedRoute.breadcrumbTemplate) {
          matchedRoute.breadcrumb = this.getBreadcrumbByTemplate(matchedRoute.breadcrumbTemplate)
        }

        breadcrumbs.push(matchedRoute)
      }

      return breadcrumbs.reverse()
    },

    /**
     * Находит подходящую строку роут из списка и возвращет его. Если подходящего роута нет,
     * то возвращается undefined
     * @param matchingRoutePath - Путь для поиска роута
     * @return {IBreadcrumb | undefined} - Найденый маршрут или undefined
     */
    getMatchedRoute(matchingRoutePath: string): IBreadcrumb | undefined {
      const routes = this.$router.getRoutes()
      const matchedRoute = routes.find((route) => route.path === matchingRoutePath)

      if (!matchedRoute) {
        return
      }

      return this.extractBreadcrumbData(matchedRoute)
    },

    /**
     * Если в meta указано свойство breadcrumb (оно хранит шаблон для хлебной крошки),
     * то на основе этого шаблона генерируется текст хлебной крошки.
     * @param template - Шаблон для хлебной крошки
     * @return {string} - Текст хлебной крошки
     */
    getBreadcrumbByTemplate(template: string): string {
      const paramRegex = /\${(\w+)}/g
      const paramsMatches = [...template.matchAll(paramRegex)]
      let breadcrumbValue = template

      paramsMatches.forEach((match) => {
        let key = match[1]
        breadcrumbValue = breadcrumbValue.replace(paramRegex, this.$route.params[key] as string)
      })

      return breadcrumbValue
    },

    /**
     * Достаёт из пути роута параметры, которые в нём использовались.
     * Таким образом обрабатываются динамические маршруты.
     * @param pathWithParams - Строка с параметрами
     * @return {Record<string, string>>} - Объект параметров конкретного роута
     */
    getRouteParams(pathWithParams: string): Record<string, string> {
      let paramsObj = {}
      const matches = [...pathWithParams.matchAll(/:\w+/g)]
      const paramKeys = matches.map((match) => {
        return match[0].replace(':', '')
      })

      paramKeys.forEach((key) => {
        paramsObj[key] = this.$route.params[key]
      })

      return paramsObj
    },

    /**
     * Принимает объект роута и вытаскивает из него только необходимые
     * для работы свойства
     * @param route - Роут
     * @return {IBreadcrumb} - Объект с необходимыми свойствами
     */
    extractBreadcrumbData(
      route: RouteRecordNormalized | RouteLocationNormalizedLoaded,
    ): IBreadcrumb {
      return {
        path: route.path,
        name: route.name as string,
        params: 'params' in route ? route.params : this.$route.params,
        breadcrumbTemplate: (route.meta.breadcrumb ? route.meta.breadcrumb : '') as string,
        breadcrumb: '',
      }
    },

    /**
     * Обрабатывает события mouseenter/mouseleave на "трёх точках" при наличии скрытых роутов.
     * При наведении меняет флаг отображения дропдауна.
     * @param value - Значение флага, которое нужно установить
     */
    showHiddenRoutes(value: boolean): void {
      if (value) {
        clearTimeout(this.hiddenRoutesTimeoutId)
        this.isHiddenRoutesShowing = true
        return
      }

      this.hiddenRoutesTimeoutId = setTimeout(() => {
        this.isHiddenRoutesShowing = false
      }, 350)
    },

    /**
     * Перенаправляет на указанный роут при выборе какой-либо опции дропдауна
     * @param value - Выбранный роут
     */
    pushToRoute({ value }): void {
      const route: IBreadcrumb = value
      this.isHiddenRoutesShowing = false
      this.$router.push({ name: route.name, params: route.params })
    },
  },
  watch: {
    '$route.fullPath'() {
      const currentRawRoute = this.extractBreadcrumbData(
        this.$route.matched[this.$route.matched.length - 1],
      )
      this.rawRoutes = this.generateBreadcrumbs(currentRawRoute)
    },
  },
})
</script>
<style scoped lang="scss">
@import 'src/assets/variables';

.breadcrumbs {
  font-family: var(--font);
  font-weight: var(--font-weight);
  color: var(--color);
  display: flex;

  &__divider,
  &__icon {
    color: var(--divider-color);
  }

  &__icon {
    &--left {
      margin-right: 8px;
    }
    &--right {
      margin-left: 8px;
    }
  }

  &__show-hidden,
  &__icon,
  &___link {
    transition: 0.07s ease-in-out;
  }

  &__hidden-container {
    position: relative;

    .breadcrumbs__show-hidden {
      width: 16px;
      height: 16px;

      &:hover {
        color: var(--hover-color);
      }
    }
    .breadcrumbs__hidden-routes {
      position: absolute;
    }
  }

  &__link {
    color: var(--color);
    text-decoration: none;

    &:last-child {
      color: var(--active-color);
      cursor: default;

      .breadcrumbs__icon {
        color: var(--active-color);
      }
    }

    &:hover:not(:last-child) {
      color: var(--hover-color);

      .breadcrumbs__icon {
        color: var(--hover-color);
      }
    }
  }

  &.--size {
    &-lg {
      font-size: $p3-font-size;

      .breadcrumbs__show-hidden,
      .breadcrumbs__divider,
      .breadcrumbs__icon {
        width: 20px;
        height: 20px;
      }

      .breadcrumbs__divider {
        margin: 0 18px;
      }
    }
    &-md {
      font-size: $p5-font-size;

      .breadcrumbs__show-hidden,
      .breadcrumbs__divider,
      .breadcrumbs__icon {
        width: 16px;
        height: 16px;
      }

      .breadcrumbs__divider {
        margin: 0 16px;
      }
    }
    &-sm {
      font-size: $p6-font-size;

      .breadcrumbs__show-hidden,
      .breadcrumbs__divider,
      .breadcrumbs__icon {
        width: 14px;
        height: 14px;
      }

      .breadcrumbs__divider {
        margin: 0 14px;
      }
    }
    &-xs {
      font-size: 10px;

      .breadcrumbs__show-hidden,
      .breadcrumbs__divider,
      .breadcrumbs__icon {
        width: 10px;
        height: 10px;
      }

      .breadcrumbs__divider {
        margin: 0 10px;
      }
    }
  }
}
</style>
