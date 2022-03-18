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
        <ENavbarLeftItem
          :link="link"
          :active="active"
          :data="mergedData"
          :style-config="styleConfig"
        >
          <template v-slot:badge="{ linkName }">
            <slot name="badge" :linkName="linkName"></slot>
          </template>
        </ENavbarLeftItem>
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
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          verticalDash: true,
          logo: null,
          links: [],
          smallLogo: null,
        },
        this.data,
      )
    },

    getVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--font-weight': this.styleConfig?.fontWeight || '700',
        '--chevron-color': this.styleConfig?.chevronColor || '#a0aec0',

        // text
        '--active-text-color': this.styleConfig?.active?.textColor || '#0066FF',
        '--hover-text-color': this.styleConfig?.hover?.textColor || '#0066FF',
        '--text-color': this.styleConfig?.textColor || '#2D3748',

        // link
        '--active-list-item-background-color':
          this.styleConfig?.active?.backgroundColor || 'transparent',
        '--hover-list-item-background-color':
          this.styleConfig?.hover?.backgroundColor || 'transparent',
        '--list-item-background-color': this.styleConfig?.backgroundColor || 'transparent',
        '--list-item-border-radius': this.styleConfig?.borderRadius || '0',
        '--list-item-padding': this.styleConfig?.listItemPadding || '10px 0',

        // ul
        '--ul-gap': this.styleConfig?.ulGap || '12px',
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
