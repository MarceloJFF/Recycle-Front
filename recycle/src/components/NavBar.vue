<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container">
      <router-link  to="/ecoponto" class="nav-link navbar-brand">Ecoponto</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Alternar navegação"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/ecoponto/solicitacoes" class="nav-link">Solicitações</router-link>
          </li>
           <li class="nav-item">
            <router-link to="/ecoponto/evento" class="nav-link">Eventos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ecoponto/conf" class="nav-link">Configurar Ecoponto</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/beneficio" class="nav-link active">Cadastrar Benefício</router-link>
          </li>
          <li class="nav-item">
            <a href="/logout" class="nav-link">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Aqui você pode importar algum composable, estado, etc.
// Exemplo para controlar o estado da navbar não é necessário porque o Bootstrap já faz isso via JS importado.
</script>

<style scoped>
/* Se quiser customizar algo da navbar, pode colocar aqui */
</style>
