<template>
  <div>
    <NavBar />
    <div class="container-princ">
      <div class="search">
        <input class="input" type="text" v-model="filter" placeholder="Filtre" />
        <input class="input" type="number" v-model="minPrice" placeholder="Prix min" />
        <input class="input" type="number" v-model="maxPrice" placeholder="Prix max" />
        <select v-model="selectedBrand" class="input">
          <option value="">Toutes les marques</option>
          <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>
      <div class="card-deck">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <PaginationComponent
      :total-products="priceProducts.length"
      :products-per-page="productsPerPage"
      @page-changed="changePage"
    />
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import PaginationComponent from "../components/PaginationComponent.vue";
import ProductCard from "../components/ProductCard.vue";
import axios from "axios";

export default {
  name: "ProductList",
  components: {
    NavBar,
    PaginationComponent,
    ProductCard,
  },
  data() {
    return {
      products: [],
      filter: "",
      minPrice: null,
      maxPrice: null,
      selectedBrand: "",
      productsPerPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (product &&
            product.title &&
            product.title.toLowerCase().includes(this.filter.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(this.filter.toLowerCase()))
        );
      });
    },
    filteredByBrand() {
      if (!this.selectedBrand) {
        return this.filteredProducts;
      }
      return this.filteredProducts.filter(
        (product) => product.brand === this.selectedBrand
      );
    },
    priceProducts() {
      return Array.isArray(this.filteredByBrand)
        ? this.filteredByBrand.filter((product) => {
            const price = parseFloat(product.price);
            return (
              (!this.minPrice || this.minPrice <= price) &&
              (!this.maxPrice || this.maxPrice >= price)
            );
          })
        : [];
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.priceProducts.slice(start, end);
    },
    uniqueBrands() {
      const brands = new Set();
      this.products.forEach((product) => {
        brands.add(product.brand);
      });
      return Array.from(brands).sort();
    },
  },
  mounted() {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        this.products = response.data.products;
      })
      .catch((error) => console.error(error));
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  justify-content: space-evenly;
  margin: 30px 0;
}
.input {
  width: 300px;
  border-color: black;
}
.card-deck {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 60px;
  justify-items: center;
}
</style>
