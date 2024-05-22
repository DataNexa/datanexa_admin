import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/app/HomeView.vue'
import TestViewVue from '@/TestView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/campanhas',
      name:'Campanhas',
      component: () => import('../views/app/painel/pages/CampanhasPage.vue')
    },
    {
      path:'/test',
      component: TestViewVue
    }
    /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    */
  ]
})

export default router
