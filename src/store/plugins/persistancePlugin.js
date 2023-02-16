const persistancePlugin = store => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
  
    if (storedCart) {
      store.commit("setCart", storedCart);
    }
  
    store.subscribe((mutation, state) => {
      if (mutation.type === "addProduct" || mutation.type === "removeProduct" || mutation.type === "updateProduct") {
        const cart = state.cart;
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  };
  
  export default persistancePlugin;
  