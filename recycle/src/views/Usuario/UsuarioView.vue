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
        <span class="badge bg-primary fs-5">Saldo de Pontos: <strong>120</strong></span>
      </div>

      <div class="list-group">
        <div
          v-for="(item, index) in pontos"
          :key="index"
          class="list-group-item"
        >
          <div class="d-flex w-100 justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ item.nome }}</h5>
              <p class="mb-1">{{ item.descricao }}</p>
              <small :class="item.tipo === 'Ecoponto' ? 'text-success' : 'text-info'">
                <i :class="item.tipo === 'Ecoponto' ? 'bi bi-check2-circle me-1' : 'bi bi-building me-1'"></i>
                Tipo: {{ item.tipo }}
              </small>
            </div>
            <small><i class="bi bi-geo-alt-fill me-1"></i>{{ item.distancia }}</small>
          </div>
          <button
            class="btn btn-sm btn-primary mt-2"
            data-bs-toggle="modal"
            data-bs-target="#solicitarEntregaModal"
            @click="abrirSolicitacao(item.nome)"
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
                <strong>{{ solicitacao.local }}</strong> - {{ solicitacao.material }} - {{ solicitacao.quantidade }} kg -
                Status: <span :class="solicitacao.status === 'Aceito' ? 'badge bg-success' : 'badge bg-warning text-dark'">{{ solicitacao.status }}</span>
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
import { ref } from 'vue';

const pontos = ref([
  {
    nome: 'Ecoponto Central',
    descricao: 'Recebe plástico, vidro e metal',
    tipo: 'Ecoponto',
    distancia: '2,5 km'
  },
  {
    nome: 'ReciclaMais Ltda',
    descricao: 'Compra papel e alumínio',
    tipo: 'Empresa',
    distancia: '3,7 km'
  }
]);

const ecopontoSelecionado = ref('');
const tipoMaterial = ref('');
const quantidadeKg = ref(null);

const solicitacoes = ref([
  { local: 'Ecoponto Central', material: 'Plástico', quantidade: 5, status: 'Pendente' },
  { local: 'ReciclaMais Ltda', material: 'Vidro', quantidade: 3, status: 'Aceito' }
]);

function abrirSolicitacao(nome) {
  ecopontoSelecionado.value = nome;
  tipoMaterial.value = '';
  quantidadeKg.value = null;
}

function enviarSolicitacao() {
  if (!ecopontoSelecionado.value || !tipoMaterial.value || !quantidadeKg.value) return;

  solicitacoes.value.push({
    local: ecopontoSelecionado.value,
    material: getTipoMaterialNome(tipoMaterial.value),
    quantidade: quantidadeKg.value,
    status: 'Pendente'
  });

  const modal = bootstrap.Modal.getInstance(document.getElementById('solicitarEntregaModal'));
  modal.hide();
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
