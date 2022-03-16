import components from './components'
import { App } from 'vue'
import Toaster from '@/helpers/toaster'
const plugin = {
  install: (app: App) => {
    for (const prop in components) {
      if (components.hasOwnProperty(prop) && components[prop] !== 'EToasterPlugin') {
        const component = components[prop]
        app.component(component.name, component)
      }
    }
    app.config.globalProperties.$toaster = new Toaster()
  },
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toaster: Toaster
  }
}

export default plugin
