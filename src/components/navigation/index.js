import Breadcrumbs from "./Breadcrumbs.vue";
import NavbarVertical from "./NavbarVertical.vue";
import NavbarHorizontal from "./NavbarHorizontal.vue";
import Pagination from "./Pagination.vue";
const components = { Breadcrumbs, NavbarHorizontal, NavbarVertical, Pagination }
const plugin = {
  install(Vue) {
    for (const prop in components) {
      // eslint-disable-next-line no-prototype-builtins
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  },
};

export default plugin;
