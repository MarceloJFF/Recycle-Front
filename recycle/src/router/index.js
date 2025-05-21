import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Livres/HomeView.vue'
import CadastroBeneficio from '@/views/Ecoponto/CadastroBeneficio.vue'
import CadastroEcoponto from '@/views/Livres/CadastroEcoponto.vue'
import CadastroUsuario from '@/views/Livres/CadastroUsuario.vue'
import LoginView from '@/views/Livres/LoginView.vue'
import MenuEcoponto from '@/views/Ecoponto/MenuEcoponto.vue'
import SolicitacoesView from '@/views/Ecoponto/SolicitacoesView.vue'
import EventoEcoponto from '@/views/Ecoponto/EventoEcoponto.vue'
import EcoGerenciar from '@/views/Ecoponto/EcoGerenciar.vue'
import ConfEcoponto from '@/views/Ecoponto/ConfEcoponto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/beneficio',
      name: 'beneficio',
      component: CadastroBeneficio,
    },
    {
      path: '/cadastro-ecoponto',
      name: 'cadastro-ecoponto',
      component: CadastroEcoponto,
    },
     {
      path: '/ecoponto',
      name: 'ecoponto',
      component: MenuEcoponto,
    },
    {
      path: '/ecoponto/solicitacoes',
      name: 'ecoponto-solicitacoes',
      component: SolicitacoesView,
    },
     {
      path: '/ecoponto/evento',
      name: 'ecoponto-evento',
      component: EventoEcoponto,
    },
    {
      path: '/ecoponto/gerenciar',
      name: 'ecoponto-gerenciar',
      component: EcoGerenciar,
    },
    {
      path: '/ecoponto/conf',
      name: 'coinf-ecoponto',
      component: ConfEcoponto,
    },
    {
      path: '/cadastro-usuario',
      name: 'cadastro-usuario',
      component: CadastroUsuario,
    },
    {
      path:'/login',
      name: 'login',
      component:LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Livres/AboutView.vue'),
    },
  ],
})

export default router
