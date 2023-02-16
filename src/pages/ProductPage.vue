<template>
  <div class="product-page">
    <NavBar />
    <router-link
      class="right"
      :to="{
        name: 'home',
      }"
    >
      ← Retour
    </router-link>
    <h2 class="title">{{ product.title }}</h2>
    <div class="images">
      <img
        v-for="(image, index) in product.images"
        :key="index"
        :src="image"
        alt="product"
      />
    </div>
    <div class="product-desc">
      <div class="description">
        <p>Ref n°{{ product.id }}</p>
        <p>Nom: {{ product.title }}</p>
        <p>Marque : {{ product.brand }}</p>
        <p>Description: {{ product.description }}</p>
      </div>
      <ModalPrice
        class="modal-price"
        :unitPrice="product.price"
        :id="product.id"
        :title="product.title"
        :url_thumbnail="product.thumbnail"
        :quantity="product.quantity"
        @update:quantity="updateQuantity"
      />
    </div>
  </div>
</template>
<script>
import ModalPrice from "../components/ModalPrice.vue";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
export default {
  name: "ProductPage",
  components: {
    NavBar,
    ModalPrice,
  },
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const productId = this.$route.params.productId;
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        this.product = response.data;
      });
  },
  methods: {
    updateQuantity(quantity) {
      this.product.quantity = quantity;
      this.$emit("update:quantity", { id: this.product.id, quantity });
    },
  },
};
</script>

<style scoped>
.product-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-page a {
  margin-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.right {
  position: relative;
  padding-top: 10px;
  left: -800px;
}
.product-desc {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal-price {
  width: 500px;
}

h2 {
  margin: 20px 0;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.product-page img {
  width: 50%;
  height: auto;
  margin: 20px 0;
  display: inline-block;
}

p {
  margin: 10px 0;
  text-align: center;
  font-size: 1.5rem;
}

</style>
