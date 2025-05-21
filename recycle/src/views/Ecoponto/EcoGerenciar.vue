<template>
  <NavBar></NavBar>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <a class="navbar-brand" href="#">EcoPonto</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" href="solicitacoes.html">Solicitações</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="configurar.html">Configurar Ecoponto</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container mt-4">
      <h2 class="mb-4 text-white">Solicitações de Entrega</h2>

      <ul class="list-group">
        <li
          v-for="(solicitacao, index) in solicitacoes"
          :key="index"
          class="list-group-item d-flex justify-content-between align-items-center"
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
  alert(`Solicitação de ${solicitacoes.value[index].usuario} aceita!`)
  // Aqui você pode integrar com a API ou remover da lista:
  // solicitacoes.value.splice(index, 1)
}

function recusarSolicitacao(index) {
  alert(`Solicitação de ${solicitacoes.value[index].usuario} recusada.`)
  // solicitacoes.value.splice(index, 1)
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

.text-white {
  color: white;
}

body {
  background: linear-gradient(135deg, #d7f3e3, #a8d5ba);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 3rem;
}
.navbar.bg-success {
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}
h1.h3 {
  color: #2e7d32;
  font-weight: 700;
  text-shadow: 0 1px 1px #b0d8b6;
}
.list-group-item {
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(46,125,50,0.1);
  transition: box-shadow 0.3s ease;
}
.list-group-item:hover {
  box-shadow: 0 4px 12px rgba(46,125,50,0.2);
}
.btn-primary {
  background-color: #2e7d32;
  border-color: #2e7d32;
  font-weight: 600;
}
.btn-primary:hover {
  background-color: #145214;
  border-color: #145214;
}
/* Modal header color */
.modal-header {
  background-color: #a8d5ba;
  color: #1b3d1b;
  font-weight: 600;
}
/* Modal footer button spacing */
.modal-footer button {
  min-width: 120px;
}
</style>
