<template>
    <h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Draggable List</h1>
    <div class="container mx-auto w-3/5">
        <div class="form-container bg-gray-100 shadow-lg rounded px-8 pt-10 pb-8 mb-4 h-auto">
         
    
            <Form @submit="submitForm" :validation-schema="schema" class="mb-4">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <Field name="email" type="text" v-model="formData.email" class="input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" error-class="error-message" />
                    <ErrorMessage name="email" class="text-red-500 text-xs italic" />
                </div>
    
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <Field name="password" type="password" v-model="formData.password" class="input-field appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" error-class="error-message" />
                    <ErrorMessage name="password" class="text-red-500 text-xs italic" />
                </div>
    
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
                    <div>
                        <label class="inline-flex items-center">
                            <Field name="gender" type="radio" value="male+" class="radio-input" />
                            <span class="ml-2">Male</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                            <Field name="gender" type="radio" value="female" class="radio-input" />
                            <span class="ml-2">Female</span>
                        </label>
                    </div>
                    <ErrorMessage name="gender" class="text-red-500 text-xs italic" />
                </div>
    
                <div class="checkbox-group mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Hobbies:</label>
                    <div v-for="(hobby, index) in hobbies" :key="index" class="inline-block mr-4">
                        <label :for="'hobby_' + hobby.value" class="inline-flex items-center">
                            <Field name="hobbies" type="checkbox" :value="hobby.value" class="checkbox-input" :id="'hobby_' + hobby.value" />
                            <span class="ml-2">{{ hobby.label }}</span>
                        </label>
                    </div>
                    <ErrorMessage name="hobbies" class="text-red-500 text-xs italic" />
                </div>
    
                <button type="submit" class="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    
                <div v-if="logIn" class="mt-4">
                    <div class="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Form Submitted Successfully!</strong>
                        <p class="block">Email: {{ formData.email }}</p>
                        <p class="block">Password: *********</p>
                        <p v-if="formData.gender" class="block">Gender: {{ formData.gender }}</p>
                        <p v-if="formData.hobbies.length" class="block">Hobbies: {{ formData.hobbies.join(', ') }}</p>
                    </div>
                </div>
            </Form>
        </div>
    </div>
  </template>
  
  <script>
  import * as yup from 'yup';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  
  const schema = yup.object().shape({
      email: yup.string().required('Email is required').email('Invalid email format'),
      password: yup.string().required('Password is required and it should at least 8 characters').min(8, 'Password must be at least 8 characters long'),
      gender: yup.string().required('Gender is required'),
      hobbies: yup.array().min(1, 'At least one hobby must be selected').required("Select at Least One"),
  });
  
  export default {
      components: {
          Form,
          Field,
          ErrorMessage,
      },
      data() {
          return {
              formData: {
                  email: '',
                  password: '',
                  gender: '',
                  hobbies: [],
              },
              schema: schema,
              logIn: false,
              hobbies: [
                  { value: 'reading', label: 'Reading' },
                  { value: 'gaming', label: 'Gaming' },
                  { value: 'cooking', label: 'Cooking' }
              ]
          };
      },
      methods: {
          submitForm() {
              this.logIn = true;
          },
      },
  };
  </script>
  
  <style scoped>
  .input-field:focus,
  .radio-input:focus,
  .checkbox-input:focus {
      outline: none;
      box-shadow: none;
  }
  </style>
  