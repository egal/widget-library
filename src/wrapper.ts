import components from './components'

// @ts-ignore
if (typeof Vue !== 'undefined') {
  for (const name in components) {
    // @ts-ignore
    Vue.component(name, components[name])
  }
}
