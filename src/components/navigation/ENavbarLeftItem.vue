<template>
  <router-link :to="link.to ?? ''" v-slot="{ href, navigate, isActive, isExactActive }" custom>
    <div
      class="nav-link"
      @click.stop="link.links && openNestedLinks()"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
      :class="{
        'router-link-exact-active': link.to && isExactActive,
        'router-link-exact-active nested':
          link.links && linksOpen && link.links.map((i) => i.to).includes($route.path),
      }"
    >
      <div
        class="vertical-dash"
        v-if="link.to && isActive && !link.links && data.verticalDash"
      ></div>
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
      <slot name="badge" :linkName="link.name"> </slot>
      <BootstrapIcon
        icon="caret-down"
        class="caret-icon"
        v-if="link.links && active"
        @click.stop="openNestedLinks()"
        :class="{ 'rotate-caret': linksOpen }"
      />
    </div>
    <transition-group name="slide-fade" tag="ul" style="padding: 0">
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
      isHover: false,
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
  methods: {
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
