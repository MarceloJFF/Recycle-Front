<template>
  <div>
    <header>
      <div class="header-container">
        <div class="logo">
          <i class="fas fa-recycle"></i>
          <span>RECICLE</span>
        </div>
        <nav>
          <ul>
            <li><router-link to="/ecopontos-proximos" id="nav-ecopontos">Ecopontos Próximos</router-link></li>
            <li><router-link to="/acoes-voluntarias" id="nav-acoes">Ações Voluntárias</router-link></li>
            <li><router-link to="/cadastro-ecoponto" id="nav-recompensas">Cadastrar Ponto de Coleta</router-link></li>
            <li><router-link to="/como-reciclar" id="nav-como-reciclar">Como Reciclar</router-link></li>
            <li><router-link to="/login" class="login-btn" id="nav-login">Login para Usuarios</router-link></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <h1>RECOMPENSAS VERDE</h1>
        <p>Recicle é uma plataforma digital que incentiva o descarte correto de resíduo e a adoção de práticas sustentáveis</p>
        <div class="search-container">
          <input type="text" class="search-input" v-model="search" placeholder="Digite seu CEP ou endereço" />
          <button class="search-btn" @click="buscarEcopontos"><i class="fas fa-search"></i> Buscar</button>
        </div>
      </section>

      <!-- Resultados da Busca -->
      <section v-if="ecopontos.length > 0" class="search-results">
        <h2 class="section-title">Ecopontos Encontrados</h2>
        <div class="ecopontos-grid">
          <div v-for="ecoponto in ecopontos" :key="ecoponto.id" class="ecoponto-card">
            <div class="ecoponto-header">
              <h3>{{ ecoponto.nome }}</h3>
              <span class="badge" :class="ecoponto.status === 'Ativo' ? 'badge-success' : 'badge-warning'">
                {{ ecoponto.status }}
              </span>
            </div>
            <div class="ecoponto-body">
              <p><i class="fas fa-map-marker-alt"></i> {{ ecoponto.endereco }}</p>
              <p><i class="fas fa-clock"></i> {{ ecoponto.horarioFuncionamento }}</p>
              <div class="tipos-aceitos">
                <h4>Tipos Aceitos:</h4>
                <div class="tipos-grid">
                  <span v-for="tipo in ecoponto.tiposAceitos" :key="tipo" class="tipo-badge">
                    {{ tipo }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h2 class="section-title">Nossos Pilares Principais</h2>

      <section class="features">
        <div v-for="(item, index) in pilares" :key="index" class="feature-card">
          <div class="feature-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </section>

      <section class="rewards-section">
        <h2 class="section-title">Programa de Recompensas</h2>
        <div class="rewards-grid" id="rewards-grid">
          <!-- Conteúdo dinâmico será adicionado via JS futuramente -->
        </div>
      </section>

      <h2 class="section-title">Como Reciclar o seu Lixo</h2>
      <section class="features">
        <div v-for="(etapa, index) in etapas" :key="index" class="feature-card">
          <div class="feature-icon">
            <i :class="etapa.icon"></i>
          </div>
          <h3>{{ etapa.title }}</h3>
          <p>{{ etapa.text }}</p>
        </div>
      </section>

      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <span class="close-btn" @click="showModal = false">&times;</span>
          <h2 id="modal-title">Detalhes do Ecoponto</h2>
          <div class="modal-body" id="modal-body">
            <!-- Conteúdo dinâmico será inserido aqui -->
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="footer-container">
        <div v-for="(coluna, index) in footer" :key="index" class="footer-column">
          <h3>{{ coluna.title }}</h3>
          <ul>
            <li v-for="(item, idx) in coluna.links" :key="idx">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Conecte-se</h3>
          <p>Nos siga nas redes sociais</p>
          <div class="social-icons">
            <a href="#"><i class="fab fa-figma"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-github"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2025 Recicle - Todos os direitos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../../assets/styles.css'
import api from '@/services/api'

const search = ref('')
const ecopontos = ref([])
const showModal = ref(false)

const buscarEcopontos = async () => {
  try {
    const response = await api.get('/ecoponto')
    ecopontos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar ecopontos:', error)
    alert('Erro ao buscar ecopontos. Por favor, tente novamente.')
  }
}

const pilares = [
  {
    icon: 'fas fa-map-marker-alt',
    title: '1 - Localização de Ecopontos',
    text: 'Usuários podem buscar, por CEP ou endereço, os pontos de coleta seletiva mais próximos para destinar vidro, plástico, papel, metal e orgânicos.'
  },
  {
    icon: 'fas fa-hands-helping',
    title: '2 - Ações Voluntárias',
    text: 'O site reúne e divulga mutirões de limpeza, plantios e eventos educativos...'
  },
  {
    icon: 'fas fa-handshake',
    title: '3 - Parcerias com Empresas',
    text: 'Organizações podem cadastrar seus pontos de coleta, campanhas de sustentabilidade...'
  },
  {
    icon: 'fas fa-award',
    title: '4 - Recompensa Verde',
    text: 'A cada descarte realizado de forma correta, o usuário acumula pontos...'
  }
]

const etapas = [
  {
    icon: 'fas fa-trash-alt',
    title: 'Separação',
    text: 'Separe os materiais por tipo: papel, plástico, vidro, metal e orgânicos.'
  },
  {
    icon: 'fas fa-broom',
    title: 'Limpeza',
    text: 'Lave os recipientes para evitar odores e facilitar a reciclagem.'
  },
  {
    icon: 'fas fa-box-open',
    title: 'Armazenamento',
    text: 'Armazene os materiais separadamente em recipientes adequados.'
  },
  {
    icon: 'fas fa-truck',
    title: 'Descarte',
    text: 'Leve até o ecoponto mais próximo ou agende a coleta seletiva.'
  }
]

const footer = [
  {
    title: 'Sobre Nós',
    links: ['Missão', 'Equipe', 'Parceiros', 'Impacto Ambiental']
  },
  {
    title: 'Recursos',
    links: ['Ecopontos', 'Eventos', 'Guia de Reciclagem', 'Recompensas']
  },
  {
    title: 'Ajuda',
    links: ['FAQ', 'Contato', 'Termos de Uso', 'Política de Privacidade']
  }
]
</script>

<style scoped>
/* Estilos gerais */
:root {
  --primary-color: #1b8541;
  --secondary-color: #146c33;
  --text-color: #333;
  --light-bg: #f8f9fa;
  --white: #ffffff;
}

/* Header */
.header-container {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1rem 2rem;
}

.logo {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul li a {
  color: var(--white);
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;
}

nav ul li a:hover {
  background-color: var(--secondary-color);
  border-radius: 4px;
}

/* Hero Section */
.hero {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 4rem 2rem;
  text-align: center;
}

.search-container {
  max-width: 600px;
  margin: 2rem auto;
}

.search-input {
  padding: 0.8rem;
  border: none;
  border-radius: 4px 0 0 4px;
  width: 70%;
}

.search-btn {
  background-color: var(--secondary-color);
  color: var(--white);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #0d4d24;
}

/* Ecopontos Grid */
.ecopontos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.ecoponto-card {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.ecoponto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.badge-success {
  background-color: var(--primary-color);
  color: var(--white);
}

.badge-warning {
  background-color: #ffc107;
  color: var(--text-color);
}

.tipos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tipo-badge {
  background-color: var(--light-bg);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.feature-card {
  background-color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

/* Footer */
footer {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 3rem 2rem 1rem;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column h3 {
  margin-bottom: 1rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 0.5rem;
}

.footer-column a {
  color: var(--white);
  text-decoration: none;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icons a {
  color: var(--white);
  font-size: 1.5rem;
}

.copyright {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
</style>
