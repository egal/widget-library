<template>
  <div class="navbar" :style="getVars">
    <div class="navbar__logo">
      <img :src="mergedData.logo" alt="logo" />
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
          <a :href="href" @click="navigate"
            ><BootstrapIcon :icon="link.icon" />
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
          icon: '',
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--active-color': this.mergedData.activeColor,
        '--color': this.mergedData.color,
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
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
