<template>
  <div
    class="overflow-container"
    :class="[`overflow-container--${mergedData.size}`]"
    :style="{ ...getStyleVars, position: 'relative' }"
  >
    <div class="dots-menu" :class="[{ disabled: mergedData.disabled }]" @click="toggleDotMenu">
      <BootstrapIcon
        icon="three-dots"
        class="three-dots"
        :class="{ vertical: mergedData.vertical }"
      />
    </div>
    <div
      class="menu"
      :class="{
        hidden: !computedIsMenuOpen || mergedData.disabled,
        left: mergedData.position === 'left',
        right: mergedData.position === 'right',
      }"
    >
      <div
        v-for="(item, idx) in mergedData.items"
        :key="item.label + idx"
        class="menu__item"
        :class="{ divider: item?.label === 'divider', disabled: item?.isDisabled }"
        @click="handleItemClick(item)"
      >
        <div class="menu__item-wrapper" v-if="item?.label !== 'divider'">
          <span class="text">
            <BootstrapIcon class="menu__icon" :icon="item.icon" v-if="item.icon" />
            {{ item.label }}
            <BootstrapIcon class="menu__icon right" :icon="item.iconRight" v-if="item.iconRight" />
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
          items: [
            {
              label: 'Default',
              icon: 'archive',
              iconRight: 'archive',
              onClickHandler: () => {},
            },
            {
              label: 'divider',
            },
            { label: 'Disabled', iconLeft: 'archive', iconRight: 'archive', isDisabled: true },
          ],
          vertical: true,
          disabled: false,
          isOpen: false,
          size: 'md',
          position: 'right',
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
        '--background-disabled-color': this.styleConfig?.disabled?.backgroundColor || '#fff',
        '--dots-icon-color': this.styleConfig?.iconColor || '#2D3748',
        '--dots-icon-disabled-color': this.styleConfig?.disabled?.iconColor || '#CBD5E0',
        '--menu-item-background-hover': this.styleConfig?.backgroundHover || '#E2E8F0',
        '--menu-item-background-pressed': this.styleConfig?.backgroundPressed || '#cbd5e0',
      }
    },
  },
  mounted() {
    this.isMenuOpen = this.mergedData.isOpen
  },
  methods: {
    handleItemClick(item) {
      if (item?.onClickHandler && !item?.isDisabled) {
        item.onClickHandler()
      }
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

.overflow-container {
  position: relative;
  font-family: var(--font-family);
  &--lg {
    width: 48px;
    height: 48px;
    font-size: 14px;

    .menu {
      padding: 8px 18px;
      min-width: 202px;
    }

    .menu__item {
      padding: 8px;
    }

    .bi.menu__icon {
      width: 20px;
      height: 16px;
    }
  }
  &--md {
    width: 40px;
    height: 40px;
    font-size: 12px;
    border-radius: 6px;

    .bi.three-dots {
      font-size: 18px;
    }

    .menu {
      padding: 8px 16px;
      min-width: 140px;
    }

    .menu__item {
      padding: 8px;
    }

    .bi.menu__icon {
      width: 16px;
      height: 14px;
    }
  }
  &--sm {
    width: 32px;
    height: 32px;
    font-size: 12px;
    border-radius: 4px;

    .bi.three-dots {
      font-size: 16px;
    }

    .menu {
      padding: 8px 14px;
      min-width: 108px;
    }

    .menu__item {
      padding: 6px;
    }

    .bi.menu__icon {
      width: 12px;
      height: 12px;
    }
  }
  &--xs {
    width: 24px;
    height: 24px;
    font-size: 10px;
    border-radius: 4px;

    .bi.three-dots {
      font-size: 14px;
    }

    .menu {
      padding: 8px 12px;
      min-width: 108px;
    }

    .menu__item {
      padding: 4px;
    }

    .bi.menu__icon {
      width: 10px;
      height: 10px;
    }
  }
}

.dots-menu {
  font-weight: var(--font-weight);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--background-color);
  border: 1px solid $gray-300;
  transition: all 0.2s;

  &:hover {
    background-color: $gray-300;
    cursor: pointer;
  }

  &:active {
    background-color: $gray-400;
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
    background-color: #fff;

    .three-dots {
      color: var(--dots-icon-disabled-color);

      &:hover {
        cursor: default;
      }
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

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }
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
    }

    .text {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &:hover {
      background-color: var(--menu-item-background-hover);
      cursor: pointer;
    }

    &:active {
      background-color: var(--menu-item-background-pressed);
    }

    &.disabled {
      cursor: default;
      color: $gray-400;

      &:hover {
        background-color: inherit;
      }
    }
  }

  &__icon {
    margin-right: 8px;
    margin-bottom: 0;

    &.right {
      margin-left: auto;
      margin-right: 0;
    }
  }
}
</style>
