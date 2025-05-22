<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Como Reciclar</h1>
    <div class="row g-4">

      <!-- Papel -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-success">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-file-earmark-text"></i> Papel
          </div>
          <div class="card-body">
            <ul>
              <li>Remova clipes, grampos e fitas adesivas</li>
              <li>Não recicle papel sujo ou engordurado</li>
              <li> dobre caixas para economizar espaço</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Plástico -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white fw-bold">
            <i class="bi bi-bag"></i> Plástico
          </div>
          <div class="card-body">
            <ul>
              <li>Lave as embalagens para remover resíduos</li>
              <li>Retire tampas e rótulos quando possível</li>
              <li>Amasse garrafas para reduzir volume</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Metal -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-warning">
          <div class="card-header bg-warning text-dark fw-bold">
            <i class="bi bi-can"></i> Metal
          </div>
          <div class="card-body">
            <ul>
              <li>Lave latas antes de descartar</li>
              <li>Amasse latas de alumínio para economizar espaço</li>
              <li>Separe metais ferrosos e não ferrosos</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Vidro -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-success">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-cup-straw"></i> Vidro
          </div>
          <div class="card-body">
            <ul>
              <li>Lave frascos e remova rótulos</li>
              <li>Não recicle vidros temperados ou espelhos</li>
              <li>Separe por cores quando possível</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Eletrônicos -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-danger">
          <div class="card-header bg-danger text-white fw-bold">
            <i class="bi bi-cpu"></i> Eletrônicos
          </div>
          <div class="card-body">
            <ul>
              <li>Descarte em locais especializados</li>
              <li>Remova baterias e descarte separadamente</li>
              <li>Considere doar equipamentos funcionais</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Orgânicos -->
      <div class="col-md-6 col-lg-4">
        <div class="card border-secondary">
          <div class="card-header bg-secondary text-white fw-bold">
            <i class="bi bi-flower1"></i> Orgânicos
          </div>
          <div class="card-body">
            <ul>
              <li>Composte restos de alimentos</li>
              <li>Não misture com materiais recicláveis</li>
              <li>Use sacos compostáveis para coleta</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ComoReciclar"
};
</script>

<style scoped>
h1 {
  color: #2f4f2f;
}
ul {
  padding-left: 1.2rem;
}
</style>
