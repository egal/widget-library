<template>
  <div :class="`breadcrumbs --size-${mergedData.size || 'md'}`" :style="getVars">
    <template v-for="(link, i) in currentBreadcrumbs" :key=" link.to">
      <router-link class="breadcrumbs__link" :to="  link.to">{{ link.name }}</router-link>

      <BootstrapIcon
        class="breadcrumbs__icon"
        icon="chevron-right"
        v-if="i < currentBreadcrumbs.length - 1"
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
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    currentBreadcrumbs() {
      return this.flatParent(this.parsedLinks.filter(link => link.to === this.$route.path)).reverse()
    },

    parsedLinks() {
      return this.flat(this.data.links)
    },

    mergedData() {
      //todo styles
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          color: '#2d3748',
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

  mounted() {
  },
  methods: {
    navigate(link) {
      this.$router.push({path: link.path})
    },

    flatParent(array) {
      let result = [];
      array.forEach( (a) => {
        result.push(a);
        if (!a.parent) {
          return
        }
        if (a.parent) {
          result = result.concat(this.flatParent(a.parent));
        }
      });

      return result
    },

    flat(array) {
      let result = [];
      array.forEach( (a) => {

        result.push(a);
        if (!a.links) {
          return
        }
        if (a.links) {
          result = result.concat(this.flat(a.links.map(i => {
            return { ...i, parent: [a] }
          })));
        }
      });

      return result;
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