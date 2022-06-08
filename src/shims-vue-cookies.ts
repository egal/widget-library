import { VueCookies } from 'vue3-cookies/dist/interfaces'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $cookies: VueCookies
  }
}
