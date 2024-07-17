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
      props:true,
      component: () => import('@/views/app/painel/pages/pesquisas/EditarPesquisaVue.vue')
    },

    {
      path:'/pesquisas/responder/:id',
      name:'pesquisas_responder',
      props:true,
      component: () => import('@/views/app/painel/pages/pesquisas/ResponderPesquisaVue.vue')
    },

    /**
     * ############# MONITORAMENTOS  ##########################
     */

    {
      path:'/monitoramento',
      name:'monitoramento',
      component: () => import('@/views/app/painel/pages/MonitoramentoPage.vue')
    },

    {
      path:'/monitoramento/:id',
      name:'monitoramento_selected',
      props:true,
      component: () => import('@/views/app/painel/pages/monitoramento/MonitoramentoSelected.vue')
    },

    {
      path:'/monitoramento/editarFila',
      name:'monitoramento_editar_fila',
      component: () => import('@/views/app/painel/pages/monitoramento/EditarFila.vue')
    },

    {
      path:'/monitoramento/adicionar',
      name:'monitoramento_adicionar',
      component: () => import('@/views/app/painel/pages/monitoramento/AdicionarMonitoramento.vue')
    },

    {
      path:'/monitoramento/editar/:id',
      name:'monitoramento_editar',
      props:true,
      component: () => import('@/views/app/painel/pages/monitoramento/EditarMonitoramento.vue')
    },

    /**
     * ############# USER  ##########################
     */

    {
      path:'/user',
      name:'user',
      component: () => import('@/views/app/painel/pages/UserPage.vue')
    },


    /**
     * ############# CONTATOS  ##########################
     */

    {
      path:'/contatos',
      name:'contatos',
      component: () => import('@/views/app/painel/pages/GruposPage.vue')
    },

    {
      path:'/contatos/:id',
      name:'contato_selected',
      component: () => import('@/views/app/painel/pages/contatos/ContatosPage.vue'),
      props:true
    },

  ]
})

export default router
