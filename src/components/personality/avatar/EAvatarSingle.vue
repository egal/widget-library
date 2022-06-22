<template>
  <div
    class="avatar-wrapper"
    :class="[
      `--size-${data.size}`,
      { hidden: !data.editable || data.isLoading },
      { hoverable: data.editable || data.dropdownOptions.length > 0 },
    ]"
    @click="onClickAction"
  >
    <div
      :class="`avatar ${data.isOnline ? '--online' : ''} --shape-${data.shape || 'circle'} --size-${
        data.size || 'md'
      }`"
      :style="getVars"
    >
      <img v-if="data.imgUrl" :src="data.imgUrl" :alt="data.name" class="avatar__img" />

      <p
        v-if="(!data.imgUrl || data.isNameRequired) && !data.isLoading"
        class="avatar__name"
        :class="{ '--darken': data.darken }"
      >
        <span>
          {{ getShortName }}
        </span>
      </p>

      <p class="loading --darken" v-if="data.isLoading">
        {{ data.size === 'xl' || data.size === 'lg' ? data.loadingText : '...' }}
      </p>

      <EDropdown
        v-if="data.dropdownOptions.length > 0 && isDropdownOpen"
        :options="data.dropdownOptions"
        :size="data.size"
        :icon-left="'trash'"
        @select="emitSelect"
      />
    </div>

    <input
      class="hidden-input"
      ref="hiddenFileInput"
      type="file"
      @change="requestUploadFile"
      accept="image/png,image/jpg,image/jpeg"
    />
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import EDropdown from '@/components/inputs/Dropdown/EDropdown'

export default {
  name: 'EAvatarSingle',
  components: { EDropdown, BootstrapIcon },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['upload-avatar', 'upload-error'],
  data() {
    return {
      isDropdownOpen: false,
    }
  },
  computed: {
    getVars() {
      return {
        '--bg-color': this.data.bgColor,
        '--border-color': this.data.borderColor,
        '--color': this.data.color,
        '--font': this.data.font,
        '--font-weight': this.data.weight,
      }
    },
    getShortName() {
      return this.data.name
        ? this.data.name
            .split(' ')
            .filter((el, i, arr) => i === 0 || i === arr.length - 1)
            .reduce((acc, el) => (acc += el[0]), '')
            .toUpperCase()
        : ''
    },
  },
  mounted() {
    this.isDropdownOpen = this.data.isDropdownOpen
  },
  methods: {
    onClickAction() {
      if (this.data.dropdownOptions.length > 0) {
        this.isDropdownOpen = !this.isDropdownOpen
      }
    },
    emitSelect(option) {
      this.$emit('select', option)
    },
  },

  watch: {
    'data.isDropdownOpen'(value) {
      this.isDropdownOpen = value
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.avatar-wrapper {
  position: relative;
  cursor: pointer;
  transition: 0.2s;

  &.hoverable {
    &:hover {
      cursor: pointer;
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    height: 100%;
    width: 100%;

    opacity: 0;
    background: rgba(45, 55, 72, 0.5);

    z-index: 2;
  }

  &:after {
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M31.0032 3.87868C31.3937 4.2692 31.3937 4.90237 31.0032 5.29289L28.9174 7.37866L24.9174 3.37866L27.0032 1.29289C27.3937 0.902369 28.0269 0.902369 28.4174 1.29289L31.0032 3.87868Z' fill='white'/%3E%3Cpath d='M27.5032 8.79287L23.5032 4.79287L9.87722 18.4189C9.76745 18.5286 9.68474 18.6625 9.63564 18.8097L8.02652 23.6371C7.89623 24.028 8.2681 24.3999 8.65898 24.2696L13.4863 22.6604C13.6336 22.6113 13.7674 22.5286 13.8772 22.4189L27.5032 8.79287Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 27C2 28.6569 3.34315 30 5 30H27C28.6569 30 30 28.6569 30 27V15C30 14.4477 29.5523 14 29 14C28.4477 14 28 14.4477 28 15V27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27V5C4 4.44772 4.44772 4 5 4H18C18.5523 4 19 3.55228 19 3C19 2.44772 18.5523 2 18 2H5C3.34315 2 2 3.34315 2 5V27Z' fill='white'/%3E%3C/svg%3E%0A");
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    top: 0;
    left: 0;
    background-size: 40%;

    opacity: 0;

    z-index: 2;
  }

  &:hover {
    .avatar__name > span {
      display: none;
    }
    .avatar-wrapper:before {
      opacity: 1;
    }

    .avatar-wrapper:after {
      opacity: 1;
    }
  }

  &.hidden {
    cursor: default;
    .avatar__name > span {
      display: flex;
    }

    &:hover:before,
    &:hover:after {
      opacity: 0;
    }
  }
  &.--size {
    &-xl {
      width: 88px;
      height: 88px;
    }

    &-lg {
      width: 64px;
      height: 64px;
    }

    &-md {
      width: 40px;
      height: 40px;
    }

    &-sm {
      width: 32px;
      height: 32px;
    }

    &-xs {
      width: 24px;
      height: 24px;
    }
  }
}
.avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    display: none;
    position: absolute;
    border-radius: 50%;
    background-color: $success;
    outline-color: #fff;
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

    &.--darken {
      background: rgba(45, 55, 72, 0.5);
    }
  }

  .loading {
    background: rgba(45, 55, 72, 0.5);
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

    border-radius: inherit;
    z-index: 1;
    font-size: 12px;
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

.dropdown {
  width: max-content;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  z-index: 5;
}

.hidden-input {
  visibility: hidden;
  width: 0;
}
</style>
