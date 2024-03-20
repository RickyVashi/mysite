<template>
    <h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Infinite Scroll with Observer</h1>
    <div class="hello mx-auto max-w-3xl ">
       
  
      <div id="scrollDiv" ref="scrollDiv" class="scroll-container">
        <div class="wrapper" v-for="(item) in filterLists" :key="item.id">
          <div class="card border border-gray-200 rounded-md p-4 mb-4">
            <a href="#" class="card-link flex items-center">
              <img src="https://wallpapercave.com/wp/wp2722928.jpg" class="card-image w-16 h-16 rounded-full mr-4">
              <div class="region_text">
                <h5 class="text-lg font-semibold">{{ item.id }}</h5>
                <div class="region_buttons">{{ item.name }}</div>
                <div class="card-body text-gray-700">{{ item.body }}</div>
              </div>
            </a>
          </div>
        </div>
        <ObserVer v-on:intersect="intersected" v-if="obsDisplay" />
      </div>
    </div>
  </template>
  
  <script>
  import ObserVer from './ObserVer.vue';
  import {
    watch,
    reactive,
    ref,
    onMounted
  } from 'vue';
  import debounce from 'lodash.debounce';
  
  export default {
    name: 'HelloWorld',
    components: {
      ObserVer,
    },
    setup() {
      const form = reactive({
        first_name: null,
        last_name: null,
      });
  
      const filterLists = ref([]);
      const obsDisplay = ref(false);
      let page = 1;
  
      const intersected = async () => {
        let result = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page++}`);
        const lists = await result.json();
        filterLists.value = [...filterLists.value, ...lists];
      };
  
      watch(form, debounce(async () => {
        console.log('Sending API request with search query:', form.first_name, form.last_name);
  
        let result = await fetch(`https://jsonplaceholder.typicode.com/comments?id=${form.first_name}`);
        const lists = await result.json();
        filterLists.value = lists;
        obsDisplay.value = false
      }, 500));
  
      const searchQuery = ref('');
  
      onMounted(async () => {
        let result = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page++}`);
        const lists = await result.json();
        filterLists.value = [...filterLists.value, ...lists];
        obsDisplay.value = true;
      });
  
      return {
        form,
        filterLists,
        obsDisplay,
        intersected,
        searchQuery
      };
    },
  };
  </script>
  