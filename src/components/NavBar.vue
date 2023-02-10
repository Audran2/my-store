<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Mon Store</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'cart' }" class="nav-link">
              Panier
              <span class="badge badge-pill badge-secondary">{{ cartProductsCount }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      cartProductsCount() {
        return this.$store.state.cart.length;
      },
    },
  };
  </script>
  