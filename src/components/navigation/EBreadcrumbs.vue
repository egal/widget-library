<template>
  <div :class="`breadcrumbs --size-${mergedData.size || 'md'}`" :style="getVars">
    <template v-for="(link, i) in parsedLinks" :key="link.to">
      <router-link class="breadcrumbs__link" :to="link.to">{{ link.name }}</router-link>
      <BootstrapIcon
        class="breadcrumbs__icon"
        icon="chevron-right"
        v-if="i < parsedLinks.length - 1"
      />
    </template>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
export default {
  name: 'EBreadcrumbs',
  components: { BootstrapIcon },
  data() {
    return {
      parsedLinks: [],
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          color: '#0066ff',
          chevronColor: '#a0aec0',
          size: 'md',
          activeColor: '#2d3748',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--chevron-color': this.mergedData.chevronColor,
        '--active-color': this.mergedData.activeColor,
        '--color': this.mergedData.color,
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
  },
  watch: {
    parsedLinks() {
      this.parsedLinks.splice(0, this.parsedLinks.length + 1)
      this.parsedLinks.push(
        ...this.router.currentRoute.value.fullPath
          .split('/')
          .reduce(
            (acc, value, index) => (
              (acc[index] = index === 0 ? [value] : [...acc[index - 1], value]), acc
            ),
            [],
          )
          .map((el) => el.join('/'))
          .map((el) => el)
          .filter((el) => !!el)
          .map((to) => ({
            to,
            name: this.router.getRoutes().filter(({ path }) => path === to)[0].name,
          })),
      )
    },
  },
}
</script>
<style scoped lang="scss">
@import 'src/assets/variables';

.breadcrumbs {
  font-family: var(--font);
  font-weight: var(--font-weight);
  color: var(--color);
  display: flex;

  &__icon {
    color: var(--chevron-color);
  }

  &__link {
    position: relative;
    color: inherit !important;
    text-decoration: none;
    display: block;

    &.router-link-exact-active {
      color: var(--active-color) !important;
    }

    &:not(.router-link-exact-active)::after {
      position: absolute;
      content: '';
      opacity: 0;
      display: block;
      width: calc(100% + 6px);
      height: 1px;
      background: var(--color);
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      transition: opacity 0.1s;
    }

    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &.--size {
    &-sm {
      font-size: $p6-font-size;

      .breadcrumbs__icon {
        margin: 0 12px;
      }
    }
    &-md {
      font-size: $p4-font-size;

      .breadcrumbs__icon {
        margin: 0 10px;
      }
    }
    &-sm {
      font-size: $p3-font-size;

      .breadcrumbs__icon {
        margin: 0 8px;
      }
    }
  }
}
</style>
