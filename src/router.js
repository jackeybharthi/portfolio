import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/HelloWorld.vue'
import Admin from './components/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
