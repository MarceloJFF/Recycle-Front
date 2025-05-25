<template>
  <div class="page-container">
    <div class="card p-4">
      <div v-if="showLogin">
        <h3><i class="bi bi-box-arrow-in-right"></i> Login</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="login" class="form-label">Login</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
              <input
                type="text"
                id="login"
                v-model="loginForm.login"
                class="form-control"
                placeholder="Seu login"
                required
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Senha</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
              <input
                type="password"
                id="password"
                v-model="loginForm.password"
                class="form-control"
                placeholder="Sua senha"
                required
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-3">
            <i class="bi bi-box-arrow-in-right me-2"></i> Entrar
          </button>
        </form>
        <p class="text-center">
          Não tem conta?
          <span class="form-toggle" @click="toggleForm">Cadastre-se aqui</span>
        </p>
      </div>

      <div v-else>
        <h3><i class="bi bi-person-plus-fill"></i> Cadastro</h3>
        <form @submit.prevent="handleRegister">
          <div class="mb-3" v-for="field in registerFields" :key="field.id">
            <label :for="field.id" class="form-label">{{ field.label }}</label>
            <div class="input-group">
              <span class="input-group-text"><i :class="field.icon"></i></span>
              <input
                :type="field.type"
                :id="field.id"
                v-model="registerForm[field.name]"
                :placeholder="field.placeholder"
                :required="field.required"
                class="form-control"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-success w-100 mb-3">
            <i class="bi bi-person-plus-fill me-2"></i> Cadastrar
          </button>
        </form>
        <p class="text-center">
          Já tem conta?
          <span class="form-toggle" @click="toggleForm">Faça login aqui</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const showLogin = ref(true)

const toggleForm = () => {
  showLogin.value = !showLogin.value
}

// Campos para cadastro
const registerFields = [
  { id: 'primeiroNome', name: 'primeiroNome', label: 'Primeiro Nome', icon: 'bi bi-person', placeholder: 'Seu primeiro nome', type: 'text', required: true },
  { id: 'ultimoNome', name: 'ultimoNome', label: 'Último Nome', icon: 'bi bi-person', placeholder: 'Seu sobrenome', type: 'text', required: true },
  { id: 'cpf', name: 'cpf', label: 'CPF', icon: 'bi bi-credit-card-2-front-fill', placeholder: 'Seu CPF', type: 'text', required: true },
  { id: 'cep', name: 'cep', label: 'CEP', icon: 'bi bi-geo-alt-fill', placeholder: 'CEP', type: 'text', required: true },
  { id: 'logradouro', name: 'logradouro', label: 'Logradouro', icon: 'bi bi-house-fill', placeholder: 'Rua, Av.', type: 'text', required: true },
  { id: 'bairro', name: 'bairro', label: 'Bairro', icon: 'bi bi-building', placeholder: 'Bairro', type: 'text', required: true },
  { id: 'complemento', name: 'complemento', label: 'Complemento', icon: 'bi bi-info-circle', placeholder: 'Apartamento, casa, etc.', type: 'text', required: false },
  { id: 'login', name: 'login', label: 'Login', icon: 'bi bi-person-circle', placeholder: 'Login desejado', type: 'text', required: true },
  { id: 'password', name: 'password', label: 'Senha', icon: 'bi bi-lock-fill', placeholder: 'Senha segura', type: 'password', required: true },
]

// Dados do formulário de cadastro
const registerForm = reactive({
  primeiroNome: '',
  ultimoNome: '',
  cpf: '',
  cep: '',
  logradouro: '',
  bairro: '',
  complemento: '',
  saldoPontos:0,
  login: '',
  password: ''

})
// Dados do formulário de login
const loginForm = reactive({
  login: '',
  password: '',
})

// Simulação de chamada de API — substitua pela sua função real (axios, fetch, etc)
async function apiPost(url, data) {
  console.log(`POST para ${url} com dados`, data)
  // Aqui você faria fetch ou axios.post(url, data)
  // Exemplo:
  // const res = await fetch(url, { method: 'POST', headers: {...}, body: JSON.stringify(data) })
  // return res.json()

  // Simular delay e resposta
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000))
}

async function handleLogin() {
  try {
    const response = await authStore.login(loginForm.login, loginForm.password)
    if (response && authStore.user.tipo=="ecoponto") {  // Se temos uma resposta (token), o login foi bem sucedido
      router.push('/ecoponto')
    } else {
      router.push('/usuario')
    }
  } catch (err) {
    alert('Erro no login')
    console.error(err)
  }
}

async function handleRegister() {
   try {
    const response = await api.post('/cadastro/usuario', registerForm)
    alert('Usuário cadastrado com sucesso!')
    console.log('Resposta do backend:', response.data)
    // Aqui você pode limpar o formulário ou redirecionar
  } catch (error) {
    if (error.response) {
      // Erro retornado pelo backend
      alert('Erro: ' + (error.response.data.message || 'Falha ao cadastrar usuário'))
    } else {
      // Erro de rede ou outro
      alert('Erro na conexão com o servidor')
    }
    console.error(error)
  }

}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';

.page-container {
  background: linear-gradient(135deg, #d7f3e3, #a8d5ba);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  border-radius: 1rem;
  box-shadow: 0 0 15px rgba(0, 100, 0, 0.2);
  width: 100%;
  max-width: 420px;
  background-color: #f0faf3;
}

.form-toggle {
  cursor: pointer;
  color: #2e7d32;
  font-weight: 600;
  text-decoration: underline;
}

.form-toggle:hover {
  color: #145214;
}

h3 {
  color: #2e7d32;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 0 1px 1px #b0d8b6;
}

.btn-primary {
  background-color: #2e7d32;
  border-color: #2e7d32;
}

.btn-primary:hover {
  background-color: #145214;
  border-color: #145214;
}

.btn-success {
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-success:hover {
  background-color: #357a38;
  border-color: #357a38;
}

.input-group-text {
  background-color: #a8d5ba;
  color: #1b3d1b;
  border: none;
}

input.form-control {
  border-radius: 0 0.375rem 0.375rem 0;
}
</style>
