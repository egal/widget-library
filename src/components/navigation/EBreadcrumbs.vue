<template>
  <div :class="`breadcrumbs --size-${mergedData.size || 'md'}`" :style="getVars">
    <template v-for="(link, i) in parsedLinks" :key="link.path">
      <router-link class="breadcrumbs__link" :class="{ inactive: !link.path }" :to="link.path">{{
        link.name
      }}</router-link>

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
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    currentRoute() {
      return this.$router.currentRoute.value
    },
    parsedLinks() {
      return this.flat(this.$router.currentRoute.value)
    },

    mergedData() {
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          color: '#a0aec0',
          chevronColor: '#a0aec0',
          size: 'md',
          activeColor: '#0066ff',
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

  mounted() {},
  methods: {
    navigate(link) {
      this.$router.push({ path: link.path })
    },

    formatMetaToLinkObject(element) {
      if (typeof element === 'object') {
        return element
      } else {
        return {
          name: element,
          path: '',
        }
      }
    },
    flat(obj) {
      let result = []

      if (obj?.meta?.breadcrumbs) {
        if (Array.isArray(obj.meta.breadcrumbs)) {
          obj.meta.breadcrumbs.forEach((item) => {
            result.push(this.formatMetaToLinkObject(item))
          })
        } else {
          result.push(this.formatMetaToLinkObject(obj.meta.breadcrumbs))
        }
      }

      result.push(obj)
      return result
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
    color: var(--color);
    text-decoration: none;
    display: block;

    &:last-child {
      color: var(--active-color) !important;
      cursor: default;
    }

    &.inactive {
      cursor: default;
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
