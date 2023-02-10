<template>
    <div class="modal fade" id="modalAddToCart" tabindex="-1" role="dialog" aria-labelledby="modalAddToCartLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAddToCartLabel">{{ product.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.thumbnail" alt="Product image">
            <p>{{ product.description }}</p>
            <p>Brand: {{ product.brand }}</p>
            <p>Price: {{ product.price }}</p>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input type="number" class="form-control" id="quantity" v-model="quantity">
            </div>
            <p>Total: {{ total }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addToCart">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    props: ['product'],
    computed: {
      ...mapGetters(['addProductToCart']),
      total () {
        return this.product.price * this.quantity
      }
    },
    data () {
      return {
        quantity: 1
      }
    },
    methods: {
      addToCart () {
        this.addProductToCart({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          thumbnail: this.product.thumbnail,
          quantity: this.quantity
        })
      }
    }
  }
  </script>
  