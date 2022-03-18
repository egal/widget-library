<template>
  <router-link :to="link.to ?? ''" v-slot="{ href, navigate, isActive, isExactActive }" custom>
    <!--    todo  :style="getVars"-->

    <!--    :style="[-->
    <!--    isHover-->
    <!--    ? hoverStyle-->
    <!--    : link.to && isActive-->
    <!--    ? activeStyle-->
    <!--    : isHover-->
    <!--    ? hoverStyle-->
    <!--    : defaultStyle,-->
    <!--    ]"-->
    <!--    -->

    <div
      class="nav-link"
      @click.stop="link.links && openNestedLinks()"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
      :class="{
        'router-link-active': link.to && isActive,
        'router-link-exact-active': link.to && isExactActive,
        'router-link-exact-active nested':
          link.links && linksOpen && link.links.map((i) => i.to).includes($route.path),
      }"
    >
      <!--      todo prop to show -->
      <!--      todo check work on nested links-->
      <div class="vertical-dash" v-if="link.to && isActive"></div>
      <a
        :href="href"
        @click="(event) => navigationHandler(event, link, navigate)"
        class="exact-link"
      >
        <BootstrapIcon :icon="link.icon ?? ''" />
        <p v-if="active" :class="{ 'link-active': active }">
          {{ link.name }}
        </p>
      </a>
      <!--      todo add slot -->
      <!--      todo name ? styles ? -->
      <slot name="badge"></slot>
      <BootstrapIcon
        icon="caret-down"
        class="caret-icon"
        v-if="link.links"
        @click.stop="openNestedLinks()"
        :class="{ 'rotate-caret': linksOpen }"
      />
    </div>
    <transition-group name="slide-fade" tag="ul" style="padding: 0">
      <!--      todo counter -->
      <!--      todo ul styles -->
      <!--      todo slot namde for concrete link -->
      <ul
        v-if="link.links && linksOpen && active"
        class="children-links"
        :class="{ 'closed-menu-links': !active }"
      >
        <li v-for="(child, index) in link.links" :key="index">
          <ENavbarLeftItem
            :link="child"
            :active="active"
            :data="data"
            :style-config="styleConfig"
          ></ENavbarLeftItem>
        </li>
      </ul>
    </transition-group>
  </router-link>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
export default {
  name: 'ENavbarLeftItem',
  components: { BootstrapIcon },
  data() {
    return {
      linksOpen: false,
      activeStyle: this.styleConfig?.active ?? {},

      isHover: false,
      // todo
      // isActiveState: false
    }
  },
  props: {
    link: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
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
    // activeStyle() {
    //   return Object.assign(this.styleConfig?.active, this.styleConfig.common ?? {})
    // },
    // defaultStyle() {
    //   console.log(this.styleConfig)
    //   return Object.assign(this.styleConfig?.default, this.styleConfig.common ?? {})
    // },
    // hoverStyle() {
    //   return Object.assign(this.styleConfig?.hover, this.styleConfig.common ?? {})
    // },
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
    // setHoverStyles() {
    //   this.activeStyle = this.styleConfig?.hover ?? {}
    // },
    // setDefaultStyles() {
    //   this.activeStyle = this.styleConfig?.default ?? {}
    // },
    // setActiveStyles() {
    //   this.activeStyle = this.styleConfig?.active ?? {}
    // },
    navigationHandler(event, link, navigate) {
      event.preventDefault()

      if (!link.links) {
        navigate()
      }
    },

    openNestedLinks() {
      this.linksOpen = !this.linksOpen
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/navbar/sidebar';
</style>
