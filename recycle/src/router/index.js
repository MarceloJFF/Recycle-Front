import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
import UsuarioView from '@/views/Usuario/UsuarioView.vue'
import BeneficioUsuario from '@/views/Usuario/BeneficioUsuario.vue'
import ComoReciclar from '@/views/Livres/ComoReciclar.vue'

const router = createRouter({
  history: createWebHistory(""),
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
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsuarioView,
      meta: { requiresAuth: true }
    },
    {
      path: '/usuario/beneficio',
      name: 'usuario-beneficio',
      component: BeneficioUsuario,
      meta: { requiresAuth: true }
    },
    {
      path: '/ecoponto/solicitacoes',
      name: 'ecoponto-solicitacoes',
      component: SolicitacoesView,
      meta: { requiresAuth: true }
    },
    {
      path: '/ecoponto/evento',
      name: 'ecoponto-evento',
      component: EventoEcoponto,
      meta: { requiresAuth: true }
    },
    {
      path: '/ecoponto/gerenciar',
      name: 'ecoponto-gerenciar',
      component: EcoGerenciar,
      meta: { requiresAuth: true }
    },
    {
      path: '/ecoponto/conf',
      name: 'coinf-ecoponto',
      component: ConfEcoponto,
      meta: { requiresAuth: true }
    },
    {
      path: '/cadastro-usuario',
      name: 'cadastro-usuario',
      component: CadastroUsuario,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Livres/AboutView.vue'),
    },
    // Adicionando a rota para a página de como reciclar
    {
  path: '/como-reciclar',
  name: 'como-reciclar',
  component: ComoReciclar,
}

  ],
})

// Navigation guard simplificado
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado, redireciona para login
    next('/login')
  } else {
    // Caso contrário, permite a navegação
    next()
  }
})

export default router
