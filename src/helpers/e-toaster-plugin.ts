import { App, provide } from 'vue'
import Toaster from '@/helpers/toaster'

export default {
  install(app: App) {
    app.config.globalProperties.$toaster = new Toaster()
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toaster: Toaster
  }
}
