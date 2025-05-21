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
          <button class="search-btn" @click="buscar"><i class="fas fa-search"></i> Buscar</button>
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

const search = ref('')
const showModal = ref(false)

const buscar = () => {
  alert(`Buscar por: ${search.value}`)
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
