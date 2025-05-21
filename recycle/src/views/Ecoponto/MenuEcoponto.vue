<template>
  <div>
    <NavBar></NavBar>


    <main class="container my-5">
      <h2 class="text-center mb-4">Menu Principal</h2>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="(card, index) in cards" :key="index">
          <div class="card text-center mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.description }}</p>
              <a :href="card.link" class="btn btn-success">Acessar</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from "../../components/NavBar.vue";

const cards = ref([
  {
    title: 'Gerar Evento',
    description: 'Crie e configure eventos para usuários se cadastrarem.',
    link: './gerarEveneto.html'
  },
  {
    title: 'Editar Informações',
    description: 'Altere dados da empresa e tipos de resíduos aceitos.',
    link: './conf_Ecoponto.html'
  },
  {
    title: 'Cadastrar Benefícios',
    description: 'Adicione os benefícios disponíveis nos eventos.',
    link: 'cadastrar-beneficios.html'
  }
])
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
</style>
