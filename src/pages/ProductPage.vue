<template>
    <div>
        <NavBar />
        <div class="product-page">
            <b-carousel>
                <b-carousel-slide v-for="photo in product.photos" :key="photo.url">
                    <img :src="photo.url" alt="Product Photo">
                </b-carousel-slide>
            </b-carousel>
            <div class="product-details">
                <h2>{{ product.name }}</h2>
                <p>{{ product.description }}</p>
                <p>{{ product.brand }}</p>
                <modal-add-to-cart :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import ModalAddToCart from '../components/ModalAddToCart.vue'
import axios from 'axios';

export default {
    components: {
        NavBar,
        ModalAddToCart,
    },
    data () {
        return {
            product: {}
        }
    },
    created () {
        this.fetchProduct()
    },
    methods: {
        async fetchProduct () {
            const {data} = await axios.get('https://dumyjson.com/api/product/${this.$route.params.id}')
            this.product = data
        }
    }
}
</script>

<style scoped>
    .product-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .product-details {
        margin-top: 1rem;
        text-align: center;
    }
</style>