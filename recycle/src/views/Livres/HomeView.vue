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

    <main class="bg-light">
      <section class="hero bg-verde">
        <h1 class="text-white">RECOMPENSAS VERDE</h1>
        <p class="text-white">Recicle é uma plataforma digital que incentiva o descarte correto de resíduo e a adoção de práticas sustentáveis</p>
        <div class="search-container">
          <input type="text" class="search-input bg-white" v-model="search" placeholder="Digite seu CEP ou endereço" />
          <button class="search-btn bg-accent text-white" @click="buscarEcopontos"><i class="fas fa-search "></i> Buscar</button>
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

      <section class="features ">
        <div v-for="(item, index) in pilares" :key="index" class="feature-card bg-verde">
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
        <div v-for="(etapa, index) in etapas" :key="index" class="feature-card bg-verde">
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
  --primary-color: #2ecc71;
  --secondary-color: #27ae60;
  --accent-color: #f1c40f;
  --text-color: #2c3e50;
  --light-bg: #f5f6fa;
  --white: #ffffff;
  --dark-green: #1e8449;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-bg: #ffffff;
  --container-bg: #e8f5e9;
}

/* Header */
.header-container {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1rem 2rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.bg-verde {
  background-color: #2e7d32 !important;
}
.bg-white { /* #ffffff - Branco */
  background-color: #ffffff !important;
   
}
.text-white{
 color: #ffffff !important;
}
.bg-accent { /* #f1c40f - Amarelo */
  background-color: #f1c40f !important;
}
.bg-text { /* #2c3e50 - Azul Petróleo */
  background-color: #2c3e50 !important;
}
.logo {
  color: var(--white);
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo i {
  font-size: 2rem;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li a {
  color: var(--white);
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
}

nav ul li a:hover {
  background-color: var(--dark-green);
  transform: translateY(-2px);
}

.login-btn {
  background-color: var(--accent-color);
  color: var(--text-color) !important;
}

.login-btn:hover {
  background-color: #f39c12 !important;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--dark-green));
  color: var(--white);
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.search-container {
  max-width: 700px;
  margin: 2rem auto;
  display: flex;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.search-input {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  width: 70%;
  font-size: 1.1rem;
  box-shadow: var(--shadow);
  background-color: var(--white);
}

.search-btn {
  background-color: var(--accent-color);
  color: var(--text-color);
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: var(--shadow);
}

.search-btn:hover {
  background-color: #f39c12;
  transform: translateY(-2px);
}

/* Section Titles */
.section-title {
  text-align: center;
  color: var(--dark-green);
  font-size: 2.5rem;
  margin: 3rem 0 2rem;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: var(--white);
}

.feature-card[data-v-ed0881ab] {
  background-color: var(--secondary-color);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid rgba(46, 204, 113, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: var(--dark-green);
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.feature-card p {
  color: var(--text-color);
  line-height: 1.6;
}

/* Ecopontos Grid */
.ecopontos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: var(--white);
}

.ecoponto-card {
  background-color: var(--container-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 2rem;
  transition: transform 0.3s ease;
  border: 1px solid rgba(46, 204, 113, 0.1);
}

.ecoponto-card:hover {
  transform: translateY(-5px);
}

.ecoponto-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.ecoponto-header h3 {
  color: var(--text-color);
  font-size: 1.4rem;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.badge-success {
  background-color: var(--primary-color);
  color: var(--white);
  font-weight: 600;
}

.badge-warning {
  background-color: var(--accent-color);
  color: var(--text-color);
  font-weight: 600;
}

.tipos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.tipo-badge {
  background-color: var(--container-bg);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--text-color);
  border: 1px solid rgba(46, 204, 113, 0.2);
}

/* Footer */
footer {
  background: linear-gradient(135deg, var(--dark-green), var(--primary-color));
  color: var(--white);
  padding: 4rem 2rem 1rem;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column h3 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 0.8rem;
}

.footer-column a {
  color: var(--white);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: var(--accent-color);
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.social-icons a {
  color: var(--white);
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  color: var(--accent-color);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.2);
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: var(--shadow);
  border: 1px solid rgba(46, 204, 113, 0.1);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: var(--primary-color);
}

/* Search Results Section */
.search-results {
  background-color: var(--white);
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 12px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .search-container {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
    border-radius: 8px;
  }

  .search-btn {
    width: 100%;
    border-radius: 8px;
  }
}

/* Rewards Section */
.rewards-section {
  background-color: var(--white);
  padding: 2rem;
  margin: 2rem 0;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background-color: var(--white);
}

/* Como Reciclar Section */
.features:last-of-type {
  background-color: var(--white);
}

.features:last-of-type .feature-card {
  background-color: var(--container-bg);
}
</style>
