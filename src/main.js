import { createApp } from 'vue'
import App from './App.vue'

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import veProgress from 'vue-ellipse-progress';

createApp(App).use(Donut).use(veProgress).mount('#app')