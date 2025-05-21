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

   
          <div class="text-center">
            <button type="submit" class="btn btn-success">Salvar Evento</button>
          </div>
        </form>
      </div>
    </main>

    <!-- Tabela de Eventos -->
    <div class="container mb-5">
      <div class="row mb-3">
        <div class="col-md-6">
          <h3>Lista de Eventos</h3>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input 
              type="text" 
              class="form-control" 
              v-model="pesquisa" 
              placeholder="Pesquisar evento por nome..."
              @input="filtrarEventos"
            >
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-success">
            <tr>
              <th>Descrição</th>
              <th>Endereço</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Benefícios</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evento in eventosFiltrados" :key="evento.id">
              <td>{{ evento.descricao }}</td>
              <td>{{ evento.endereco }}</td>
              <td>{{ formatarData(evento.data) }}</td>
              <td>{{ evento.horaInicio }} - {{ evento.horaFim }}</td>
              <td>{{ evento.beneficios }}</td>
              <td>
                <button 
                  class="btn btn-warning btn-sm me-2" 
                  @click="editarEvento(evento)"
                  title="Editar"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button 
                  class="btn btn-danger btn-sm" 
                  @click="confirmarCancelamento(evento)"
                  title="Cancelar"
                >
                  <i class="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
            <tr v-if="eventosFiltrados.length === 0">
              <td colspan="6" class="text-center">Nenhum evento encontrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from "../../components/NavBar.vue";
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const descricao = ref('')
const endereco = ref('')
const data = ref('')
const horaInicio = ref('')
const horaFim = ref('')
const beneficios = ref('')
const pesquisa = ref('')
const eventos = ref([])
const eventoEditando = ref(null)

// Computed property para filtrar eventos
const eventosFiltrados = computed(() => {
  if (!pesquisa.value) return eventos.value;
  const termo = pesquisa.value.toLowerCase();
  return eventos.value.filter(evento => 
    evento.descricao.toLowerCase().includes(termo)
  );
});

// Função para formatar a data
function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

// Carregar eventos
async function carregarEventos() {
  try {
    const response = await api.get('/eventos', {
      params: {
        login: authStore.user.login
      }
    });
    eventos.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
    alert('Erro ao carregar eventos');
  }
}

// Salvar ou atualizar evento
async function salvarEvento() {
  try {
    const evento = {
      descricao: descricao.value,
      endereco: endereco.value,
      data: data.value,
      horaInicio: horaInicio.value,
      horaFim: horaFim.value,
      loginUsuario: authStore.user.login
    }

    if (eventoEditando.value) {
      await api.put(`/eventos/${eventoEditando.value.id}`, evento);
    } else {
      await api.post('/eventos', evento);
    }

    await carregarEventos();
    limparFormulario();
    alert('Evento salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar evento:', error);
    alert('Erro ao salvar evento');
  }
}

// Editar evento
function editarEvento(evento) {
  eventoEditando.value = evento;
  descricao.value = evento.descricao;
  endereco.value = evento.endereco;
  data.value = evento.data;
  horaInicio.value = evento.horaInicio;
  horaFim.value = evento.horaFim;
  beneficios.value = evento.beneficios;
  
  // Scroll para o formulário
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Confirmar cancelamento
function confirmarCancelamento(evento) {
  if (confirm(`Tem certeza que deseja cancelar o evento "${evento.descricao}"?`)) {
    cancelarEvento(evento);
  }
}

// Cancelar evento
async function cancelarEvento(evento) {
  try {
    await api.delete(`/eventos/${evento.id}`);
    await carregarEventos();
    alert('Evento cancelado com sucesso!');
  } catch (error) {
    console.error('Erro ao cancelar evento:', error);
    alert('Erro ao cancelar evento');
  }
}

// Limpar formulário
function limparFormulario() {
  descricao.value = '';
  endereco.value = '';
  data.value = '';
  horaInicio.value = '';
  horaFim.value = '';
  beneficios.value = '';
  eventoEditando.value = null;
}

// Carregar eventos ao montar o componente
onMounted(carregarEventos);
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

/* Novos estilos */
.table-success {
  background-color: #1b8541 !important;
  color: white;
}

.btn-warning {
  color: white;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  background-color: #ffca2c;
  border-color: #ffc720;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #bb2d3b;
  border-color: #b02a37;
}

.input-group-text {
  background-color: #1b8541;
  color: white;
  border: none;
}

.form-control:focus {
  border-color: #1b8541;
  box-shadow: 0 0 0 0.25rem rgba(27, 133, 65, 0.25);
}
</style>
