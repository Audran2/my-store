<template>
  <nav class="navbar">
    <router-link :to="{ name: 'home' }" class="home"> Mon store </router-link>
    <router-link :to="{ name: 'cart' }" class="cart">
      <div>
        <img class="img" src="../assets/cart-icon.png" alt="cart-icon" />
      </div>
      <div class="badge">{{ cartProductsCount }}</div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    cartProductsCount() {
      return this.$store.state.cart.length;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100vw;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  height: 5rem;
}
.home {
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.cart {
  height: auto;
}
.img {
  height: 7vh;
  width: auto;
  padding-top: 25px;
  margin-right: 25px;
}

.badge {
  padding: 3px;
  background-color: red;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 15px;
  position: relative;
  top: -55px;
  right: -35px;
  width: 1rem;
}
</style>
