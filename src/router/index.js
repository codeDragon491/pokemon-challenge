import { createRouter, createWebHistory } from 'vue-router'
import TabbedView from '../views/TabbedView.vue'

const routes = [
  {
    path: '/',
    name: 'TabbedView',
    component: TabbedView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
