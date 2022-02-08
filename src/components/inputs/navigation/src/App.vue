<template>
  <NavbarVertical :links="links" />
  <div>
    <NavbarHorizontal :links="links" />
    <Pagination :number-of-pages="10" v-model="currentPage" />
    <Breadcrumbs />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import NavbarVertical from "@/components/NavbarVertical.vue";
import NavbarHorizontal from "@/components/NavbarHorizontal.vue";

const currentPage = ref(1);
const links = ref([
  { name: "home", to: "/" },
  { name: "about", to: "/about" },
]);
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
</style>
