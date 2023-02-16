<template>
  <div class="card text-center">
    <router-link
      :to="{
        name: 'ProductPage',
        params: { productId: product.id },
      }"
    >
      <img
        :src="product.thumbnail"
        class="product-img"
        alt="Product Thumbnail"
      />
    </router-link>
    <div class="info-card">
      <p class="card-text">ref n°{{ product.id }}</p>
      <h2 class="card-title">{{ product.title }}</h2>
      <p class="card-text">{{ product.price }} €</p>
    </div>
    <ModalPrice
      :unitPrice="product.price"
      :id="product.id"
      :title="product.title"
      :url_thumbnail="product.thumbnail"
      class="modal-price"
    />
  </div>
</template>
<script>
import ModalPrice from "./ModalPrice.vue";

export default {
  name: "ProductCard",
  components: {
    ModalPrice,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.card {
  height: 500px;
  width: 70%;
  border: 1px transparent;
  box-shadow: 0px 0px 19px 0px rgba(0,0,0,0.75);
  border-radius: 20px;
}

.product-img {
  width: auto;
  height: 50%;
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.info-card {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.modal-price {
  position: relative;
  top: 20px;
  right: -300px;
  box-shadow: inset 0px 0px 8px 1px rgba(0,0,0,0.75);
}
</style>
