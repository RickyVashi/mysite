<template>
    <div class="flex flex-col justify-center items-center p-8">
      <div class="border-2">
        <table class="table-auto" v-if="show">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userData" :key="index">
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">{{ user.password }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="show = !show" class="px-4 py-2 mt-8 bg-yellow-600 font-medium rounded-md text-white hover:bg-yellow-800">Get UserData</button>


     
      <div class="mt-12 flex flex-col items-center justify-center ">
        <h2 class="text-2xl m-4 font-bold">ToolTip Task</h2>
        <BaseToolTip content="This is my prop" placement="right">
          <button class="px-4 py-2 bg-blue-600 font-medium rounded-md text-white hover:bg-blue-800">Click Me!</button>
        </BaseToolTip>
      </div>
    </div>
  </template>
  
  <script>
import { ofetch } from 'ofetch';
import BaseToolTip from './BaseToolTip.vue';

export default {
  components: {
    BaseToolTip,
  },
  data() {
    return {
      token: '',
      error: null,
      userData: [],
      show : false,
    };
  },
  async mounted() {
    this.token = window.localStorage.getItem('token');
    try {
        const response = await ofetch('http://localhost:1600/users', {
          headers: {
            'authorization': `Bearer ${this.token}`,
          },
        });
        console.log(response);
        this.userData = response; // Assuming 'data' attribute contains array of users
        console.log(this.userData);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = error.message;
      }
  },
  
};
</script>

  
  <style>
  .table-auto {
    width: auto;
  }
  .border {
    border: 1px solid #e2e8f0;
  }
  </style>
  