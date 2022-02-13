<template>
  <div class="navbar" :style="getVars">
    <div class="navbar__logo">
      <img :src="logo" alt="logo" />
    </div>
    <ul class="navbar__links">
      <router-link
        v-for="link in links"
        :to="link.to"
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
        :key="link.to"
      >
        <li
          :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
        >
          <a :href="href" @click="navigate"
            ><BootstrapIcon icon="circle" />
            <p>{{ link.name }}</p></a
          >
        </li>
      </router-link>
    </ul>
    <slot name="avatar"></slot>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
export default {
  name: 'ENavbarTop',
  components: { BootstrapIcon },
  data() {
    return {}
  },
  props: {
    font: {
      type: String,
      default: 'Open Sans',
    },
    weight: {
      type: String,
      default: 'bold',
    },
    color: {
      type: String,
      default: '#2D3748',
    },
    activeColor: {
      type: String,
      default: '#0066FF',
    },
    logo: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getVars() {
      return {
        '--active-color': this.activeColor,
        '--color': this.color,
        '--font': this.font,
        '--font-weight': this.weight,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';

.navbar {
  display: flex;
  padding-top: 24px;
  font-family: var(--font);
  font-weight: var(--font-weight);

  &__logo {
    padding: 10px 24px;
    height: 54px;
    box-sizing: border-box;

    img {
      height: 100%;
      width: auto;
    }
  }

  &__links {
    display: flex;
    list-style: none;
    margin: 0 auto;
    padding: 0;

    li {
      display: block;
      position: relative;
      transition: 0.3s;
      padding: 16px 24px;

      a {
        position: relative;
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
        font-size: $p4-font-size;

        &::after {
          position: absolute;
          display: block;
          content: '';
          left: 50%;
          bottom: 0;
          width: calc(100% + 6px);
          height: 2px;
          transform: translate(-50%, 10px);
          border-radius: 2px;
          background-color: var(--active-color);
          opacity: 0;
          transition: 0.3s;
        }

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

      &.router-link-exact-active a::after {
        transform: translate(-50%, 20px);
        opacity: 1;
      }
    }
  }
}
</style>
