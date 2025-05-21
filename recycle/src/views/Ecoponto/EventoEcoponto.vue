<template>
    <NavBar></NavBar>

  <div>

    <main class="container my-5">
      <h2 class="text-center mb-4">Configurar Novo Evento</h2>
      <div class="form-container">
        <form @submit.prevent="salvarEvento">
          <div class="mb-3">
            <label for="descricao" class="form-label">Descrição do Evento</label>
            <input type="text" class="form-control" id="descricao" v-model="descricao" placeholder="Digite a descrição">
          </div>

          <div class="mb-3">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" v-model="endereco" placeholder="Digite o endereço do evento">
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="data" class="form-label">Data</label>
              <input type="date" class="form-control" id="data" v-model="data">
            </div>
            <div class="col-md-4">
              <label for="horaInicio" class="form-label">Horário de Início</label>
              <input type="time" class="form-control" id="horaInicio" v-model="horaInicio">
            </div>
            <div class="col-md-4">
              <label for="horaFim" class="form-label">Horário de Término</label>
              <input type="time" class="form-control" id="horaFim" v-model="horaFim">
            </div>
          </div>

          <div class="mb-3">
            <label for="beneficios" class="form-label">Benefícios Disponíveis</label>
            <textarea class="form-control" id="beneficios" rows="3" v-model="beneficios" placeholder="Informe os benefícios oferecidos aos participantes"></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-success">Salvar Evento</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from "../../components/NavBar.vue";

const descricao = ref('')
const endereco = ref('')
const data = ref('')
const horaInicio = ref('')
const horaFim = ref('')
const beneficios = ref('')

function salvarEvento() {
  const evento = {
    descricao: descricao.value,
    endereco: endereco.value,
    data: data.value,
    horaInicio: horaInicio.value,
    horaFim: horaFim.value,
    beneficios: beneficios.value,
  }

  console.log('Evento salvo:', evento)

  // Aqui você pode enviar os dados para uma API, resetar o formulário, etc.
  alert('Evento salvo com sucesso!')
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import './ecoponto empresa/styles/estiloGerenciarInformacoesEmpresa.css';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
}

.header h3 {
  margin: 0;
}

.header a {
  margin-left: 1rem;
  text-decoration: none;
  color: #198754;
}
.header {
  background-color: #1b8541;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}

.header a:hover {
  text-decoration: underline;
}

.btn-success {
  background-color: #1b8541;
  border-color: #1b8541;
}

.btn-success:hover {
  background-color: #146c33;
  border-color: #146c33;
}

</style>
