<template>
  <div>
    <NavBar />
    <h2 class="title">Mon panier d'achat</h2>
    <div v-if="cart.length > 0" class="row">
      <main class="product-list">
        <div class="card" v-for="product in cart" :key="product.id">
          <div class="col-md-4">
            <router-link
              :to="{
                name: 'ProductPage',
                params: { productId: product.id },
              }"
            >
              <img
                :src="product.url_thumbnail"
                class="product-img"
              />
            </router-link>
          </div>
          <div class="card-body">
            <h3 class="subtitle">{{ product.title }}</h3>
            <p class="card-id">ref n°{{ product.id }}</p>
          </div>
          <ModalPrice
            class="modal-price"
            :unitPrice="product.price"
            :id="product.id"
            :title="product.title"
            :url_thumbnail="product.thumbnail"
          />
        </div>
      </main>
      <aside class="aside">
        <div class="aside-body">
          <h3 class="subtitle">Total</h3>
          <p class="total-variable">{{ totalPrice }} €</p>
        </div>
      </aside>
    </div>
    <div v-else class="no-article">
      <h3 class="subtitle">Aucun article dans le panier</h3>
      <router-link
        class="button"
        :to="{
          name: 'home',
        }"
      >
        Consulter
      </router-link>
    </div>
  </div>
</template>
<script>
import ModalPrice from "../components/ModalPrice.vue";
import NavBar from "../components/NavBar.vue";
import { mapState } from "vuex";
export default {
  name: "CartPage",
  components: {
    ModalPrice,
    NavBar,
  },
  computed: {
    ...mapState(["cart"]),
    totalPrice() {
      return this.cart.reduce((acc, product) => acc + product.subtotal, 0);
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin: 20px 0;
}
.no-article {
  margin: 0 auto;
  width: 80%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-list {
  width: 70%;
}
.card {
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 30px 20px;
}
.card-body {
  margin-left: 20px;
}
.modal-price {
  width: 300px;
}
.aside {
  width: 20%;
  position: fixed;
  right: 120px;
  top: 200px;
  padding: 20px 0px;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
}
.aside-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
