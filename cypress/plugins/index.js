// const path = require('path')
// const { startDevServer } = require('@cypress/vite-dev-server')
//
// module.exports = (on, config) => {
//   console.log(1)
//   on('dev-server:start', (options) => {
//     console.log(2)
//     return startDevServer({
//       options,
//       viteConfig: {
//         configFile: path.resolve(__dirname, '..', '..', 'vite.config.js'),
//       },
//     })
//   })
// }
//
// const rollupPreprocessor = require('@bahmutov/cy-rollup')
//
// /**
//  * @type {Cypress.PluginConfig}
//  */
// module.exports = (on, config) => {
//   const options = {
//     // Provide an alternative rollup config file.
//     // The default is rollup.config.js at the project root.
//   }
//
//   on('file:preprocessor', rollupPreprocessor(options))
// }

const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
  const viteConfig = {}

  viteConfig.esbuild = viteConfig.esbuild || {}
  viteConfig.esbuild.jsxFactory = 'h'
  viteConfig.esbuild.jsxFragment = 'Fragment'
  viteConfig.logLevel = 'error'
  viteConfig.resolve = {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  }

  on('dev-server:start', (options) => {
    return startDevServer({ options, viteConfig })
  })
  return config
}
