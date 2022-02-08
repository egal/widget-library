import { createApp } from "vue";
import App from "./App.vue";

// import Vue plugin
//@ts-ignore
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import "vue-svg-inline-plugin/src/polyfills";
import router from "@/components/navigation/src/router";

// initialize Vue app
const app = createApp(App);

// use Vue plugin without options
app.use(router).use(VueSvgInlinePlugin);

// mount Vue app
app.mount("#app");
