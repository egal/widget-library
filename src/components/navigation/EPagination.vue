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

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'EPagination',
  components: { BootstrapIcon },
  data() {
    return {
      currentPage: this.modelValue,
    }
  },
  props: {
    numberOfPages: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    leftArrowLabel: {
      type: String,
      default: '',
    },
    rightArrowLabel: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
    componentStyle: {
      type: String,
      default: 'normal',
    },
    font: {
      type: String,
      default: 'Open Sans',
    },
    weight: {
      type: String,
      default: 'regular',
    },
    color: {
      type: String,
      default: '#718096',
    },
    activeColor: {
      type: String,
      default: '#0066ff',
    },
    activeBackgroundColor: {
      type: String,
      default: '#e5f0ff',
    },
    borderColor: {
      type: String,
      default: '#e2e8f0',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    getVars() {
      return {
        '--border-color': this.borderColor,
        '--color': this.color,
        '--active-color': this.activeColor,
        '--active-background-color': this.activeBackgroundColor,
        '--font': this.font,
        '--font-weight': this.weight,
      }
    },
    isInPageGroup(page) {
      return (
        [this.currentPage - 1, this.currentPage, this.currentPage + 1].includes(page) ||
        (this.currentPage < 4 && page <= 4) ||
        (this.currentPage > this.numberOfPages - 3 && page >= this.numberOfPages - 3) ||
        page === 1 ||
        page === this.numberOfPages
      )
    },
  },
  mounted() {},
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
