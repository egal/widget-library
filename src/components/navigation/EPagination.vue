<template>
  <div
    :class="`pagination --size-${size || 'md'} --style-${componentStyle || 'normal'}`"
    :style="getVars"
  >
    <div class="pagination__left-arrow">
      <BootstrapIcon icon="chevron-left" class="pagination__left-arrow-icon" />
      <p>{{ leftArrowLabel }}</p>
    </div>
    <ul class="pagination__num-pages">
      <template v-for="page in numberOfPages" :key="page">
        <li
          v-if="isInPageGroup(page)"
          @click="setPage(page)"
          :class="{ '--active': page === currentPage }"
        >
          {{ page }}
        </li>
        <li
          v-else-if="[2, numberOfPages - 1].includes(page)"
          @click="setPage(page > currentPage ? currentPage + 3 : currentPage - 3)"
        >
          ...
        </li>
      </template>
    </ul>
    <div class="pagination__right-arrow">
      <p>{{ rightArrowLabel }}</p>
      <BootstrapIcon icon="chevron-right" class="pagination__right-arrow-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, computed } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import { variables, getFont, getFontWeight } from '@/helpers/configNavigation'

const emit = defineEmits<{ (e: 'update:modelValue', page: number): void }>()

type Props = {
  numberOfPages: number
  modelValue: number
  leftArrowLabel?: string
  rightArrowLabel?: string
  size?: 'sm' | 'md' | 'lg'
  componentStyle?: 'normal' | 'light'
  font?: 'Inter' | 'Open Sans' | 'Raleway'
  weight?: 'medium' | 'regular' | 'bold'
  color?: string
  activeColor?: string
  activeBackgroundColor?: string
  borderColor?: string
}

const props = defineProps<Props>()

const {
  numberOfPages,
  modelValue,
  leftArrowLabel,
  rightArrowLabel,
  size,
  componentStyle,
  font,
  weight,
  color,
  activeColor,
  activeBackgroundColor,
  borderColor,
} = toRefs(props)

const currentPage = ref(modelValue.value)

const setPage = (page: number): void => {
  currentPage.value = page
  emit('update:modelValue', page)
}

const isInPageGroup = (page: number): boolean =>
  [currentPage.value - 1, currentPage.value, currentPage.value + 1].includes(page) ||
  (currentPage.value < 4 && page <= 4) ||
  (currentPage.value > numberOfPages.value - 3 && page >= numberOfPages.value - 3) ||
  page === 1 ||
  page === numberOfPages.value

const getVars = computed(() => ({
  '--border-color': borderColor?.value || variables.gray300,
  '--color': color?.value || variables.gray600,
  '--active-color': activeColor?.value || variables.primaryAccent,
  '--active-background-color': activeBackgroundColor?.value || variables.accentOpacity1,
  '--font': getFont(font?.value),
  '--font-weight': getFontWeight(weight?.value),
}))
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.pagination {
  display: flex;
  width: fit-content;
  border: 1px solid var(--border-color);
  color: var(--color);
  font-family: var(--font);
  font-weight: var(--font-weight);
  padding: 9px 10px;
  border-radius: $all-sides-small;

  &__num-pages {
    margin: 0;
    padding: 0;
    display: flex;
    align-content: center;
    list-style: none;
    gap: 6px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;
      cursor: pointer;
      user-select: none;

      &.--active,
      &:hover {
        background: var(--active-background-color);
        border-radius: 2px;
        color: var(--active-color);
      }
    }
  }

  &__left-arrow,
  &__right-arrow {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &-icon {
      margin-bottom: 0;
    }

    p {
      padding: 0;
      margin: 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 1px;
      height: 11px;
      background: var(--border-color);
      transform: translateY(-50%);
    }
  }

  &__left-arrow {
    p {
      margin-left: 4px;
    }

    &::after {
      right: 0;
    }
  }
  &__right-arrow {
    p {
      margin-right: 4px;
    }

    &::after {
      left: 0;
    }
  }

  &.--size {
    &-lg {
      padding: 8px 10px;
      font-size: 12px;
      line-height: 12px;

      .pagination__left-arrow {
        padding-right: 12px;
        margin-right: 12px;

        &::after {
          height: 11px;
        }
      }

      .pagination__right-arrow {
        padding-left: 12px;
        margin-left: 12px;

        &::after {
          height: 11px;
        }
      }

      .pagination__num-pages {
        li {
          height: 18px;
          padding: 0 6px;
        }
      }
    }
    &-md {
      padding: 8px 10px;
      font-size: 12px;
      line-height: 12px;

      .pagination__left-arrow {
        padding-right: 12px;
        margin-right: 12px;

        &::after {
          height: 11px;
        }
      }

      .pagination__right-arrow {
        padding-left: 12px;
        margin-left: 12px;

        &::after {
          height: 11px;
        }
      }

      .pagination__num-pages {
        li {
          height: 18px;
          padding: 0 6px;
        }
      }
    }
    &-sm {
      padding: 6px 8px;
      font-size: 10px;
      line-height: 10px;

      .pagination__left-arrow {
        padding-right: 8px;
        margin-right: 8px;

        &::after {
          height: 11px;
        }
      }

      .pagination__right-arrow {
        padding-left: 8px;
        margin-left: 8px;

        &::after {
          height: 11px;
        }
      }

      .pagination__num-pages {
        li {
          height: 16px;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
