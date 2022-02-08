import { createApp } from "vue";
import App from "./App.vue";
import EToasterPlugin from "@/plugins/e-toaster-plugin.ts";

createApp(App).use(EToasterPlugin).mount("#app");
