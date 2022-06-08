<template>
  <div
    :class="`avatar ${mergedData.isOnline ? '--online' : ''} --shape-${
      mergedData.shape || 'circle'
    } --size-${mergedData.size || 'md'}`"
    :style="getVars"
  >
    <img
      v-if="mergedData.imgUrl"
      :src="mergedData.imgUrl"
      :alt="mergedData.name"
      class="avatar__img"
    />
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
    z-index: 1;
  }

  &.--online::after {
    display: block;
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

    &-xl {
      width: 88px;
      height: 88px;
      border-radius: 12px;

      &::after {
        width: 22px;
        height: 22px;
        top: -3px;
        right: -3px;
        outline-width: 3px;
      }

      .avatar__name {
        font-size: $h2-font-size;
      }
    }

    &-lg {
      width: 64px;
      height: 64px;
      border-radius: 10px;

      &::after {
        width: 18px;
        height: 18px;
        top: -3px;
        right: -3px;
        outline-width: 3px;
      }

      .avatar__name {
        font-size: $p1-font-size;
      }
    }

    &-md {
      width: 40px;
      height: 40px;
      border-radius: 8px;

      &::after {
        width: 12px;
        height: 12px;
        top: -4px;
        right: -4px;
        outline-width: 2px;
      }

      .avatar__name {
        font-size: $p4-font-size;
      }
    }

    &-sm {
      width: 32px;
      height: 32px;
      border-radius: 6px;

      &::after {
        width: 10px;
        height: 10px;
        top: -4px;
        right: -4px;
        outline-width: 2px;
      }

      .avatar__name {
        font-size: $p6-font-size;
      }
    }

    &-xs {
      width: 24px;
      height: 24px;
      border-radius: 4px;

      &::after {
        width: 6px;
        height: 6px;
        top: -2px;
        right: -2px;
        outline-width: 2px;
      }

      .avatar__name {
        font-size: 10px;
      }
    }
  }

  &.--shape-circle {
    border-radius: 50% !important;

    &::after {
      top: 0;
      right: 0;
    }
  }

}
</style>
