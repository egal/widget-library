import components from "./components";

if (typeof Vue !== "undefined") {
  for (const name in components) {
    Vue.component(name, components[name]);
  }
}
