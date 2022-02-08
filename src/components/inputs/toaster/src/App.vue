<template>
  <div class="container">
    <button @click="showToaster">show toaster</button>
    <button @click="showDanger">show danger</button>
    <ToasterContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToasterContainer from "@/components/Toaster/ToasterContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    ToasterContainer,
  },
  methods: {
    showToaster(): void {
      this.$toaster.info({
        message: "message",
        primaryAction: "action",
      });
    },
    showDanger(): void {
      this.$toaster.danger({
        message: "message",
        variant: "dark",
        flat: true,
        primaryAction: "action",
        primaryActionCallback: () => {
          console.log("action danger primary");
        },
      });
    },
  },
});
</script>

<style scoped lang="scss"></style>
