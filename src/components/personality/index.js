import components from "./src/components";
import Avatar from "./Avatar.vue";
import Tag from "./Tag.vue";
import Tooltip from "./Tooltip.vue";
const components = {
  Avatar,
  Tag,
  Tooltip,
}
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
