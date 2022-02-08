const { join } = require("path");

module.exports = {
  chainWebpack: (config) => {
    // These are some necessary steps changing the default webpack config of the Vue CLI
    // that need to be changed in order for Typescript based components to generate their
    // declaration (.d.ts) files.
    //
    // Discussed here https://github.com/vuejs/vue-cli/issues/1081
    if (process.env.NODE_ENV === "production") {
      config.module
        .rule("ts")
        .use("ts-loader")
        .loader("ts-loader")
        .tap((opts) => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
  css: {
    extract: false,
  },
  parallel: false,
};
