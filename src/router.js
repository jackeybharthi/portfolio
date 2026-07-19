import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/index.vue'
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
  history: createWebHistory(),
  routes
})

export default router
