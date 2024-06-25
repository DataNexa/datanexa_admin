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
    /**
     * ############# CAMPANHAS  ##########################
     */

    {
      path:'/campanhas',
      name:'campanhas',
      component: () => import('@/views/app/painel/pages/CampanhasPage.vue')
    },
    
     /**
     * ############# PESQUISAS  ##########################
     */

    {
      path:'/pesquisas',
      name:'pesquisas',
      component: () => import('@/views/app/painel/pages/PesquisasPage.vue')
    },
   
    {
      path:'/pesquisas/:id',
      name:'pesquisas_selected',
      component: () => import('@/views/app/painel/pages/pesquisas/PesquisaSelectedVue.vue'),
      props:true
    },

    {
      path:'/pesquisas/adicionar',
      name:'pesquisas_acidionar',
      component: () => import('@/views/app/painel/pages/pesquisas/AdicionarPesquisaVue.vue')
    },

    {
      path:'/pesquisas/relatorio/:id',
      name:'pesquisas_relatorio',
      props:true,
      component: () => import('@/views/app/painel/pages/pesquisas/StatsPesquisaVue.vue')
    },

    {
      path:'/pesquisas/edit/:id',
      name:'pesquisas_edit',
      component: () => import('@/views/app/painel/pages/pesquisas/EditarPesquisaVue.vue')
    },

    {
      path:'/pesquisas/responder/:id',
      name:'pesquisas_responder',
      component: () => import('@/views/app/painel/pages/pesquisas/ResponderPesquisaVue.vue')
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
