import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Configuração base do axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Ajuste para a URL da sua API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar o token em todas as requisições
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
axiosInstance.interceptors.response.use(
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

export default axiosInstance; 