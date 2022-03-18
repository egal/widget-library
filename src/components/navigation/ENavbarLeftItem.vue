<template>
  <router-link :to="link.to ?? ''" v-slot="{ href, navigate, isActive, isExactActive }" custom>
    <!--    todo  :style="getVars"-->

    <!--    @mousedown="setActiveStyles"-->
    <!--    @mouseup="setActiveStyles"-->
    <div
      class="nav-link"
      @click.stop="link.links && openNestedLinks()"
      :style="[
        isHover
          ? hoverStyle
          : link.to && isActive
          ? activeStyle
          : isHover
          ? hoverStyle
          : defaultStyle,
      ]"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
      :class="{
        'router-link-active': link.to && isActive,
        'router-link-exact-active': link.to && isExactActive,
        'router-link-exact-active nested':
          link.links && linksOpen && link.links.map((i) => i.to).includes($route.path),
      }"
    >
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
      <slot></slot>
      <BootstrapIcon
        icon="caret-down"
        class="caret-icon"
        v-if="link.links"
        @click.stop="openNestedLinks()"
        :class="{ 'rotate-caret': linksOpen }"
      />
    </div>
    <transition-group name="slide-fade" tag="ul">
      <!--      todo counter s-->
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
            :style-config="{
              active: styleConfig.active,
              hover: styleConfig.hover,
              default: styleConfig.default,
              common: styleConfig.common,
            }"
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
    activeStyle() {
      return Object.assign(this.styleConfig?.active, this.styleConfig.common ?? {})
    },
    defaultStyle() {
      console.log(this.styleConfig)
      return Object.assign(this.styleConfig?.default, this.styleConfig.common ?? {})
    },
    hoverStyle() {
      return Object.assign(this.styleConfig?.hover, this.styleConfig.common ?? {})
    },
    getVars() {
      return {
        '--chevron-color': this.data.chevronColor,
        '--active-color': this.data.activeColor,
        '--hover-color': this.data.hoverColor,
        '--color': this.data.color,
        '--font': this.data.font,
        '--font-weight': this.data.weight,
      }
    },
  },
  methods: {
    setHoverStyles() {
      this.activeStyle = this.styleConfig?.hover ?? {}
    },
    setDefaultStyles() {
      this.activeStyle = this.styleConfig?.default ?? {}
    },
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
