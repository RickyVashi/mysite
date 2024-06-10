<template>
  <div class="overflow-auto scrollbar-hide">
  
      <div class="pl-10 pt-10 fixed left-20 top-6 ml-64 mt-8 z-5 bg-white w-full">
          <div class="relative bg-gray-800 px-8 py-2 text-green rounded-md w-72 mb-6 flex">
              <div class="flex text-white ml-4 font-bold text-lg">Balance :- <p class="ml-4">$ {{balance}}</p>
              </div>
          </div>
      </div>
  
      <div class="flex mx-12 my-20 scrollbar-hide overflow-y-hidden">
          <div class="absolute w-16 flex flex-col mt-6">
              <button @click="toggleCartMenu" class="relative  z-50 p-2  bg-gray-800 px-4 py-2 text-green rounded-full flex items-center justify-center">
                  <span class="material-icons text-white">shopping_cart</span>
                  <span v-if="cart.length > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {{ cart.length }}
                  </span>
              </button>
  
              <button @click="toggleOrderMenu" class="relative bg-gray-800 px-4 py-2 text-green rounded-full flex items-center justify-center mt-4">
                  <span class="material-icons text-white">history</span>
              </button>
          </div>
          
          <!-- Grid Section -->
          <section id="Projects" class="w-full mt-8 ml-36 overflow-auto scrollbar-hide" style="height: calc(100vh - 80px);">
              <div v-if="!flag" class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-14 mt-6">
                  <div v-for="product in products" :key="product.id" class="w-72 bg-gray-800 shadow-md rounded-xl duration-500 hover:shadow-xl relative">
                      <a href="#">
                          <img :src="product.thumbnail" :alt="product.title" class="h-64 w-64 object-cover rounded-t-xl transition-transform duration-500 hover:scale-125" />
                          <div class="px-4 py-3 w-72">
                              <span class="text-gray-200 mr-3 uppercase text-xs">{{ product.brand }}</span>
                              <p class="text-lg font-bold text-white truncate block capitalize">{{ product.title }}</p>
                              <div class="flex items-center">
                                  <p class="text-lg font-semibold text-gray-500 cursor-auto my-3">${{ product.price }}</p>
                                  <del>
                                      <p class="text-sm text-white cursor-auto ml-2">${{ product.discountedPrice }}</p>
                                  </del>
                                  <div class="ml-auto" @click="addToCart(product)">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-bag-plus cursor-pointer" viewBox="0 0 16 16">
                                          <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                      </svg>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
  
              <!-- Order history -->
              <div class="overflow-hidden w-full" v-else>
                <OrderHistory/>
              </div>
          </section>
      </div>
  
      <!-- Cart Menu -->
      <div v-if="isCartMenuVisible" class="z-100 fixed top-14 right-0 h-full w-96 bg-gray-100 shadow-lg p-6 transition-transform transform" :class="{'translate-x-0': isCartMenuVisible, 'translate-x-full': !isCartMenuVisible}">
          <h2 class="text-2xl font-bold mb-6">My Cart</h2>
          <div class="flex items-center justify-between bg-orange-200 p-3 rounded mb-6">
              <p class="text-orange-800">You have {{ cart.length }} items in your cart</p>
          </div>
          <ul>
              <li v-for="product in cart" :key="product.id" class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                      <img :src="product.thumbnail" alt="product.title" class="w-12 h-12 rounded mr-4" />
                      <div>
                          <p class="font-semibold">{{ product.title }}</p>
                          <p>${{ product.price }}</p>
                      </div>
                  </div>
                  <div class="flex items-center">
                      <button @click="decreaseQuantity(product)" class="text-xl px-2">-</button>
                      <span>{{ product.quantity }}</span>
                      <button @click="increaseQuantity(product)" class="text-xl px-2">+</button>
                  </div>
              </li>
          </ul>
          <div class="fixed right-8 left-8 bottom-16 mb-8 border-t pt-4">
              <div class="flex justify-between mb-2">
                  <p>Items</p>
                  <p>${{ totalItemsPrice }}</p>
              </div>
              <div class="flex justify-between mb-2">
                  <p>Discounts</p>
                  <p>${{ totalDiscount }}</p>
              </div>
              <div class="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${{ totalPrice }}</p>
              </div>
  
              <button class="mt-4 w-full bg-black text-white py-3 rounded" @click="placeOrder">
                  Checkout
              </button>
              <button class="mt-4 w-full bg-gray-500 text-white py-3 rounded" @click="toggleCartMenu">
                  Close
              </button>
          </div>
      </div>
  </div>
  </template>

<script>
import OrderHistory from '../OrderHistory.vue';
export default {
    components:{
      OrderHistory
    },
    data() {
        return {
            flag: false,
            products: [],
            cart: [],
            isCartMenuVisible: false,
            balance: 0
        };
    },

    computed: {
        totalItemsPrice() {
            return this.cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
        },
        totalDiscount() {
            return this.cart.reduce((acc, product) => acc + (product.price - product.discountedPrice) * product.quantity, 0).toFixed(2);
        },
        totalPrice() {
            return (this.totalItemsPrice - this.totalDiscount).toFixed(2);
        },
    },
    mounted() {
        this.balance = window.localStorage.getItem('balance')
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await this.$axios.get('https://dummyjson.com/products');
                this.products = response.data.products.map(product => ({
                    ...product,
                    discountedPrice: (product.price * (1 - product.discountPercentage / 100)).toFixed(2),

                    quantity: 1,
                }));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        addToCart(product) {
            const cartProduct = this.cart.find(item => item.id === product.id);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                this.cart.push({
                    ...product
                });
            }
        },
        increaseQuantity(product) {
            product.quantity += 1;
        },
        decreaseQuantity(product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                this.cart = this.cart.filter(item => item.id !== product.id);
            }
        },
        toggleCartMenu() {
            this.isCartMenuVisible = !this.isCartMenuVisible;
        },
        toggleOrderMenu() {
            this.flag = !this.flag
        },
        placeOrder() {

            const orderDetails = {
                'email': window.localStorage.getItem('email'),
                'name': window.localStorage.getItem('user'),
                'orders': this.cart,
                'amount': this.totalPrice
            }
            const response = this.$axios.post(`${this.$URL}/placeOrder`, orderDetails)

            this.balance = this.balance - this.totalPrice;
            window.localStorage.setItem('balance', this.balance)
            console.log(response);

            this.$vs.notify({
            color: 'success',
            position: 'bottom-right',
            title: `Successfully`,
            text: 'Order Placed Successfully...'
          });

            this.cart = [];
            this.isCartMenuVisible = false;
        },
    },
};
</script>
<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>