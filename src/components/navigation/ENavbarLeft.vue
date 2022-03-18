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
          <template v-slot:badge>
            <div v-if="link.counter && !link?.links">
              <slot name="badge"></slot>
            </div>
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
      //todo styleconfig
      return Object.assign(
        {
          // font: 'Open Sans', // removed + renamed
          // weight: 'bold', // removed + renamed
          // color: '#2d3748', //removed
          // activeColor: '#0066ff', // removed
          logo: null,
          links: [],
          smallLogo: null,
          // chevronColor: '#2D3748',
          // hoverColor: 'black', // todo
          // activeStyle: {}, // todo def
          // defaultStyle: {}, // todo def
          // hoverStyle: {}, // todo def
          // commonStyle: {}, // todo def
        },
        this.data,
      )
    },

    // todo split theese 2 getVars
    getVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans', // renamed from font
        '--font-weight': this.styleConfig?.fontWeight || '700', // todo ??? // renamed

        '--chevron-color': this.styleConfig?.chevronColor || '#a0aec0', // todo use // '#2D3748',

        // text
        '--active-text-color': this.styleConfig?.active?.textColor || '#0066FF', // renamed
        '--hover-text-color': this.styleConfig?.hover?.textColor || '#0066FF', // renamed
        '--text-color': this.styleConfig?.textColor || '#2D3748', // renamed // todo add common or merge objects or ?

        // link container
        '--active-list-item-background-color':
          this.styleConfig?.active?.listItemBackgroundColor || 'transparent', // added // todo only inline
        '--hover-list-item-background-color':
          this.styleConfig?.hover?.listItemBackgroundColor || 'transparent', // added
        '--list-item-background-color': this.styleConfig?.listItemBackgroundColor || 'transparent', // added

        '--list-item-border-radius': this.styleConfig?.listItemBorderRadius || '0', // added ? need ?
        '--list-item-padding': this.styleConfig?.listItemPadding || '10px 0', // added ???

        // ul
        '--ul-gap': this.styleConfig?.ulGap || '12px', // added ???
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
