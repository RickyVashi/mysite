<template>
  <h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Currency Calculator</h1>
    <div class="card mx-auto mt-10 text-black rounded-md">
      
      <h1 class="text-black  text-xl">Currency Calculator</h1>
  
      <!-- Input Value -->
      <div class="input-container my-8">
        <label class="text-black">Amount in Indian Rupees:</label>
        <input type="number" v-model="rupees" />
      </div>
  
      <div class="input-container">
        <label class="text-black">Select Currency:</label>
        <select v-model="selectedCurrency">
          <option v-for="currency in currencies" :key="currency.code" :value="currency">
            {{ currency.name }}
          </option>
        </select>
      </div>
  
      <div class="button-container mt-8 bg-blue-500 rounded-md">
        <button @click="show = true">Convert</button>
      </div>
  
      <!-- Print Converted Amount -->
      <div v-if="show" class="result">
        <p><b>Converted Amount:</b> {{ convert }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rupees: null,
        selectedCurrency: null,
        currencies: [
          { code: 'USD', name: 'US Dollar', rate: 0.014 },
          { code: 'EUR', name: 'Euro', rate: 0.012 },
          { code: 'GBP', name: 'British Pound', rate: 0.011 },
        ],
        show: false
      };
    },
    computed: {
      convert() {
          let convertedAmount = (this.rupees * this.selectedCurrency.rate).toFixed(2);
          return `${convertedAmount} ${this.selectedCurrency.name}`;
        
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #b0b0b0;
  }
  
 
  
  .input-container {
    margin-bottom: 10px;
  }
  

  
  input,
  select,
  button {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .button-container {
    text-align: center;
  }
  
  .result {
    margin-top: 20px;
    padding: 10px;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    color: #155724;
  }
  </style>
  