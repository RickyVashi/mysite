<template>
    <div>
      <div class="text-center">
        <button class="btn btn-primary mr-4" @click="setLoginFormType('email')">Login with Email</button>
        <button class="btn btn-primary" @click="setLoginFormType('phone')">Login with Mobile Number</button>
      </div>
  
      <form @submit.prevent="submitForm" class="my-8 mx-auto form">
        <div class="form-group" v-if="loginFormType === 'email'">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" required @blur="getUser">
          <p v-if="flag" class="text-red-600 font-light">Email is already used</p>
          <p v-if="errors.email" class="text-red-600 font-light">{{ errors.email }}</p>
        </div>
        <div class="form-group" v-else>
          <label for="phone" class="form-label">Mobile Number:</label>
          <input type="tel" id="phone" v-model="phoneNumber" class="form-control" required>
        </div>
  
        <!-- Gender Form Fields -->
        <div class="form-group">
          <label class="form-label">Gender:</label>
          <div class="form-radio">
            <input type="radio" id="male" value="male" v-model="gender" class="form-input">
            <label for="male" class="form-radio-label">Male</label>
          </div>
          <div class="form-radio">
            <input type="radio" id="female" value="female" v-model="gender" class="form-input">
            <label for="female" class="form-radio-label">Female</label>
          </div>
        </div>
  
        <!-- Hobbies Form Fields -->
        <div class="form-group">
          <label class="form-label">Hobbies:</label>
          <div v-for="(hobby, index) in hobbies" :key="index" class="form-checkbox">
            <input type="checkbox" :id="hobby" :value="hobby" v-model="selectedHobbies" class="form-checkbox-input">
            <label :for="hobby" class="form-checkbox-label">{{ hobby }}</label>
          </div>
        </div>
      </form>
  
      
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import * as Yup from 'yup';
  
  export default {
    props: {
      errors: Object
    },
    data() {
      return {
        formData: { },
        flag : false
      }
    },
    methods: {
      async setAndStoreValidationSchema() {
        const schema = Yup.object().shape({
          email: Yup.string().required('Email is required').email('Invalid email'),
          gender: Yup.string().required('Gender is required'),
          hobbies: Yup.array().min(1, 'Select at least one hobby').required('Hobbies are required'),
        });
  
        // Dispatch action to set and store the validation schema in Vuex store
        this.setValidationSchema(schema);
      },
  
      async getUser() {
        try {
          const response = await this.$axios.post(`${this.$URL}/user`, { email: this.formData.email });
          if (response.data.message === "True") {
            this.flag  = false;
            this.$store.dispatch('updateFormData', this.formData);
          } else {
            alert("seym")
            this.flag  = true;
            console.log('Email is used');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      ...mapActions(['setValidationSchema'])
    },
    mounted() {
      this.setAndStoreValidationSchema();
    }
  }
  </script>
  
  
  
  
    
    <style scoped>
    .form {
      max-width: 400px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      font-weight: bold;
    }
    
    .form-radio-label {
      margin-right: 10px;
    }
    
    .form-checkbox {
      display: flex;
      align-items: center;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
    }
    
    .btn-primary {
      background-color: #007bff;
    }
    
    .btn-primary:hover {
      background-color: #0056b3;
    }
    
    .form-input,
    .form-checkbox-input {
      margin-right: 5px;
    }
    </style>
    