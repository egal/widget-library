import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// @ts-ignore
import Donut from 'vue-css-donut-chart'
// @ts-ignore
import 'vue-css-donut-chart/dist/vcdonut.css'
// @ts-ignore
import veProgress from 'vue-ellipse-progress'
createApp(App).use(router).use(veProgress).use(Donut).mount('#app')
