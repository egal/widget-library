import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import VueCookies from 'vue3-cookies'

let app = createApp(App);
app.use(VueCookies).use(router).mount('#app')