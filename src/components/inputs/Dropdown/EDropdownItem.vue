<template>
  <div
    class="dropdown-item"
    :style="getStyleVars"
    :class="[{ active: isActive(option) }, `dropdown-item--${size}`]"
    v-for="option in filteredOptions"
    @click.stop="$emit('select', option)"
    @touchstart.prevent="$emit('select', option)"
  >
    <div class="start">
      <b-icon :class="['icon', 'icon--left']" :icon="iconLeft" v-if="iconLeft" />
      <span>{{ option[shownKey] }}</span>
    </div>

    <div class="end">
      <b-icon :class="['icon', 'icon--right']" :icon="iconRight" v-if="iconRight" />
      <span class="badge" v-if="option[shownBadgeKey]">{{ option[shownBadgeKey] }}</span>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'EDropdownItem',
  components: {
    BIcon: BootstrapIcon,
  },
  props: {
    styleConfig: {
      type: Object,
      default: () => {},
    },
    filteredOptions: {
      type: Array,
      default: () => [],
    },
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    shownKey: {
      type: String,
      default: 'name',
    },
    shownBadgeKey: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  emits: ['select', ''],
  data() {
    return {}
  },
  computed: {
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--option-color': this.styleConfig?.optionColor || '#2d3748',
        '--option-hover-background-color':
          this.styleConfig?.optionHoverBackgroundColor || '#edf2f7',
        '--option-font-weight': this.styleConfig?.optionFontWeight || 400,
        '--active-background-color': this.styleConfig?.activeBackgroundColor || '#3385ff',
        '--active-option-color': this.styleConfig?.activeOptionColor || '#ffffff',
        '--group-name-color': this.styleConfig?.groupNameColor || '#a0aec0',
        '--group-name-font-weight': this.styleConfig?.groupNameFontWeight || 700,
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--box-shadow':
          this.styleConfig?.boxShadow ||
          '0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)',
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    /**
     * Return true if option is selected
     * @param option
     */
    isActive(option) {
      if (Array.isArray(this.value)) {
        return this.value.findIndex((item) => item[this.shownKey] === option[this.shownKey]) !== -1
      }

      return this.value[this.shownKey] === option[this.shownKey]
    },
  },
  watch: {},
}
</script>

<style scoped lang="scss">
@import '@/assets/variables';

.dropdown-item {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.2s all ease;
  color: var(--option-color);
  width: 100%;
  box-sizing: border-box;
  font-weight: var(--option-font-weight);
  margin-bottom: 4px;

  // ? todo
  //font-family: var(--font-family);

  &:hover {
    background-color: var(--option-hover-background-color);
  }

  .icon {
    color: var(--option-color);

    &--left {
      margin-right: 8px;
    }
  }

  .badge {
    margin-left: 8px;
    background-color: $gray-200;
    border-radius: 24px;
    padding: 0 6px;
    color: $gray-800;
    font-size: 12px;
    line-height: 15px;
    font-weight: 400;
  }

  &--empty {
    cursor: default;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: initial;
    }
  }

  &.active {
    background-color: var(--active-background-color);
    color: var(--active-option-color);

    .icon {
      color: var(--active-option-color);
    }
  }

  &--lg {
    font-size: 16px;
    margin-bottom: 6px;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
  &--md {
    font-size: 14px;
    margin-bottom: 2px;

    .icon {
      width: 16px;
      height: 16px;
    }
  }
  &--sm {
    font-size: 12px;

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  // todo check styles XS
  &--xs {
    font-size: 10px;

    .icon {
      width: 10px;
      height: 10px;
    }

    .badge {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
