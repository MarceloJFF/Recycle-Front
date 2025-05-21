<template>
    <NavBar></NavBar>

  <div>

    <main class="container mt-4">
      <h2 class="mb-4 text-white">Configurar Tipos de Resíduos e Preços</h2>

      <form @submit.prevent="salvarConfiguracoes">
        <table class="table table-striped table-hover table-bordered align-middle bg-white rounded">
          <thead class="table-success">
            <tr>
              <th>Tipo de Resíduo</th>
              <th>Aceito</th>
              <th>Pontos por Kg</th>
              <th>Preço por Kg (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(residuo, index) in residuos" :key="index">
              <td>{{ residuo.tipo }}</td>
              <td>
                <input type="checkbox" v-model="residuo.aceito" />
              </td>
              <td>
                <input type="number" class="form-control form-control-sm" v-model.number="residuo.pontos" min="0" required />
              </td>
              <td>
                <input type="number" class="form-control form-control-sm" v-model.number="residuo.preco" min="0" step="0.01" required />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" class="btn btn-success w-100">Salvar Alterações</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from "../../components/NavBar.vue";

const residuos = ref([
  { tipo: 'Plástico', aceito: true, pontos: 10, preco: 2.50 },
  { tipo: 'Vidro', aceito: false, pontos: 8, preco: 1.80 },
  { tipo: 'Papel', aceito: true, pontos: 5, preco: 1.20 },
  { tipo: 'Metal', aceito: false, pontos: 12, preco: 3.00 }
])

function salvarConfiguracoes() {
  console.log('Configurações salvas:', residuos.value)
  alert('Configurações salvas com sucesso!')
  // Aqui você pode fazer um POST com axios para sua API
  // axios.post('/api/ecoponto/atualizar', residuos.value)
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

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
