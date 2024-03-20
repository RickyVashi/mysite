<template>
    <div>
      <h1 class="font-semibold text-lg  bg-gray-100 p-4 my-8 mx-12">V-Mask Credit Card</h1>
      <div class="credit-card" v-if="!show">
        <label for="credit-card-number">Credit Card Number:</label>
        <input type="text" id="credit-card-number2" v-model="cardNumber" v-mask="'#### #### #### ####'" placeholder="0000 0000 0000 0000">
  
        <label for="expiration-date">Expiration Date:</label>
        <div class="expiration-date">
          <select v-model="selectedMonth">
            <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
          </select>
          <select v-model="selectedYear">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
  
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" v-mask="'###'">
  
        <label for="cardholder-name">Cardholder's Name:</label>
        <input type="text" id="cardholder-name" v-model="cardholderName">
        <button class="bg-blue-400 py-2 px-4 rounded-md" @click="showCard()">Show Card</button>
      </div>
  
      <div class="container" v-if="show">
        <div class="circles">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
  
        <div class="card" :class="{ 'flipped': isFlipped }" @click="flipCard(!isFlipped)">
          <div class="front" v-if="!isFlipped">
            <div class="visa_logo">
              <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="">
            </div>
            <div class="visa_info">
              <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="">
              <p>{{ cardNumber }}</p>
            </div>
            <div class="visa_crinfo">
              <p>{{ selectedMonth }}/{{ selectedYear }}</p>
              <p>{{ cardholderName }}</p>
            </div>
          </div>
          <div class="back" v-else>
            <div class="cvv-info">
              <label for="cvv">CVV:</label>
              <p>{{ cvv }}</p>
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
        cardNumber: '',
        selectedMonth: '',
        selectedYear: '',
        cvv: '',
        cardholderName: '',
        months: Array.from({ length: 12 }, (_, index) => {
          const monthValue = String(index + 1).padStart(2, '0');
          return { value: monthValue, label: monthValue };
        }),
        years: [],
        show: false,
        isFlipped: false
      };
    },
    mounted() {
      this.generateYearOptions();
    },
    methods: {
      generateYearOptions() {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < 5; i++) {
          this.years.push(currentYear + i);
        }
      },
      showCard() {
        this.show = true;
      },
      flipCard(status) {
        this.isFlipped = status;
      }
    }
  };
  </script>
  
  <style scoped>
  .credit-card {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-color: black;
  }
  
  .credit-card label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: white;
  }
  
  .credit-card input,
  .credit-card select {
    width: 95%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .credit-card input:focus,
  .credit-card select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
  
  .expiration-date {
    display: flex;
  }
  
  .expiration-date select {
    flex: 1;
    margin-right: 10px;
  }
  
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    width: 380px;
    height: 230px;
    border: 2px solid rgba(255, 255, 255, 0.884);
    background-image: url("https://wallpapers.com/images/hd/business-card-background-588tmswvrvxi1n75.jpg");
    border-radius: 10px;
    z-index: 1;
    overflow: hidden;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .front, .back {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    position: absolute;
  }
  
  
  .back {
    color : white;
  }
  
  
  .cvv-info {
    transform: rotateY(180deg);
    text-align: center;
  }
  
  .flipped{
    transform: rotateY(180deg)
  }
  .visa_logo {
    float: right;
    padding: 10px;
  }
  
  .visa_logo img {
    width: 70px;
    height: 40px;
  }
  
  .visa_info {
    padding: 10px;
    margin: 30px 0;
  }
  
  .visa_info img {
    width: 60px;
    height: 45px;
  }
  
  .visa_info p {
    font-size: 22px;
    padding: 10px 0;
    letter-spacing: 2px;
    color: #ffffff;
  }
  
  .visa_crinfo {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ffffff;
  }
  </style>
  