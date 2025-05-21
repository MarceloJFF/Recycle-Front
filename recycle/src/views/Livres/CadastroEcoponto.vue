<template>
  <div class="card-cadastro mx-auto mt-5">
    <button @click="$router.back()" class="btn btn-outline-secondary btn-sm mb-3">
      <i class="bi bi-arrow-left"></i> Voltar
    </button>

    <h2><i class="bi bi-recycle me-2"></i>Cadastro de Ecoponto</h2>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Descrição</label>
        <input v-model="form.descricao" type="text" class="form-control" required />
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Latitude</label>
          <input v-model="form.latitude" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Longitude</label>
          <input v-model="form.longitude" type="text" class="form-control" required />
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <label class="form-label">CEP</label>
          <input v-model="form.cep" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Logradouro</label>
          <input v-model="form.logradouro" type="text" class="form-control" required />
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <label class="form-label">Bairro</label>
          <input v-model="form.bairro" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Complemento</label>
          <input v-model="form.complemento" type="text" class="form-control" />
        </div>
      </div>

      <hr class="my-4" />

      <h4 class="text-success mb-3"><i class="bi bi-person-circle me-2"></i>Responsável</h4>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nome do Responsável</label>
          <input v-model="form.responsavel" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Telefone</label>
          <input v-model="form.telefone" type="tel" class="form-control" required />
        </div>
      </div>

      <div class="mb-3 mt-2">
        <label class="form-label">CNPJ</label>
        <input v-model="form.cnpj" type="text" class="form-control" required />
      </div>

      <hr class="my-4" />

      <h4 class="text-success mb-3"><i class="bi bi-key-fill me-2"></i>Dados de Acesso</h4>

      <div class="mb-3">
        <label class="form-label">Login</label>
        <input v-model="form.login" type="text" class="form-control" required />
      </div>
      <div class="mb-4">
        <label class="form-label">Senha</label>
        <input v-model="form.password" type="password" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success w-100">
        <i class="bi bi-check-circle me-1"></i> Cadastrar Ecoponto
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  descricao: '',
  latitude: '',
  longitude: '',
  cep: '',
  logradouro: '',
  bairro: '',
  complemento: '',
  responsavel: '',
  telefone: '',
  cnpj: '',
  login: '',
  password: ''
})

import axios from 'axios'

async function submitForm() {
  try {
    const response = await axios.post('http://localhost:8080/cadastro/ecoponto', form)
    alert('Cadastro realizado com sucesso')
    // Aqui você pode adicionar lógica para redirecionar ou limpar o formulário
  } catch (error) {
    alert('Erro ao realizar o cadastro')
    // Aqui você pode adicionar lógica para exibir mensagens de erro ao usuário
  }
}

</script>

<style scoped>
.card-cadastro {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 100, 0, 0.2);
  max-width: 720px;
  width: 100%;
}
</style>
