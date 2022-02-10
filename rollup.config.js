// import vue from 'rollup-plugin-vue'
// import nodeResolve from '@rollup/plugin-node-resolve'
// import url from '@rollup/plugin-url'
// // import peerDepsExternal from "rollup-plugin-peer-deps-external";
// // import commonjs from "@rollup/plugin-commonjs";
// import scss from 'rollup-plugin-scss'
//
// export default [
//   // ESM build to be used with webpack/rollup.
//   {
//     input: 'src/components.js',
//     output: {
//       format: 'esm',
//       file: 'dist/library.esm.js',
//       exports: 'default',
//     },
//     plugins: [nodeResolve(), url(), vue({ defaultLang: { style: 'scss' } })],
//   },
//   // SSR build.
//   {
//     input: 'src/components.js',
//     output: {
//       format: 'cjs',
//       file: 'dist/library.ssr.js',
//       exports: 'default',
//     },
//     plugins: [
//       nodeResolve(),
//       url(),
//       vue({ template: { optimizeSSR: true }, defaultLang: { style: 'scss' } }),
//     ],
//   },
//   // Browser build.
//   {
//     input: 'src/index.js',
//     output: {
//       format: 'iife',
//       file: 'dist/library.js',
//     },
//     plugins: [nodeResolve(), url(), vue({ defaultLang: { style: 'scss' } })],
//   },
//   scss({
//     output: 'dist/common.css',
//   }),
// ]
