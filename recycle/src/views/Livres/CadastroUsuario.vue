<template>
  <div class="container py-5" style="max-width: 600px;">
    <div class="card p-4 shadow rounded-4 bg-light">
      <h2 class="text-center text-success mb-4">
        <i class="bi bi-person-plus-fill me-2"></i>Cadastro de Usuário
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3" v-for="field in camposUsuario" :key="field.id">
          <label :for="field.id" class="form-label">{{ field.label }}</label>
          <div class="input-group">
            <span class="input-group-text bg-success text-white">
              <i :class="field.icon"></i>
            </span>
            <input
              :type="field.type"
              class="form-control"
              :id="field.id"
              v-model="form[field.id]"
              :placeholder="field.placeholder"
              :required="field.required"
            />
          </div>
        </div>

        <hr />

        <h4 class="text-success mb-3">
          <i class="bi bi-person-circle me-2"></i>Dados de Acesso
        </h4>

        <div class="mb-3">
          <label for="login" class="form-label">Login</label>
          <div class="input-group">
            <span class="input-group-text bg-success text-white">
              <i class="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="login"
              v-model="form.login"
              placeholder="Seu login"
              required
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">Senha</label>
          <div class="input-group">
            <span class="input-group-text bg-success text-white">
              <i class="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              placeholder="Senha segura"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-success w-100">
          <i class="bi bi-person-plus-fill me-2"></i>Cadastrar Usuário
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import '../../assets/styles.css'
import  UserDto  from '@/dto/UserDto'
import api from '@/services/api'

const form = reactive<UserDto>({
  primeiro_nome: '',
  ultimo_nome: '',
  cpf: '',
  cep: '',
  logradouro: '',
  bairro: '',
  complemento: '',
  login: '',
  password: '',
})

const camposUsuario = [
  {
    id: 'primeiro_nome',
    label: 'Primeiro Nome',
    icon: 'bi bi-person',
    placeholder: 'Seu primeiro nome',
    type: 'text',
    required: true,
  },
  {
    id: 'ultimo_nome',
    label: 'Último Nome',
    icon: 'bi bi-person',
    placeholder: 'Seu sobrenome',
    type: 'text',
    required: true,
  },
  {
    id: 'cpf',
    label: 'CPF',
    icon: 'bi bi-credit-card-2-front-fill',
    placeholder: 'Seu CPF',
    type: 'text',
    required: true,
  },
  {
    id: 'cep',
    label: 'CEP',
    icon: 'bi bi-geo-alt-fill',
    placeholder: 'CEP',
    type: 'text',
    required: true,
  },
  {
    id: 'logradouro',
    label: 'Logradouro',
    icon: 'bi bi-house-fill',
    placeholder: 'Rua, Avenida...',
    type: 'text',
    required: true,
  },
  {
    id: 'bairro',
    label: 'Bairro',
    icon: 'bi bi-building',
    placeholder: 'Bairro',
    type: 'text',
    required: true,
  },
  {
    id: 'complemento',
    label: 'Complemento',
    icon: 'bi bi-info-circle',
    placeholder: 'Apartamento, casa, etc.',
    type: 'text',
    required: false,
  },
]
async function handleSubmit() {
  alert("Oi")
  try {
    const response = await api.post('/cadastro/usuario', form)
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
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css";

/* Se necessário, você pode importar seu ecoponto.css aqui também: */
/* @import "@/assets/styles/ecoponto.css"; */
</style>
