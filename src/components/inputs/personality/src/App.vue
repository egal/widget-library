<template>
  <avatar
    darken
    shape="square"
    size="xxl"
    name="Jonh Doe"
    img-url="https://picsum.photos/200/300"
  />
  <tag icon="star" cross-icon>Badge</tag>
  <tooltip>Some text here</tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Avatar from "@/components/Avatar.vue";
// import Tag from "@/components/Tag.vue";
// import Tooltip from "@/components/Tooltip.vue";
//@ts-nocheck
//@ts-ignore
import { Avatar, Tag, Tooltip } from "../dist/personality.umd.js";
// console.log(personality);

// console.log(personality);

export default defineComponent({
  name: "App",
  components: { Avatar, Tag, Tooltip },
});
</script>

<style lang="scss"></style>
