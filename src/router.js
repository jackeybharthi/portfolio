import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/HelloWorld.vue'
import Admin from './components/Admin.vue'
import About from './components/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
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
