import components from './components'
import { App } from 'vue'
import Toaster from '@/helpers/toaster'
import Donut from 'vue-css-donut-chart'
import veProgress from 'vue-ellipse-progress'

//TODO: Не уверен будет ли так работать, но стоит попробовать
import 'vue-css-donut-chart/dist/vcdonut.css'

const ToasterInstance = new Toaster()
const plugin = {
  install: (app: App) => {
    for (const prop in components) {
      if (components.hasOwnProperty(prop) && components[prop] !== 'EToasterPlugin') {
        const component = components[prop]
        app.component(component.name, component)
      }
    }
    app.config.globalProperties.$toaster = ToasterInstance
    app.use(Donut).use(veProgress)
  },
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toaster: Toaster
  }
}

export default plugin
export { ToasterInstance }
