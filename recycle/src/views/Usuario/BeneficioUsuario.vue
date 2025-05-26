<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <a class="navbar-brand" href="#"><i class="bi bi-recycle me-2"></i>EcoPonto</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
         <ul class="navbar-nav ms-auto">
  <li class="nav-item">
    <router-link class="nav-link active" to="/">Início</router-link>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/usuario/beneficio">Benefícios</router-link>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#minhasSolicitacoesModal">
      Minhas Solicitações
    </a>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/usuario/perfil">Perfil</router-link>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" @click.prevent="logout">Sair</a>
  </li>
</ul>

        </div>
      </div>
    </nav>

    <!-- Conteúdo principal -->
    <main class="container mt-4">
      <h2 class="mb-4 text-white">Benefícios Disponíveis</h2>

      <!-- Campo de pesquisa -->
      <div class="mb-4">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input
            type="text"
            class="form-control"
            v-model="pesquisa"
            placeholder="Pesquisar benefício por nome..."
          />
        </div>
      </div>

      <!-- Tabela de benefícios -->
      <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered align-middle">
          <thead class="table-success">
            <tr>
              <th>Descrição</th>
              <th>Custo (Pontos)</th>
              <th>Ofertante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="beneficio in beneficiosFiltrados" :key="beneficio.id">
              <td>{{ beneficio.descricao }}</td>
              <td>{{ beneficio.qtdPontosNecessarios }}</td>
              <td>{{ beneficio.empresa }}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm"
                  @click="solicitarBeneficio(beneficio)"
                  :disabled="beneficio.solicitado"
                >
                  {{ beneficio.solicitado ? 'Solicitado' : 'Trocar Benefício' }}
                </button>
              </td>
            </tr>
            <tr v-if="beneficiosFiltrados.length === 0">
              <td colspan="4" class="text-center">Nenhum benefício encontrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Modal Minhas Solicitações -->
    <div
      class="modal fade"
      id="minhasSolicitacoesModal"
      tabindex="-1"
      aria-labelledby="minhasSolicitacoesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="minhasSolicitacoesModalLabel">
              <i class="bi bi-list-check me-2"></i>Minhas Solicitações
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(solicitacao, index) in solicitacoes"
                :key="index"
              >
                <strong>{{ solicitacao.local }}</strong> - {{ solicitacao.tipo }} -
                {{ solicitacao.quantidade }} kg - Status:
                <span
                  class="badge"
                  :class="{
                    'bg-warning text-dark': solicitacao.status === 'Pendente',
                    'bg-success': solicitacao.status === 'Aceito'
                  }"
                >
                  {{ solicitacao.status }}
                </span>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-circle me-1"></i>Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const authStore = useAuthStore()
const pesquisa = ref('')
const beneficios = ref([])
const solicitacoes = ref([])

// Computed property para filtrar benefícios baseado na pesquisa
const beneficiosFiltrados = computed(() => {
  if (!pesquisa.value) return beneficios.value
  const termoPesquisa = pesquisa.value.toLowerCase()
  return beneficios.value.filter(beneficio =>
    beneficio.descricao.toLowerCase().includes(termoPesquisa)
  )
})

async function carregar solicitacoes(){

}

// Função para carregar os benefícios do backend
async function carregarBeneficios() {
  try {
    const response = await api.get('/beneficios/ativos',{
      params: {
        loginUsuario: useAuthStore().user.login
      }
    })
    beneficios.value = response.data
  } catch (error) {
    console.error('Erro ao carregar benefícios:', error)
    alert('Erro ao carregar benefícios. Por favor, tente novamente.')
  }
}

function logout(){
  useAuthStore().logout();
}
// Função para solicitar um benefício
async function solicitarBeneficio(beneficio) {
  try {
    const userLogin = authStore.user.login
  await api.post(`/troca-beneficio/?login=${userLogin}`, {
    id: beneficio.id // Note que mudamos de 'beneficioId' para 'id' para match com o DTO
  })

    // Atualiza o status do benefício
    beneficio.solicitado = true
    alert('Benefício solicitado com sucesso!')
  } catch (error) {
    console.error('Erro ao solicitar benefício:', error)
    alert('Erro ao solicitar benefício. Por favor, tente novamente.')
  }
}

// Carrega os benefícios quando o componente é montado
onMounted(() => {
  carregarBeneficios()
})
</script>

<style scoped>
.text-white {
  color: white;
}

.table-responsive {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
  max-width: 500px;
}

.btn-primary {
  background-color: #1b8541;
  border-color: #1b8541;
}

.btn-primary:hover {
  background-color: #146c33;
  border-color: #146c33;
}

.btn-primary:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>

<!-- Inclua os estilos externos e scripts no index.html do projeto -->
