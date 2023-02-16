import Vue from "vue";
import Router from "vue-router";
import ProductList from "../pages/ProductList.vue";
import ProductPage from "../pages/ProductPage.vue";
import CartPage from "../pages/CartPage.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductList,
    },
    {
      path: "/product/:productId",
      name: "ProductPage",
      component: ProductPage,
      props: true,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
      props: true,
    },
  ],
});

export default router;
