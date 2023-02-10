
import { CallTracker } from 'assert';

<template>
    <div class="cart-page">
        <NavBar />
        <div class="container mt-5">
            <div v-if="cart.lenght > 0">
                <h3 class="text-center mb-3">{{ $t('cart.title') }}</h3>
                <div class="cart-items">
                    <div class="cart-item" v-for="(product, index) in cart" :key="index">
                        <div class="cart-item-thumbnail">
                            <img :src="product.url_thumbnail">
                        </div>
                        <div class="cart-item-info">
                            <h5 class="cart-item-title">{{ product.title }}</h5>
                            <p class="cart-item-price">{{ product.price }}</p>
                        </div>
                        <div class="cart-item-qty">
                            <input type="number" v-model.number="product.quantity" @change="updateTotal(index)">
                        </div>
                        <div class="cart-item-total">
                            {{ product.price * product.quantity }}
                        </div>
                    </div>
                </div>
                <div class="cart-total">
                    {{ $t('cart.total') }}: {{ total }}
                </div>
            </div>
            <div v-else>
                {{ $t('cart.empty') }}
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: 'CartPage',
    components: {
        NavBar
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        total() {
            return this.cart.reduce((acc, product) => acc + (product.price * product.quatity), 0)
        }
    },
    methods: {
        updateTotal(index) {
            this.$store.commit('updateProductInCart', { index, product: this.cart[index]})
        }
    }
}

</script>