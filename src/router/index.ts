import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from '@/App.vue'
import Category from '@/Category.vue'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Hone',
      component: App,
    },
    {
      path: '/category-product',
      name: 'Category',
      component: Category,
    },
  ],
})

export default router
