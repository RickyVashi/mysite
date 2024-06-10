<template>
  <div class="flex flex-col justify-center items-center w-full my-10">

    
    <!-- Balance Card -->
    <div class="w-full max-w-md mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl transition transform hover:scale-105 cursor-pointer">
      <div class="p-6 flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0zM9 3a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0V3zm3 11a1 1 0 1 0-2 0v1a1 1 0 0 0 2 0v-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-4">
            <div class="text-xl font-semibold text-gray-800">Balance</div>
            <div class="text-gray-600">{{ balance }}</div>
          </div>
        </div>
        <div role="button" @click="openModal" class="ml-4 text-green-600 text-2xl px-4 py-2 rounded-md focus:outline-none">+ Add Money</div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="mt-8 p-8">
     
      <table class="min-w-full bg-gray-100">
        <thead class="bg-gray-100">
          <tr class="text-4xl">
            <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in transactions" :key="transaction.id" :class="{ 'bg-green-100': transaction.transactionType === 'CREDIT', 'bg-red-100': transaction.transactionType === 'DEBIT' }">
            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.transactionId }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.transactionType }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.amount }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ transaction.timestamp.split('T')[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Money Modal -->
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="flex justify-between items-center border-b pb-3 mb-4">
            <button @click="closeModal" class="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Add Money</h3>
            <div></div>
          </div>
          <div class="mt-2 text-center">
            <p class="text-xl font-semibold">Enter Amount</p>
            <input type="number" v-model="amountToAdd" class="w-full p-2 border rounded-md text-center mt-2 mb-4" placeholder="1000">
            <div class="flex justify-center space-x-4 mb-4">
              <button @click="setAmount(1000)" class="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 focus:outline-none">+ ₹1,000</button>
              <button @click="setAmount(5000)" class="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 focus:outline-none">+ ₹5,000</button>
              <button @click="setAmount(10000)" class="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 focus:outline-none">+ ₹10,000</button>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-100 rounded-md mb-4">
              <span class="text-gray-600">Available Balance</span>
              <span class="text-gray-900 font-semibold">₹{{ balance }}</span>
            </div>
            <div class="card-container text-left mb-4">
              <label for="cardNumber" class="block text-gray-700 font-semibold mb-2 mt-8">Card Number</label>
              <input type="text" id="cardNumber" v-model="cardNumber" class="w-full p-2 border rounded-md mb-2 card-input" placeholder="#### #### #### ####" v-mask="'#### #### #### ####'">
              <div class="flex space-x-4">
                <div class="w-1/2">
                  <label for="expiryDate" class="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input type="text" id="expiryDate" v-model="expiryDate" class="w-full p-2 border rounded-md mb-2 card-input" placeholder="MM/YY" v-mask="'##/##'">
                </div>
                <div class="w-1/2">
                  <label for="cvv" class="block text-gray-700 font-semibold mb-2">CVV</label>
                  <input type="text" id="cvv" v-model="cvv" class="w-full p-2 border rounded-md mb-4 card-input" placeholder="123" v-mask="'###'">
                </div>
              </div>
            </div>
            <button @click="addMoney" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none">Add Money</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: 0,
      email: null,
      transactions: [],
      showModal: false,
      amountToAdd: 0,
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
  },

  


  mounted() {
    this.email = window.localStorage.getItem('email');
    this.user = window.localStorage.getItem('user');
    this.balance = 0;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.post(`${this.$URL}/getBalance`, {
          email: this.email
        });
        this.balance = response.data.currentBalance;
        window.localStorage.setItem('balance',this.balance);

        const data = await this.$axios.post(`${this.$URL}/getTransaction`, {
          email: this.email
        });

        this.transactions = data.data;
        console.log('Hello', data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setAmount(amount) {
      this.amountToAdd = amount;
    },
    async addMoney() {
      try {
        const response = await this.$axios.post(`${this.$URL}/process-payment`, {
          cardNumber: this.cardNumber,
          expirationDate: this.expiryDate,
          cvv: this.cvv,
          amount: this.amountToAdd,
          user: this.user,
          type : 'CREDIT'
        });
        console.log(response);

        this.$vs.notify({
            color: 'success',
            position: 'top-right',
            title: `Money Added Successfully...`,
          });
        this.closeModal();
        this.fetchData();
      } catch (error) {
        console.error('Error adding money:', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-green-100 {
  background-color: #D1FAE5;
}

.bg-red-100 {
  background-color: #FEE2E2;
}

.cursor-pointer:hover {
  background-color: #E5E7EB;
}

.transition {
  transition: transform 0.2s;
}

.fixed {
  position: fixed;
}

.z-10 {
  z-index: 10;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.opacity-75 {
  opacity: 0.75;
}

.card-container {
  background-color: #2a2a2a;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.card-container:before {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 30px;
  background: linear-gradient(135deg, #f9d423 0%, #ff4e50 100%);
  border-radius: 5px;
}

.card-input {
  background-color: transparent;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 10px 0;
}

.card-input::placeholder {
  color: #ccc;
}

.card-input:focus {
  outline: none;
  border-bottom: 1px solid #4caf50;
}

.card-number, .expiry-date, .cvv {
  font-size: 1rem;
}
</style>
