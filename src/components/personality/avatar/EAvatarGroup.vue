<template>
  <div class="avatar-group" :class="`--size-${mergedData.size}`" :style="getVars">
    <div
      class="avatar-group__item"
      :style="`transform: ${getTransform(index)}`"
      v-for="(item, index) in avatars"
      :key="index"
    >
      <EAvatarSingle :data="{ ...mergedData, ...item }" />
    </div>
  </div>
</template>

<script>
import EAvatarSingle from '@/components/personality/avatar/EAvatarSingle'

export default {
  name: 'EAvatarGroup',
  components: { EAvatarSingle },
  props: {
    avatars: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sizeRatio: {
        xs: 0.6,
        sm: 0.8,
        md: 1,
        lg: 1.3,
        xl: 1.8,
      },
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          color: '#ffffff',
          bgColor: '#4a5568',
          name: '',
          size: 'md',
          shape: 'circle',
          imgUrl: '',
          darken: false,
          borderColor: '#ffffff',
          isOnline: false,
          isNameRequired: false,
        },
        this.data,
        { editable: false, isDropdownOpen: false, dropdownOptions: [] },
      )
    },
    getVars() {
      return {
        '--border-color': this.mergedData.borderColor,
      }
    },
  },
  methods: {
    getTransform(index) {
      const currentSizeRatio = this.sizeRatio[this.mergedData.size]
      return `translateX(${-18 * index * currentSizeRatio}px)`
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.avatar-group {
  display: flex;

  &.--size {
    &-xl {
      .avatar-group__item {
        :deep(.avatar) {
          border: 4px solid var(--border-color);
        }
      }
    }
    &-lg {
      .avatar-group__item {
        :deep(.avatar) {
          border: 4px solid var(--border-color);
        }
      }
    }
    &-md {
      .avatar-group__item {
        :deep(.avatar) {
          border: 2px solid var(--border-color);
        }
      }
    }
    &-sm {
      .avatar-group__item {
        :deep(.avatar) {
          border: 2px solid var(--border-color);
        }
      }
    }
    &-xs {
      .avatar-group__item {
        :deep(.avatar) {
          border: 2px solid var(--border-color);
        }
      }
    }
  }
}
</style>
