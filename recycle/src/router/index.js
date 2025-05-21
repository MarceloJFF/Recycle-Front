import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Livres/HomeView.vue'
import CadastroBeneficio from '@/views/Usuario/CadastroBeneficio.vue'
import CadastroEcoponto from '@/views/Livres/CadastroEcoponto.vue'
import CadastroUsuario from '@/views/Livres/CadastroUsuario.vue'
import LoginView from '@/views/Livres/LoginView.vue'

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
