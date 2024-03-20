<template>
    <div class="hello mx-12 my-12">
      <h1 class="font-semibold text-lg w-full bg-gray-100 p-4">Infinite Scroll</h1>
  
      <div id="scrollDiv" ref="scrollDiv" @scroll="handleScroll" class="scroll-container my-8">
        <div class="wrapper" v-for="(item) in visibleLists" :key="item.id">
          <div class="card border border-gray-300 rounded-md p-4 mb-4">
            <a href="#" class="card-link flex items-center">
              <img src="https://wallpapercave.com/wp/wp2722928.jpg" class="card-image mr-4 w-20 h-20 rounded-full">
              <div class="region_text flex-1">
                <h5 class="text-lg font-semibold">{{ item.id }}</h5>
                <div class="region_buttons">{{ item.title }}</div>
                <div class="card-body text-gray-700">{{ item.body }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HelloWorld',
  
    data() {
      return {
        lists: [],
        visibleLists: [],
        page: 1, // Initial page number
        perPage: 20, // Number of items to fetch per page
        isLoading: false
      }
    },
  
    methods: {
      async fetchData() {
        this.isLoading = true;
        let result = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.perPage
          }
        });
        this.lists.push(...result.data);
        this.page++;
        this.isLoading = false;
        this.updateVisibleLists();
      },
  
      updateVisibleLists() {
        const startIndex = (this.page - 2) * this.perPage;
        this.visibleLists = this.lists.slice(0, startIndex + this.perPage);
      },
  
      handleScroll() {
        const scrollDiv = this.$refs.scrollDiv;
        if (scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight - 20 && !this.isLoading) {
          this.fetchData();
        }
      }
    },
  
    // First Page Mounting
    mounted() {
      this.fetchData();
    },
  }
  </script>
  
  <style scoped>
  .scroll-container {
    max-height: 600px; /* Adjust as needed */
    overflow-y: auto;
  }
  
  .card-link:hover .card-image {
    transform: scale(1.05);
  }
  
  .card-link:hover .region_text {
    color: #4B5563; /* Adjust hover color */
  }
  
  .card-link:hover .card-body {
    color: #4B5563; /* Adjust hover color */
  }
  </style>
  