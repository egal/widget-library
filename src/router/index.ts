import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import User from '@/views/User.vue'
import UserProfile from '@/views/UserProfile.vue'
import UserPosts from '@/views/UserPosts.vue'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'profile',
          name: 'userprofile',
          component: UserProfile,
          children: [
            {
              path: 'posts',
              name: 'userposts',
              component: UserPosts,
            },
          ],
        },
      ],
    },
  ],
})

export default router
