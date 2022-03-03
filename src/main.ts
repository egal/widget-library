import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
const app = createApp(App)
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('e-')
app.use(router).mount('#app')
