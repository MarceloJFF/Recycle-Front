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
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link active" href="#">Início</a></li>
            <li class="nav-item"><a class="nav-link" href="/usuario/beneficio">Benefícios</a></li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#minhasSolicitacoesModal">Minhas Solicitações</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/usuario/perfil">Perfil</a></li>
            <li class="nav-item"><a class="nav-link" href="/logout">Sair</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Conteúdo -->
    <main class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="h3">Pontos de Coleta Próximos</h1>
        <span class="badge bg-primary fs-5">Saldo de Pontos: <strong>
          {{ pontosUsuario }}
        </strong></span>
      </div>

      <div class="list-group">
        <div
          v-for="(item, index) in pontos"
          :key="index"
          class="list-group-item mb-4"

        >
          <div class="d-flex w-100 justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">Nome: {{ item.nome }}</h5>
              <p class="mb-1">Descrição: {{ item.descricao }}</p>
              <p>CEP: {{ item.cep }}</p>
              <small :class="item.tipo === 'Ecoponto' ? 'text-success' : 'text-info'">
                <i :class="item.tipo === 'Ecoponto' ? 'bi bi-check2-circle me-1' : 'bi bi-building me-1'"></i>
                Tipo: {{ item.tipo }}
              </small>
            </div>
            <small>
    <a
      :href="`https://www.google.com/maps?q=${item.latitude},${item.longitude}`"
      target="_blank"
      rel="noopener"
      class="text-decoration-none text-body"
    >
      <i class="bi bi-geo-alt-fill me-1"></i>{{ item.distancia }}
    </a>
  </small>   
       </div>
          <button
            class="btn btn-sm btn-primary mt-2"
            data-bs-toggle="modal"
            data-bs-target="#solicitarEntregaModal"
            @click="abrirSolicitacao(item)"
          >
            <i class="bi bi-box-arrow-in-up-right me-1"></i>Solicitar entrega de resíduo
          </button>
        </div>
      </div>
    </main>

    <!-- Modal Solicitar Entrega -->
    <div
      class="modal fade"
      id="solicitarEntregaModal"
      tabindex="-1"
      aria-labelledby="solicitarEntregaModalLabel"
      aria-hidden="true"
      ref="modalEntrega"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="enviarSolicitacao">
          <div class="modal-header">
            <h5 class="modal-title">Solicitar Entrega de Resíduo - {{ ecopontoSelecionado }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" v-model="ecopontoSelecionado" />

            <div class="mb-3">
              <label for="tipoMaterial" class="form-label">Tipo de Material</label>
              <select class="form-select" id="tipoMaterial" v-model="tipoMaterial" required>
                <option value="" disabled selected>Selecione o tipo de material</option>
                <option value="1">Plástico</option>
                <option value="2">Vidro</option>
                <option value="3">Papel</option>
                <option value="4">Metal</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="quantidadeKg" class="form-label">Quantidade (kg)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                class="form-control"
                id="quantidadeKg"
                v-model="quantidadeKg"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success">
              <i class="bi bi-send-fill me-1"></i>Enviar Solicitação
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-1"></i>Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

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
            <h5 class="modal-title"><i class="bi bi-list-check me-2"></i>Minhas Solicitações</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="(solicitacao, i) in solicitacoes" :key="i">
                <strong>Local - {{ solicitacao.ecoponto.descricao }}</strong> Pontos Gerados- {{ solicitacao.qtdPontosGerados }} -
                Status: <span :class="solicitacao.status ? 'badge bg-success' : 'badge bg-warning text-dark'">{{ solicitacao.status ? 'Aceito' : 'Pendente' }}</span>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-circle me-1"></i>Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

// Substitua os dados mockados por uma chamada real à API
const pontos = ref([]);
const ecopontoSelecionado = ref('');
const tipoMaterial = ref('');
const quantidadeKg = ref(null);
const solicitacoes = ref([]);
const pontosUsuario = ref(0);

// Carrega os dados do usuário ao montar o componente
async function carregarPerfil() {
  try {
    const response = await api.get('/usuario/perfil', {
      params: {
        login: useAuthStore().user.login
      }
    });
    pontosUsuario.value = response.data.saldoPontos;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    alert('Erro ao carregar informações do usuário.');
  }


}

async function carregarSolicitacoes(){
  const response = await api.get('/entregas/', {
    params: { loginUsuario: useAuthStore().user.login }
  });
  solicitacoes.value = response.data;
  console.log(solicitacoes.value)
}
// Nova função para carregar os ecopontos
async function carregarEcopontos() {
  try {
    const response = await api.get('/ecoponto');
    pontos.value = response.data.map(ecoponto => ({
      id: ecoponto.id,
      nome: ecoponto.nome,
      descricao: ecoponto.descricao,
      tipo: 'Ecoponto' , // Você pode ajustar conforme os dados retornados
      distancia: calcularDistancia(ecoponto.latitude, ecoponto.longitude), // Adicione esta função se tiver geolocalização
      latitude: ecoponto.latitude,
      longitude: ecoponto.longitude,
      cep: ecoponto.cep
    }));
  } catch (error) {
    console.error('Erro ao carregar ecopontos:', error);
    alert('Erro ao carregar pontos de coleta.');
  }
}

// Função auxiliar para calcular distância (opcional)
function calcularDistancia(lat, lng) {
  // Implemente sua lógica de cálculo de distância aqui
  // Retorne uma string formatada como "2,5 km"
  return "Lat: "+lat+" Lng: "+lng; // Substitua por cálculo real
}

onMounted(async() => {
  await carregarPerfil();
  await carregarEcopontos();
  await carregarSolicitacoes();
    //carregarBeneficios();
});


// Restante do código permanece igual...
function abrirSolicitacao(ecoponto) {
  
  ecopontoSelecionado.value = ecoponto;
  tipoMaterial.value = '';
  quantidadeKg.value = null;
}

function enviarSolicitacao() {
 
  if (!ecopontoSelecionado.value || !tipoMaterial.value || !quantidadeKg.value) return;
  const response =  api.post('/entregas/nova', {
      idEcoponto: ecopontoSelecionado.value.id,
      tipoLixoId: Number(tipoMaterial.value),
      kg: Number(quantidadeKg.value)
    }, {
      params: { loginUsuario: useAuthStore().user.login }
  });
  console.log(ecopontoSelecionado.value.id,tipoMaterial.value,quantidadeKg.value)
  if(response){
    alert('Solicitação enviada com sucesso');
  }else{
    alert('Erro ao enviar solicitação');
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById('solicitarEntregaModal'));
  modal.hide();
  window.location.reload();
}

function getTipoMaterialNome(codigo) {
  const map = {
    1: 'Plástico',
    2: 'Vidro',
    3: 'Papel',
    4: 'Metal'
  };
  return map[codigo] || 'Desconhecido';
}
</script>

<style scoped>
/* Importa CSS externo se necessário */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css');


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
