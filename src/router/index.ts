import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import User from '@/views/User.vue'
import UserProfile from '@/views/UserProfile.vue'
import UserPosts from '@/views/UserPosts.vue'
import UserPosts2 from '@/views/UserPosts2.vue'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: UserPosts2,
    },
    {
      path: '/category-product',
      name: 'ProductCategory',
      component: User,
    },
    {
      path: '/products',
      name: 'products',
      component: UserPosts,
    },
  ],
})

export default router
