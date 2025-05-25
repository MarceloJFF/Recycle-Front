import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Configuração base do axios
const axiosInstance = axios.create({
  baseURL: 'https://trilhas-desafio-4-production-890a.up.railway.app/', // ⬅️ troque pela URL da sua API
  withCredentials: false, // Mude para true se usar cookies/sessões
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
export default axiosInstance;
