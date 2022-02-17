<template>
  <div
    :class="`avatar ${mergedData.isOnline ? '--online' : ''} --shape-${
      mergedData.shape || 'circle'
    } --size-${mergedData.size || 'md'}`"
    :style="getVars"
  >
    <img v-if="mergedData.imgUrl" :src="mergedData.imgUrl" :alt="name" class="avatar__img" />
    <p
      v-if="!mergedData.imgUrl || mergedData.isNameRequired"
      class="avatar__name"
      :class="{ '--darken': mergedData.darken, '--transparent': mergedData.imgUrl }"
    >
      {{ getShortName }}
    </p>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'EAvatar',
  components: { BootstrapIcon },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
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
      )
    },
    getVars() {
      return {
        '--bg-color': this.mergedData.bgColor,
        '--border-color': this.mergedData.borderColor,
        '--color': this.mergedData.color,
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
    getShortName() {
      return this.mergedData.name
        ?.split(' ')
        .filter((el, i, arr) => i === 0 || i === arr.length - 1)
        .reduce((acc, el) => (acc += el[0]), '')
        .toUpperCase()
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;

  &::after {
    content: '';
    display: none;
    position: absolute;
    border-radius: 50%;
    background-color: $success;
    outline-color: var(--border-color);
    outline-style: solid;
    top: 0;
    right: 0;
    z-index: 1;
  }

  &.--online::after {
    display: block;
  }

  &.--shape-circle {
    border-radius: 50% !important;

    &::after {
      top: 29.3%;
      right: 29.3%;
      transform: translate(100%, -100%);
    }
  }

  &__name {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: var(--font);
    color: var(--color);
    font-weight: var(--font-weight);
    background: var(--bg-color);
    border-radius: inherit;
    z-index: 1;

    &.--transparent {
      background: transparent;

      &.--darken {
        background: rgba(0, 0, 0, 0.5);
      }
    }
  }

  &__img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    z-index: 0;
  }

  &.--size {
    &-xxl {
      width: 116px;
      height: 116px;
      border-radius: 14px;

      &::after {
        width: 29px;
        height: 29px;
        outline-width: 4px;
      }

      .avatar__name {
        font-size: $h1-font-size;
      }
    }

    &-xl {
      width: 82px;
      height: 82px;
      border-radius: 14px;

      &::after {
        width: 20px;
        height: 20px;
        outline-width: 4px;
      }

      .avatar__name {
        font-size: $h2-font-size;
      }
    }

    &-lg {
      width: 64px;
      height: 64px;
      border-radius: 12px;

      &::after {
        width: 15px;
        height: 15px;
        outline-width: 3px;
      }

      .avatar__name {
        font-size: $p1-font-size;
      }
    }

    &-md {
      width: 46px;
      height: 46px;
      border-radius: 8px;

      &::after {
        width: 10px;
        height: 10px;
        outline-width: 2px;
      }

      .avatar__name {
        font-size: $p2-font-size;
      }
    }

    &-sm {
      width: 36px;
      height: 36px;
      border-radius: 14px;

      &::after {
        width: 8px;
        height: 8px;
        outline-width: 2px;
      }

      .avatar__name {
        font-size: $p4-font-size;
      }
    }

    &-xs {
      width: 24px;
      height: 24px;
      border-radius: 4px;

      &::after {
        width: 6px;
        height: 6px;
        outline-width: 1px;
      }

      .avatar__name {
        font-size: $p8-font-size;
      }
    }
  }
}
</style>
