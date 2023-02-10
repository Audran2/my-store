<template>
    <div class="card">
        <img :src="product.url_thumbnail">
        <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">Ref : {{ product.ref }}</p>
            <p class="card-text">Price : {{ product.price }}</p>
            <button @click="openModal(product)" class="btn btn-primary">Add to cart</button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['product'],
    methods: {
        openModal(product) {
            this.$emit('open-modal', product)
        }
    }
}
</script>