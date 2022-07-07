<template>
  <div class="wrapper-pagination" :style="getVars">
    <div :class="`pagination --size-${mergedData.size || 'md'} --style-${mergedData.variant}`">
      <TransitionGroup name="pagination">
        <div
          class="pagination__left-arrow"
          :class="{ disabled: currentPage === 1 }"
          v-if="mergedData.numberOfPages > 10"
          @click="toPrevPage"
          key="left-arrow"
        >
          <BootstrapIcon icon="chevron-left" class="pagination__left-arrow-icon" />
        </div>

        <ul class="pagination__num-pages" key="pages">
          <template v-for="page in mergedData.numberOfPages" :key="page">
            <li
              v-if="isInPageGroup(page)"
              @click="setPage(page)"
              :class="{ '--active': page === currentPage }"
            >
              {{ page }}
            </li>
            <li
              class="--dots"
              v-else-if="[2, mergedData.numberOfPages - 1].includes(page)"
              @click="setPage(page > currentPage ? currentPage + 3 : currentPage - 3)"
            >
              ...
            </li>
          </template>
        </ul>

        <div
          class="pagination__right-arrow"
          :class="{ disabled: currentPage === mergedData.numberOfPages }"
          key="right-arrow"
          v-if="mergedData.numberOfPages > 10"
          @click="toNextPage"
        >
          <BootstrapIcon icon="chevron-right" class="pagination__right-arrow-icon" />
        </div>
      </TransitionGroup>
    </div>

    <div
      v-if="mergedData.isPerPageSelect || minimalisticVersion"
      class="per-page"
      :class="`--size-${mergedData.size || 'md'}`"
    >
      <p class="per-page__text" v-if="mergedData.perPageLabel">{{ mergedData.perPageLabel }}</p>
      <ESelect
        @update:modelValue="setPerPage"
        :data="{
          placeholder: mergedData.perPage,
          clearable: false,
          searchable: false,
          multiple: false,
          options: mergedData.selectOptions,
          dropdownPosition: mergedData.dropdownPosition,
          modelValue: { name: mergedData.perPage },
          size: mergedData.size,
          showFilled: false,
        }"
        :style-config="{
          placeholderFontSize:
            mergedData.size === 'lg' ? '14px' : mergedData.size === 'md' ? '12px' : '10px',
          fontFamily: mergedData.font,
          ...selectStyleConfig,
        }"
        :dropdown-style-config="dropdownStyleConfig"
      />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ESelect from '@/components/inputs/Select/ESelect'
import EInput from '@/components/inputs/Input/EInput'
import EButton from '@/components/togglers/EButton'

export default {
  name: 'EPagination',
  components: { BootstrapIcon, ESelect, EInput, EButton },
  data() {
    return {
      currentPage: null,
    }
  },
  props: {
    selectStyleConfig: {
      type: Object,
      default: () => {},
    },
    dropdownStyleConfig: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
    // оставлено для совместимости со старой версией
    minimalisticVersion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:perPageValue'],
  computed: {
    modelValueCurrentPage() {
      return this.mergedData.modelValue
    },

    mergedData() {
      return Object.assign(
        {
          numberOfPages: 10,
          modelValue: 1,
          size: 'md',
          font: 'Open Sans',
          weight: '500',
          color: '#2D3748',
          activeColor: '#0066ff',
          activeBackgroundColor: '#DEEBFC',
          hoverBackgroundColor: '#A6C8FA',
          pressedBackgroundColor: '#76ACFB',
          borderColor: '#e2e8f0',
          perPage: 10,
          selectOptions: [
            {
              name: 5,
            },
            {
              name: 10,
            },
            {
              name: 25,
            },
            {
              name: 50,
            },
          ],
          dropdownPosition: 'bottom',
          isPerPageSelect: false,
          variant: 'primary',
          perPageLabel: 'Show:',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--border-color': this.mergedData.borderColor,
        '--color': this.mergedData.color,
        '--active-color': this.mergedData.activeColor,
        '--active-background-color': this.mergedData.activeBackgroundColor,
        '--hover-background-color': this.mergedData.hoverBackgroundColor,
        '--pressed-background-color': this.mergedData.pressedBackgroundColor,
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
  },
  mounted() {
    this.currentPage = this.mergedData.modelValue
  },
  watch: {
    modelValueCurrentPage(value) {
      this.currentPage = value
    },
  },
  methods: {
    toNextPage() {
      if (this.currentPage >= this.mergedData.numberOfPages) {
        return
      }

      this.setPage(this.currentPage + 1)
    },

    toPrevPage() {
      if (this.currentPage <= 1) {
        return
      }

      this.setPage(this.currentPage - 1)
    },

    setPage(page) {
      this.currentPage = page
      this.$emit('update:modelValue', page)
    },

    setPerPage(value) {
      this.setPage(1)
      this.$emit('update:perPageValue', value)
    },

    isInPageGroup(page) {
      const pagesNearCurrent = [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ].includes(page)

      const maxPagesAmount = this.currentPage < 7 && page <= 7

      const lastPages =
        this.currentPage > this.mergedData.numberOfPages - 6 &&
        page >= this.mergedData.numberOfPages - 6

      return (
        pagesNearCurrent ||
        maxPagesAmount ||
        lastPages ||
        page === 1 ||
        page === this.mergedData.numberOfPages
      )
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/variables';

.wrapper-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font);
}

.pagination {
  display: flex;
  width: fit-content;
  color: var(--color);
  font-weight: var(--font-weight);
  border-radius: 8px;
  line-height: 120%;

  &__num-pages {
    margin: 0;
    padding: 0;
    display: flex;
    align-content: center;
    list-style: none;
    gap: 4px;
    transition: 0.2s all ease;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      color: var(--color);
      font-weight: var(--font-weight);
      border-radius: 4px;

      &.--dots {
        color: var(--color);
      }

      &.--active {
        background: var(--active-background-color);
        color: var(--active-color);
      }

      &:hover {
        background: var(--hover-background-color);
        color: var(--color);
      }

      &:active {
        background-color: var(--pressed-background-color);
      }
    }
  }

  &__left-arrow,
  &__right-arrow {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    &-icon {
      margin-bottom: 0;
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

    &:hover {
      background: var(--hover-background-color);
      color: var(--color);
      cursor: pointer;
    }

    &:active {
      background-color: var(--pressed-background-color);
    }

    &.disabled > svg {
      color: #cbd5e0;
      cursor: default;
    }
  }

  &__left-arrow {
    &::after {
      right: 0;
    }
  }

  &__right-arrow {
    &::after {
      left: 0;
    }
  }

  &.--style-primary {
    border: 1px solid var(--border-color);
  }
  &.--style-clear {
  }

  &.--size {
    &-lg {
      padding: 8px 18px;
      font-size: 16px;

      .pagination__left-arrow,
      .pagination__right-arrow {
        width: 32px;
        height: 32px;
        &::after {
          height: 20px;
        }
      }

      .pagination__left-arrow {
        margin-right: 16px;
        &::after {
          right: -8px;
        }
      }
      .pagination__right-arrow {
        margin-left: 16px;
        &::after {
          left: -8px;
        }
      }

      .pagination__num-pages {
        li {
          height: 32px;
          min-width: 20px;
          padding: 0 6px;
        }
      }
    }

    &-md {
      padding: 6px 16px;
      font-size: 14px;

      .pagination__left-arrow,
      .pagination__right-arrow {
        width: 28px;
        height: 28px;
        &::after {
          height: 16px;
        }
      }

      .pagination__left-arrow {
        margin-right: 16px;
        &::after {
          right: -8px;
        }
      }
      .pagination__right-arrow {
        margin-left: 16px;
        &::after {
          left: -8px;
        }
      }

      .pagination__num-pages {
        li {
          height: 28px;
          min-width: 18px;
          padding: 0 5px;
        }
      }
    }

    &-sm {
      padding: 4px 14px;
      font-size: 12px;

      .pagination__left-arrow,
      .pagination__right-arrow {
        height: 24px;
        width: 24px;
        border-radius: 3px;
        &::after {
          height: 14px;
        }
      }

      .pagination__left-arrow {
        margin-right: 12px;
        &::after {
          right: -6px;
        }
      }
      .pagination__right-arrow {
        margin-left: 12px;
        &::after {
          left: -6px;
        }
      }

      .pagination__num-pages {
        li {
          height: 24px;
          min-width: 16px;
          padding: 0 4px;
          border-radius: 3px;
        }
      }
    }

    &-xs {
      padding: 4px 10px;
      font-size: 10px;

      .pagination__left-arrow,
      .pagination__right-arrow {
        height: 16px;
        width: 16px;
        border-radius: 2px;
        &::after {
          height: 10px;
        }
      }

      .pagination__left-arrow {
        margin-right: 8px;
        &::after {
          right: -4px;
        }
      }
      .pagination__right-arrow {
        margin-left: 8px;
        &::after {
          left: -4px;
        }
      }

      .pagination__num-pages {
        li {
          height: 16px;
          min-width: 12px;
          padding: 0 2px;
          border-radius: 2px;
        }
      }
    }
  }
}

.per-page {
  display: flex;
  align-items: center;

  &__text {
    margin-right: 12px;
    font-weight: var(--font-weight);
    color: $gray-500;
  }

  &.--size {
    &-lg {
      font-size: 14px;

      .select {
        width: 84px;
      }
    }
    &-md {
      font-size: 12px;

      .select {
        width: 71px;
      }
    }
    &-sm {
      font-size: 10px;

      .select {
        width: 61px;
      }
    }
  }
}

:deep(.select-container) {
  &:hover {
    cursor: pointer;
  }
}

.pagination-move,
.pagination-enter-active,
.pagination-leave-active {
  transition: all 0.3s cubic-bezier(0.28, 0.67, 0.25, 0.9);
}

.pagination-enter-from,
.pagination-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.pagination-leave-active {
  position: absolute;
}
</style>
