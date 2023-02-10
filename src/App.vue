<template>
  <div>
    <NavBar />
    <div class="container my-5">
      <div class="row">
        <ProductCard 
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <PaginationComponent />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';
import PaginationComponent from './components/PaginationComponent.vue';
import axios from 'axios';

export default {
  components: {
    NavBar,
    ProductCard,
    PaginationComponent,
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      productsPerPage: 10,
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.products.slice(start, end);
    },
  },
  mounted() {
    axios
      .get('https://dumyjson.com/docs/todos')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>