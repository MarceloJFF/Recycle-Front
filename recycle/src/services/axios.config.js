import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Configuração base do axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Ajuste para a URL da sua API
  headers: {
    'Content-Type': 'application/json'
  }
});
export default axiosInstance;
