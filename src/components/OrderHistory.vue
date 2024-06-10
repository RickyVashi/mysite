<template>
    <div class="scrollable-container w-full scrollbar-hide">
      <div v-for="(orderGroup, orderId) in groupedOrders" :key="orderId" class="order-group">
        <div class="order-header">
          <h2 class="order-title">Order: <span class="order-id">#{{ orderId }}</span></h2>
        </div>
        <div v-for="item in orderGroup" :key="item._id.$oid" class="order-item">
          <img :src="item.images[0]" alt="Product image" class="product-image">
          <div class="item-details">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-category">Category: {{ item.category }}</p>
            <p class="item-quantity">Qty: {{ item.quantity }}</p>
            <p class="item-price">Price: ${{ item.discountedPrice }}</p>
          </div>
        </div>
        <div class="order-footer">
          <p>Bill amount is paid</p>
          <p class="total-price">Total Price: ${{ orderGroup.reduce((total, item) => total + parseFloat(item.discountedPrice) * item.quantity, 0) }}</p>
        </div>   
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        orders: [],
        email: ''
      };
    },
    computed: {
      groupedOrders() {
        return this.orders.reduce((acc, order) => {
          if (!acc[order.orderID]) {
            acc[order.orderID] = [];
          }
          acc[order.orderID].push(order);
          return acc;
        }, {});
      }
    },
    mounted() {
      this.email = window.localStorage.getItem('email');
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await this.$axios.post(`${this.$URL}/getOrders`, {
            email: this.email
          });
          this.orders = response.data || []; // Ensure orders is always an array
          console.log(this.orders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    }
  };
  </script>
<style scoped>


.order-group {
  width: 100%; /* Ensure the order group takes full width */
  border: 1px solid #e5e5e5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.order-header {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.order-title {
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.order-id {
  margin-left: 8px;
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  margin-left: 16px;
}

.item-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.item-category,
.item-quantity,
.item-price {
  font-size: 1rem;
  color: #6b7280;
}

.item-price {
  font-weight: 700;
  color: #1f2937;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
}

.total-price {
  font-size: 1.125rem;
  font-weight: 700;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* For IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
</style>
    