<template>
  <div class="wrapper-pagination" :style="getVars">
    <div
      :class="`pagination --size-${mergedData.size || 'md'} --style-${
        mergedData.componentStyle || 'normal'
      } ${minimalisticVersion ? '--select' : ''}`"
    >
      <TransitionGroup name="pagination">
        <div
          class="pagination__left-arrow"
          v-if="currentPage > 1"
          @click="toPrevPage"
          key="left-arrow"
        >
          <BootstrapIcon
            :icon="minimalisticVersion ? 'caret-left-fill' : 'chevron-left'"
            class="pagination__left-arrow-icon"
          />
          <p v-if="!minimalisticVersion">{{ mergedData.leftArrowLabel }}</p>
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
          key="right-arrow"
          v-if="currentPage < mergedData.numberOfPages"
          @click="toNextPage"
        >
          <p v-if="!minimalisticVersion">{{ mergedData.rightArrowLabel }}</p>
          <BootstrapIcon
            :icon="minimalisticVersion ? 'caret-right-fill' : 'chevron-right'"
            class="pagination__right-arrow-icon"
          />
        </div>
      </TransitionGroup>
    </div>

    <div
      v-if="minimalisticVersion"
      class="per-page"
      :class="`--size-${mergedData.size || 'md'} --style-${mergedData.componentStyle || 'normal'}`"
    >
      <p class="per-page__text">Show:</p>
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

export default {
  name: 'EPagination',
  components: { BootstrapIcon, ESelect },
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

    minimalisticVersion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:perPageValue'],
  computed: {
    mergedData() {
      return Object.assign(
        {
          numberOfPages: 10,
          modelValue: 1,
          leftArrowLabel: '',
          rightArrowLabel: '',
          size: 'md',
          componentStyle: 'normal',
          font: 'Open Sans',
          weight: '500',
          color: this.minimalisticVersion ? '#A0AEC0' : '#718096',
          activeColor: '#0066ff',
          activeBackgroundColor: '#e5f0ff',
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
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
  },
  mounted() {
    this.currentPage = this.mergedData.modelValue
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
      this.$emit('update:perPageValue', value)
    },

    isInPageGroup(page) {
      return (
        [this.currentPage - 1, this.currentPage, this.currentPage + 1].includes(page) ||
        (this.currentPage < 4 && page <= 4) ||
        (this.currentPage > this.mergedData.numberOfPages - 3 &&
          page >= this.mergedData.numberOfPages - 3) ||
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
  border: 1px solid var(--border-color);
  color: var(--color);
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
      color: var(--color);
      font-weight: var(--font-weight);

      &.--dots {
        color: var(--active-color);
      }

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

    &:hover {
      cursor: pointer;
      opacity: 1.5;
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
      font-size: 14px;
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

  &.--select {
    border: none;

    .pagination__right-arrow {
      padding-left: 5px;
      margin-left: 5px;
    }

    .pagination__left-arrow {
      padding-right: 5px;
      margin-right: 5px;
    }

    .pagination__right-arrow,
    .pagination__left-arrow {
      padding-bottom: 2px;

      &::after {
        display: none;
      }

      &-icon {
        color: var(--color);
        opacity: 0.7;
      }
    }

    .pagination__num-pages {
      li {
        border-radius: 0;
        padding: 0;
        margin: 0 6px;

        &.--active,
        &:hover {
          background-color: transparent;
          border-bottom: 1.5px solid var(--active-color);
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
