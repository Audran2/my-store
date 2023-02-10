import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addProductToCart(state, product) {
            state.cart.push(product)
        },
        updateProductQuantity(state, {product, quantity}) {
            const cartProduct = state.cart.find(item => item.ref === product.ref)
            cartProduct.quantity = quantity
        },
        removeProductFromCart(state, product) {
            const index = state.cart.findIndex(item => item.ref === product.ref)
            state.cart.splice(index, 1)
        }
    },
    actions: {
        addProduct({commit}, product) {
            commit('addProductToCart', product)
        },
        updateProduct({commit}, {product, quantity}) {
            commit('updateProductQuantity', {product, quantity})
        },
        removeProduct({commit}, product) {
            commit('removeProductFromCart', product)
        }
    },
    getters: {
        cartProducts(state) {
            return state.cart
        },
        cartTotal(state) {
            return state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
        }
    }
})