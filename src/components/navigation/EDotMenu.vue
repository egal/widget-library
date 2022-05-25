<template>
  <div
    v-click-outside="close"
    class="dots-menu"
    :class="[`dots-menu--${mergedData.size}`, { disabled: mergedData.disabled }]"
    :style="getStyleVars"
  >
    <BootstrapIcon
      icon="three-dots"
      class="three-dots"
      :class="{ vertical: mergedData.vertical }"
      @click="toggleDotMenu"
    />

    <div class="menu" :class="{ hidden: !computedIsMenuOpen || mergedData.disabled }">
      <div
        v-for="(item, idx) in mergedData.items"
        :key="item.label + idx"
        class="menu__item"
        :class="{ divider: item.label === 'divider' }"
        @click="handleItemClick(item)"
      >
        <div class="menu__item-wrapper" v-if="item.label !== 'divider'">
          <span class="text">
            <BootstrapIcon class="menu__icon" :icon="item.icon" v-if="item.icon" />
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import vClickOutside from 'click-outside-vue3'

export default defineComponent({
  name: 'EDotMenu',
  components: {
    BootstrapIcon,
  },
  emits: ['open', 'close'],
  directives: {
    clickOutside: vClickOutside.directive,
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
  data() {
    return {
      isMenuOpen: false,
    }
  },
  computed: {
    computedIsMenuOpen() {
      return this.isMenuOpen
    },
    mergedData() {
      return Object.assign(
        {
          items: [],
          vertical: true,
          disabled: false,
          isOpen: false,
          size: 'md',
        },
        this.data,
      )
    },

    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--menu-items-color': this.styleConfig?.textColor || '#2D3748',
        '--font-weight': this.styleConfig?.fontWeight || 500,
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--background-disabled-color': this.styleConfig?.disabled?.backgroundColor || '#EDF2F7',
        '--dots-icon-color': this.styleConfig?.iconColor || '#4A5568',
        '--dots-icon-disabled-color': this.styleConfig?.disabled?.iconColor || '#A0AEC0',
        '--menu-item-background-hover': this.styleConfig?.backgroundHover || '#EDF2F7',
      }
    },
  },
  mounted() {
    this.isMenuOpen = this.mergedData.isOpen
  },
  methods: {
    handleItemClick(item) {
      item.onClickHandler()
      this.close()
    },
    close() {
      this.$emit('close')
      this.isMenuOpen = false
    },

    toggleDotMenu() {
      if (this.mergedData.disabled) {
        return
      }
      if (!this.isMenuOpen) {
        this.$emit('open')
        this.isMenuOpen = true
      } else {
        this.close()
      }
    },
  },
  watch: {
    'mergedData.isOpen'(value) {
      this.isMenuOpen = value
    },
  },
})
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.dots-menu {
  position: relative;
  font-weight: var(--font-weight);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family);
  background: var(--background-color);
  border: 0.5px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }

  .three-dots {
    margin: 0;
    color: var(--dots-icon-color);
    transition: color 0.07s;
    font-size: 24px;

    &.vertical {
      transform: rotate(90deg);
    }
  }

  &.disabled {
    cursor: default;
    background-color: var(--menu-item-background-hover);

    .three-dots {
      color: var(--dots-icon-disabled-color);

      &:hover {
        cursor: default;
      }
    }
  }

  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 3;
    margin-top: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    box-shadow: $shadow-sm;
    border-radius: 8px;
    color: var(--menu-items-color);
    transition: 0.2s all;

    .divider {
      width: 100%;
      height: 1px;
      background-color: #e2e8f0;
      padding: 0;
      margin-top: 4px;
      margin-bottom: 4px;
    }

    &.hidden {
      display: none;
    }

    &__item {
      color: var(--menu-items-color);
      padding: 9px 8px;
      border-radius: 4px;

      &-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .text {
        display: flex;
        align-items: center;
      }

      &:hover {
        background-color: var(--menu-item-background-hover);
        cursor: pointer;
      }
    }

    &__icon {
      margin-right: 8px;
      margin-bottom: 0;
    }
  }

  .check__icon {
    margin: 0 0 0 8px;
    color: #66cb9f;
  }

  &--sm {
    width: 24px;
    height: 24px;
    font-size: 10px;

    .bi.three-dots {
      font-size: 16px;
    }

    .menu {
      padding: 11px 7px;
      min-width: 108px;
    }

    .menu__item {
      padding: 5px;
    }

    .bi.menu__icon {
      width: 12px;
      height: 12px;
    }
    .check__icon {
      width: 12px;
      height: 12px;
    }
  }

  &--md {
    width: 28px;
    height: 28px;
    font-size: 12px;

    .bi.three-dots {
      font-size: 18px;
    }

    .menu {
      padding: 14px 5px;
      min-width: 140px;
    }

    .menu__item {
      padding: 7px;
    }

    .bi.menu__icon {
      width: 14px;
      height: 14px;
    }
    .check__icon {
      width: 19px;
      height: 15px;
    }
  }

  &--lg {
    width: 32px;
    height: 32px;
    font-size: 14px;

    .menu {
      padding: 12px 16px;
      min-width: 202px;
    }

    .menu__item {
      padding: 8px;
    }

    .bi.menu__icon {
      width: 14px;
      height: 14px;
    }
    .check__icon {
      width: 24px;
      height: 18px;
    }
  }
}
</style>
