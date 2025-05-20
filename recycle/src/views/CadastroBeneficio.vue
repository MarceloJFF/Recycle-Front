<template>

  <NavBar></NavBar>

  <div class="container my-5 p-4 bg-light rounded shadow" style="max-width: 900px;">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-success">Gerenciar Benefícios</h2>
      <div class="d-flex gap-2">
        <input
          v-model="busca"
          type="text"
          class="form-control"
          placeholder="Buscar por nome..."
          aria-label="Buscar benefícios"
        />
        <button class="btn btn-success" @click="abrirModal()">Adicionar Benefício</button>
      </div>
    </div>

    <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
      <table class="table table-bordered table-hover mb-0">
        <thead class="table-success sticky-top">
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Pontos</th>
            <th>Data de Expiração</th>
            <th>Status</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="beneficio in beneficiosFiltrados" :key="beneficio.id">
            <td>{{ beneficio.id }}</td>
            <td>{{ beneficio.descricao }}</td>
            <td>{{ beneficio.pontos }}</td>
            <td>{{ formatarData(beneficio.dataExpiracao) }}</td>
            <td>{{ beneficio.status }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="abrirModal(beneficio)">Editar</button>
            </td>
          </tr>
          <tr v-if="beneficiosFiltrados.length === 0">
            <td colspan="6" class="text-center">Nenhum benefício encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalBeneficio"
      tabindex="-1"
      aria-labelledby="modalBeneficioLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog">
        <form @submit.prevent="salvarBeneficio" class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="modalBeneficioLabel">
              {{ modoEdicao ? "Editar Benefício" : "Cadastrar Novo Benefício" }}
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="fecharModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="descricao" class="form-label">Descrição do Benefício</label>
              <textarea
                id="descricao"
                v-model="form.descricao"
                class="form-control"
                rows="3"
                required
                autofocus
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="pontos" class="form-label">Pontos Necessários</label>
              <input
                id="pontos"
                v-model.number="form.pontos"
                type="number"
                class="form-control"
                min="1"
                required
              />
            </div>
            <div class="mb-3">
              <label for="dataExpiracao" class="form-label">Data de Expiração</label>
              <input
                id="dataExpiracao"
                v-model="form.dataExpiracao"
                type="date"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="fecharModal">
              Cancelar
            </button>
            <button type="submit" class="btn btn-success">Salvar Benefício</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import "../assets/ecoponto.css"
// Dados iniciais exemplo
const beneficios = ref([
  {
    id: 1,
    descricao: "Desconto em lojas parceiras",
    pontos: 150,
    dataExpiracao: "2025-12-31",
    status: "Ativo",
  },
  {
    id: 2,
    descricao: "Ingresso para evento cultural",
    pontos: 300,
    dataExpiracao: "2025-06-30",
    status: "Ativo",
  },
]);

const busca = ref("");
const modoEdicao = ref(false);
const form = ref({
  id: null,
  descricao: "",
  pontos: null,
  dataExpiracao: "",
  status: "Ativo",
});

const modal = ref(null);

function formatarData(data) {
  if (!data) return "";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}

// Filtra benefícios pela busca
const beneficiosFiltrados = computed(() => {
  if (!busca.value.trim()) return beneficios.value;
  return beneficios.value.filter((b) =>
    b.descricao.toLowerCase().includes(busca.value.toLowerCase())
  );
});

// Abrir modal para novo benefício ou edição
function abrirModal(beneficio = null) {
  if (beneficio) {
    modoEdicao.value = true;
    form.value = { ...beneficio }; // Clona para editar
  } else {
    modoEdicao.value = false;
    form.value = {
      id: null,
      descricao: "",
      pontos: null,
      dataExpiracao: "",
      status: "Ativo",
    };
  }
  const modalEl = modal.value;
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// Fechar modal
function fecharModal() {
  const modalEl = modal.value;
  bootstrap.Modal.getInstance(modalEl)?.hide();
}

// Salvar (adicionar ou editar)
function salvarBeneficio() {
  if (modoEdicao.value) {
    // Editar benefício
    const index = beneficios.value.findIndex((b) => b.id === form.value.id);
    if (index !== -1) {
      beneficios.value[index] = { ...form.value };
    }
  } else {
    // Adicionar novo benefício
    const novoId =
      beneficios.value.length > 0
        ? Math.max(...beneficios.value.map((b) => b.id)) + 1
        : 1;
    beneficios.value.push({ ...form.value, id: novoId });
  }
  fecharModal();
}

// Inicializa referência do modal Bootstrap após o componente montar
onMounted(() => {
  modal.value = document.getElementById("modalBeneficio");
});
</script>

<style scoped>
.table-success {
  background-color: #2d6a4f !important;
  color: white !important;
}

.container {
  background-color: #f8f9fa;
}

h2 {
  color: #2d4739;
}
</style>

