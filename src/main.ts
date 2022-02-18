import { createApp } from 'vue'
// @ts-ignore
import App from './App'
// @ts-ignore
import Donut from 'vue-css-donut-chart';
// @ts-ignore
import 'vue-css-donut-chart/dist/vcdonut.css';
// @ts-ignore
import veProgress from 'vue-ellipse-progress';

createApp(App).use(Donut).use(veProgress).mount('#app')