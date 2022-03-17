<template>
  <router-link :to="link.to ?? ''" v-slot="{ href, navigate, isActive, isExactActive }" custom>
    <!--    todo  :style="getVars"-->
    <!--    todo set styles if current route -->
    <div
      class="nav-link"
      @click.stop="link.links && openNestedLinks()"
      :style="activeStyle"
      @mouseover="setHoverStyles"
      @mouseout="setDefaultStyles"
      @mousedown="setActiveStyles"
      @mouseup="setActiveStyles"
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
      <ul
        v-if="link.links && linksOpen && active"
        class="children-links"
        :class="{ 'closed-menu-links': !active }"
      >
        <li v-for="(child, index) in link.links" :key="index">
          <ENavbarLeftItem :link="child" :active="active" :data="data"></ENavbarLeftItem>
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
      activeStyle: this.styleConfig.default,
    }
  },
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
    styleConfig: {
      type: Object,
      default: () => {},
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
  methods: {
    setHoverStyles() {
      this.activeStyle = this.styleConfig.hover
    },
    setDefaultStyles() {
      this.activeStyle = this.styleConfig.default
    },
    setActiveStyles() {
      this.activeStyle = this.styleConfig.active
    },
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
