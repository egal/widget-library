import components from './components'

const plugin = {
  install: (app) => {
    for (const prop in components) {
      // eslint-disable-next-line no-prototype-builtins
      if (components.hasOwnProperty(prop)) {
        const component = components[prop]
        app.component(component.name, component)
      }
    }
  },
}

export default plugin
