<template>
  <router-link
    :to="link.to"
    v-slot="{ href, navigate, isActive, isExactActive }"
    custom
    :style="getVars"
  >
    <div class="nav-link">
      <a
        :href="href"
        @click="navigate"
        class="exact-link"
        :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
      >
        <BootstrapIcon :icon="link.icon" />
        <p v-if="active">{{ link.name }}</p></a
      >
      <BootstrapIcon icon="caret-down" class="caret-icon" v-if="link.links" />
    </div>
    <ul v-if="link.links">
      <li v-for="(child, index) in link.links" :key="index">
        <ENavbarLeftItem :link="child" :active="active" :data="data"></ENavbarLeftItem>
      </li>
    </ul>
  </router-link>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
export default {
  name: 'ENavbarLeftItem',
  components: { BootstrapIcon },
  props: {
    link: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getVars() {
      return {
        '--chevron-color': this.data.chevronColor,
        '--active-color': this.data.activeColor,
        '--color': this.data.color,
        '--font': this.data.font,
        '--font-weight': this.data.weight,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/navbar/sidebar';
</style>
