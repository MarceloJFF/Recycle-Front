import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api';
import AcessoDto from '@/dto/AcessoDto';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(new AcessoDto());

  // Função para atualizar os dados do usuário a partir do token
  function atualizarDadosUsuario() {
    if (token.value) {
      try {
        const decodedToken = jwtDecode(token.value);
        user.value = {
          login: decodedToken.upn,
          tipo: decodedToken.groups?.[0] || null
        };
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        logout();
      }
    }
  }

  const isAuthenticated = computed(() => {
    if (!token.value) return false;
    try {
      const decoded = jwtDecode(token.value);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  });

  const currentUser = computed(() => {
    if (token.value) {
      return jwtDecode(token.value);
    }
    return null;
  });

  async function login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        login: email,
        password: password
      });

      if (response.data) {
        token.value = response.data;
        localStorage.setItem('token', response.data);
        atualizarDadosUsuario();
        return response.data;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = new AcessoDto();
    localStorage.removeItem('token');
  }

  function getToken() {
    return token.value;
  }

  // Inicializa os dados do usuário ao criar o store
  atualizarDadosUsuario();

  return {
    token,
    user,
    isAuthenticated,
    currentUser,
    login,
    logout,
    getToken,
    atualizarDadosUsuario
  };
});
