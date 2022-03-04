<template>
  <div class="navbar" :class="{ '--big': active }" :style="getVars" ref="navbar">
    <div class="navbar__logo-group">
      <img
        :src="mergedData.smallLogo"
        class="navbar__logo-group__big-logo"
        v-if="!active"
        alt="logo"
        @click="openMenu"
      />
      <img :src="mergedData.logo" class="navbar__logo-group__small-logo" v-if="active" alt="logo" />
      <BootstrapIcon
        @click="closeMenu"
        class="navbar__logo-group__chevron"
        v-if="active"
        icon="chevron-left"
      />
    </div>
    <ul class="navbar__links">
      <li v-for="link in mergedData.links" :key="link.to" class="navbar__links__list-item">
        <ENavbarLeftItem :link="link" :active="active" :data="mergedData"></ENavbarLeftItem>
      </li>
    </ul>

    <div class="navbar__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ENavbarLeftItem from '@/components/navigation/ENavbarLeftItem'

export default {
  name: 'ENavbarLeft',
  components: { ENavbarLeftItem, BootstrapIcon },
  data() {
    return {
      active: true,
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
          logo: null,
          links: [],
          smallLogo: null,
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
      this.$emit('on:openMenu')
    },
    closeMenu() {
      this.active = false
      this.$emit('on:closeMenu')
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/navbar/sidebar';
</style>
