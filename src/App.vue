<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand"><strong>SISTEMA GESTIÓN INVENTARIO</strong></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page"><strong>Inicio</strong></router-link>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Empresa</strong>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" to="/">Ver Empresas</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/createE">Añadir Empresa</router-link>
            </li>

          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Proveedor</strong>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" to="/viewP">Ver Proveedores</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/createP">Añadir Proveedor</router-link>
            </li>

          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Producto</strong>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" to="/viewPr">Ver Productos</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/createPr">Añadir Producto</router-link>
            </li>

          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Pedido</strong>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" to="/viewPe">Ver Pedidos</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/createPe">Realizar Pedido</router-link>
            </li>

          </ul>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  <div class="container-fluid">
    <router-view/>
  </div>

</template>


<style>
.navbar {
  background-image: linear-gradient(to right, #7ea996,  #ddf3e9, #f1f5f3); /* Cambia los colores según tu diseño */
}
</style>
