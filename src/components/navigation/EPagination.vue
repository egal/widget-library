<template>
  <div
    :class="`pagination --size-${mergedData.size || 'md'} --style-${
      mergedData.componentStyle || 'normal'
    }`"
    :style="getVars"
  >
    <div class="pagination__left-arrow">
      <BootstrapIcon icon="chevron-left" class="pagination__left-arrow-icon" />
      <p>{{ mergedData.leftArrowLabel }}</p>
    </div>
    <ul class="pagination__num-pages">
      <template v-for="page in mergedData.numberOfPages" :key="page">
        <li
          v-if="isInPageGroup(page)"
          @click="setPage(page)"
          :class="{ '--active': page === currentPage }"
        >
          {{ page }}
        </li>
        <li
          v-else-if="[2, mergedData.numberOfPages - 1].includes(page)"
          @click="setPage(page > currentPage ? currentPage + 3 : currentPage - 3)"
        >
          ...
        </li>
      </template>
    </ul>
    <div class="pagination__right-arrow">
      <p>{{ mergedData.rightArrowLabel }}</p>
      <BootstrapIcon icon="chevron-right" class="pagination__right-arrow-icon" />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'EPagination',
  components: { BootstrapIcon },
  data() {
    return {
      currentPage: null,
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:modelValue'],
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
          weight: 'regular',
          color: '#718096',
          activeColor: '#0066ff',
          activeBackgroundColor: '#e5f0ff',
          borderColor: '#e2e8f0',
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
  mounted() {
    this.currentPage = this.mergedData.modelValue
  },
  methods: {
    setPage(page) {
      this.currentPage = page
      this.$emit('update:modelValue', page)
    },
  },
}
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
