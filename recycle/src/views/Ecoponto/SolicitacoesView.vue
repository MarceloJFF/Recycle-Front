<template>
  <NavBar></NavBar>
  <div>
    <main class="container mt-4">
      <h2 class="mb-4 text-white">Solicitações de Entrega</h2>

      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(solicitacao, index) in solicitacoes"
          :key="index"
        >
          <div>
            <strong>Usuário:</strong> {{ solicitacao.usuario }}<br />
            <strong>Tipo de Resíduo:</strong> {{ solicitacao.tipo }}<br />
            <strong>Quantidade:</strong> {{ solicitacao.quantidade }}
          </div>
          <div>
            <button class="btn btn-success btn-sm me-2" @click="aceitarSolicitacao(index)">Aceitar</button>
            <button class="btn btn-danger btn-sm" @click="recusarSolicitacao(index)">Recusar</button>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from "../../components/NavBar.vue";

const solicitacoes = ref([
  {
    usuario: 'João Silva',
    tipo: 'Plástico',
    quantidade: '5 kg'
  },
  {
    usuario: 'Maria Souza',
    tipo: 'Vidro',
    quantidade: '3 kg'
  }
])

function aceitarSolicitacao(index) {
  alert(`Solicitação de ${solicitacoes.value[index].usuario} aceita.`)
  // Aqui você pode fazer algo como remover da lista ou enviar para API
}

function recusarSolicitacao(index) {
  alert(`Solicitação de ${solicitacoes.value[index].usuario} recusada.`)
  // Aqui também pode fazer outras ações
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

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
.text-white {
  color: white;
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
