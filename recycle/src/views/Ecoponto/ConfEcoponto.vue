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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(residuo, index) in residuos" :key="index">
              <td>{{ residuo.tipo }}</td>
              <td>
                <input type="checkbox" v-model="residuo.aceito" />
              </td>
              <td>
                <input v-if="residuo.aceito" type="number" class="form-control form-control-sm" v-model.number="residuo.pontosKg" min="0" required />
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
import { ref, onMounted } from 'vue'
import NavBar from "../../components/NavBar.vue";
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';

const authStore = useAuthStore();

const residuos = ref([
  { tipo: 'Vidro', aceito: true, pontosKg: 10, tipoLixoId:1 },
  { tipo: 'Metal', aceito: false, pontosKg: 8,  tipoLixoId:2 },
  { tipo: 'Papel', aceito: false, pontosKg: 8,  tipoLixoId:3 },
  { tipo: 'Plastico', aceito: true, pontosKg: 5,  tipoLixoId:4 },
  { tipo: 'Eletronico', aceito: false, pontosKg: 12,  tipoLixoId:5 }
])

async function carregarConfiguracoes() {
  try {
    const userLogin = authStore.user.login;
    const response = await api.get(`/gerenciamento-ecoponto-tipo-lixo/tipos-lixo-aceitos?login=${userLogin}`);
    
    if (response.data && response.data.length > 0) {
      // Atualiza os dados com as configurações do servidor
      residuos.value = residuos.value.map(residuo => {
        const configuracao = response.data.find(config => config.tipoLixoId === residuo.tipoLixoId);
        if (configuracao) {
          return {
            ...residuo,
            aceito: configuracao.aceito,
            pontosKg: configuracao.pontosKg
          };
        }
        return residuo;
      });
      console.log(residuos.value);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações:', error);
    alert('Erro ao carregar configurações. Por favor, tente novamente.');
  }
}

async function salvarConfiguracoes() {
  try {
    const userLogin = authStore.user.login;
    
    // Fazer a requisição para a API com login como query parameter
    await api.post(`/gerenciamento-ecoponto-tipo-lixo/salvar/?login=${userLogin}`, residuos.value);
    
    alert('Configurações salvas com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    alert('Erro ao salvar configurações. Por favor, tente novamente.');
  }
}

// Carrega as configurações quando o componente é montado
onMounted(() => {
  carregarConfiguracoes();
});
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
