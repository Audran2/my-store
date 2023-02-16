import Vue from "vue";
import Vuex from "vuex";
import persistancePlugin from "./plugins/persistancePlugin.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addProduct(state, product) {
      state.cart.push(product);
    },
    updateProduct(state, payload) {
      const { id, quantity } = payload;
      const productIndex = state.cart.findIndex((item) => item.id === id);
      if (!state.cart[productIndex]) return;

      state.cart[productIndex].quantity = quantity;
      state.cart[productIndex].subtotal =
        quantity * state.cart[productIndex].price;
    },
    removeProduct(state, productId) {
      const productIndex = state.cart.findIndex(
        (product) => product.id === productId
      );
      state.cart.splice(productIndex, 1);
    },
    setCart(state, cart) {
      state.cart = cart;
    },
  },

  actions: {
    addProduct({ commit, state }, product) {
      if (product.quantity <= 0) return;
      const existingProduct = state.cart.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + product.quantity,
        };
        updatedProduct.subtotal =
          updatedProduct.quantity * existingProduct.price;
        commit("updateProduct", updatedProduct);
      } else {
        product.subtotal = product.quantity * product.price;
        commit("addProduct", product);
      }
    },
    updateProduct({ commit }, payload) {
      commit("updateProduct", payload);
    },
    removeProduct({ commit }, productId) {
      commit("removeProduct", productId);
    },
  },
  getters: {
    cartProductsCount(state) {
      return state.cart.length;
    },
  },
  plugins: [persistancePlugin],
});
