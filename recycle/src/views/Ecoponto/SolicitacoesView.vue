<template>
  <NavBar></NavBar>
  <div>
    <main class="container mt-4">
      <h2 class="mb-4 text-white">Solicitações de Entrega</h2>

      <ul class="list-group" v-if="solicitacoes.length > 0">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(solicitacao, index) in solicitacoes"
          :key="solicitacao.id"
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

      <div v-else class="alert alert-info text-center">
        Nenhuma solicitação pendente.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from "../../components/NavBar.vue"
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const solicitacoes = ref([])
const authStore = useAuthStore()

async function carregarSolicitacoes() {
  try {
    const response = await api.get('/entregas', {
      params: {
        loginEcoponto: authStore.user.login
      }
    }) // Substitua pela URL real da sua API
    if (!response.ok) throw new Error('Erro ao buscar solicitações')
    const data = await response.json()
    solicitacoes.value = data
  } catch (error) {
    console.error('Erro ao carregar solicitações:', error)
  }
}

function aceitarSolicitacao(index) {
  alert(`Solicitação de ${solicitacoes.value[index].usuario} aceita.`)
  // Aqui você pode fazer algo como enviar requisição para o backend
}

function recusarSolicitacao(index) {
  alert(`Solicitação de ${solicitacoes.value[index].usuario} recusada.`)
  // Aqui também pode enviar para o backend
}

onMounted(() => {
  carregarSolicitacoes()
})
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
