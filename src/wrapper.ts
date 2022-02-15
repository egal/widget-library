import components from './components'

// @ts-ignore
if (typeof Vue !== 'undefined') {
  for (const name in components) {
    console.log(name)
    // @ts-ignore
    Vue.component(name, components[name])
  }
}
