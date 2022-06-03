import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript'
import configRouterPlugin from 'vite-plugin-vue-router'

import path from 'path'

export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 8080,
  },
  build: {
    lib: {
      entry: `${path.resolve(__dirname, 'src/index.ts')}`,
      name: 'EgalWidgets',
      fileName: (format) => `egal-widgets-build.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        '@dvuckovic/vue3-bootstrap-icons',
        'vue-upload-component/dist/vue-upload-component',
        'vue-css-donut-chart',
        'vue-ellipse-progress',
      ],
      output: {
        globals: {
          vue: 'Vue',
          '@dvuckovic/vue3-bootstrap-icons': '@dvuckovic/vue3-bootstrap-icons',
          'vue-upload-component/dist/vue-upload-component':
            'vue-upload-component/dist/vue-upload-component',
          'vue-css-donut-chart': 'vue-css-donut-chart',
          'vue-ellipse-progress': 'vue-ellipse-progress',
        },
      },
      plugins: [typescript({ sourceMap: false })],
    },
  },
  css: { preprocessorOptions: { scss: { charset: false } } },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('e-'),
        },
      },
      reactivityTransform: true,
    }),
    configRouterPlugin(),
  ],
})
