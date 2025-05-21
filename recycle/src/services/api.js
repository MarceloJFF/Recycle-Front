// src/services/api.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Lista de endpoints públicos que não precisam de autenticação
const publicEndpoints = [
  '/cadastro/usuario',
  '/cadastro/ecoponto',
  '/auth/login',
  '/auth/verify',

  // Adicione outros endpoints públicos aqui
];

const api = axios.create({
  baseURL: 'http://localhost:8080', // ⬅️ troque pela URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em requisições que precisam de autenticação
api.interceptors.request.use(
  (config) => {
    // Verifica se o endpoint atual está na lista de endpoints públicos
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
      config.url.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const authStore = useAuthStore();
      const token = authStore.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      alert('Sua sessão expirou ou o token é inválido. Por favor, faça login novamente.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
