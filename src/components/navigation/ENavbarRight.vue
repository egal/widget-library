<template>
  <div class="navbar" :class="{ '--big': active }" :style="getVars" ref="navbar">
    <div class="navbar__logo-group">
      <img
        :src="mergedData.smallLogo"
        class="navbar__logo-group__big-logo"
        :class="{ '--hidden': active }"
        alt="logo"
        @click="openMenu"
      />
      <img
        :src="mergedData.logo"
        class="navbar__logo-group__small-logo"
        :class="{ '--hidden': !active }"
        alt="logo"
      />
      <BootstrapIcon
        @click="closeMenu"
        class="navbar__logo-group__chevron"
        :class="{ '--hidden': !active }"
        icon="chevron-left"
      />
    </div>
    <ul class="navbar__links">
      <router-link
        v-for="link in mergedData.links"
        :to="link.to"
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
        :key="link.to"
      >
        <li
          :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
        >
          <a :href="href" @click="navigate">
            <BootstrapIcon icon="circle" />
            <p v-if="active">{{ link.name }}</p></a
          >
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'ENavbarRight',
  components: { BootstrapIcon },
  data() {
    return {
      active: true,
      isTransiring: false,
      navbar: null,
    }
  },
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
          color: '#2d3748',
          activeColor: '#0066ff',
          logo: true,
          links: true,
          smallLogo: true,
          chevronColor: '#a0aec0',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--chevron-color': this.mergedData.chevronColor,
        '--active-color': this.mergedData.activeColor,
        '--color': this.mergedData.color,
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
  },
  methods: {
    openMenu() {
      this.active = true
      this.isTransiring = false
      this.$emit('on:openMenu')
    },
    closeMenu() {
      this.active = false
      this.isTransiring = true
      this.$emit('on:closeMenu')
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.navbar {
  padding: 24px;
  box-sizing: border-box;
  font-family: var(--font);
  font-weight: var(--font-weight);
  transition: all 0.3s;
  width: 66px;
  height: 100vh;
  border-right: 1px solid $gray-200;
  position: absolute;
  top: 0;
  left: 0;
  background: $base-white;

  &.--big {
    width: 250px;

    li a p {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__logo-group {
    display: flex;
    justify-content: space-between;
    height: 40px;

    &__big-logo,
    &__small-logo {
      margin: 0;
      width: auto;
      height: 100%;
      object-fit: contain;
      object-position: left;
    }

    &__small-logo {
      cursor: pointer;
    }

    &__chevron {
      font-size: $p1-font-size;
      flex-shrink: 0;
      align-self: center;
      cursor: pointer;
    }

    .--hidden {
      display: none;
    }
  }

  &__links {
    list-style: none;
    margin-top: 30px;
    padding: 0;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 32px;
    font-size: $p4-font-size;
    color: black;

    li {
      display: block;
      position: relative;
      transition: 0.3s;

      &::after {
        position: absolute;
        display: block;
        content: '';
        left: -24px;
        top: 50%;
        width: 2px;
        height: 24px;
        transform: translate(10px, -50%);
        border-radius: 2px;
        background-color: var(--active-color);
        opacity: 0;
        transition: 0.3s;
      }

      a {
        position: relative;
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
        font-size: $p4-font-size;

        svg {
          font-size: $p3-font-size;
          color: $gray-500;
          margin-right: 10px;
          transition: 0.3s;
        }

        p {
          color: var(--color);
          padding: 0;
          margin: 0;
          transform: translateX(-100%);
          opacity: 0;
          transition: 0.3s;
        }
      }

      &.router-link-exact-active,
      &:hover {
        p {
          color: var(--active-color);
        }

        svg {
          color: var(--active-color);
        }
      }

      &.router-link-exact-active::after {
        transform: translate(0, -50%);
        opacity: 1;
      }
    }
  }
}
</style>
