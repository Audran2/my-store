<template>
  <div class="modal-price">
    <p class="price">prix unitaire: {{ unitPrice }} €</p>
    <div class="quantity-control">
      <button class="button" @click="decrementQuantity">-</button>
      <p class="quantity">{{ quantity }}</p>
      <button class="button" @click="incrementQuantity">+</button>
    </div>
    <p class="subtotal">sous-total: {{ subtotal }} €</p>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: {
    unitPrice: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    url_thumbnail: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      quantity: 0,
    };
  },
  created() {
    const existingProduct = store.state.cart.find((p) => p.id === this.id);
    if (existingProduct) {
      this.quantity = existingProduct.quantity;
    }
  },
  computed: {
    subtotal() {
      return this.unitPrice * this.quantity;
    },
  },
  methods: {
    incrementQuantity() {
      this.quantity++;
      this.updateCart();
    },
    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
      this.updateCart();
    },
    updateCart() {
      const product = {
        id: this.id,
        title: this.title,
        url_thumbnail: this.url_thumbnail,
        quantity: this.quantity,
        price: this.unitPrice,
        subtotal: this.subtotal,
      };
      const existingProduct = store.state.cart.find((p) => p.id === this.id);
      if (existingProduct) {
        if (this.quantity === 0) {
          store.commit("removeProduct", this.id);
        } else {
          store.commit("updateProduct", product);
        }
      } else if (this.quantity > 0) {
        store.commit("addProduct", product);
      }
      this.$emit("updateQuantity", this.id, this.quantity);
    },
  },
  watch: {
    quantity(newValue) {
      const existingProduct = store.state.cart.find((p) => p.id === this.id);
      if (existingProduct) {
        existingProduct.quantity = newValue;
      }
    },
  },
};
</script>

<style scoped>
.modal-price {
  border: 1px solid;
  width: 45%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
}
.quantity {
  margin: 0 10px !important;
}
</style>
