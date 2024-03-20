<template>
  
    <div class="hello p-10">
        <div id="scrollDiv" ref="scrollDiv" class="scroll-container">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 15%;">
                  ID
                  <span
                    @click="fetchSortedData('_id', 'asc')"
                    :class="{ active: column === 'id' && direction === 'asc' }"
                    >&#9650;</span
                  >
                  <span
                    @click="fetchSortedData('_id', 'desc')"
                    :class="{ active: column === 'id' && direction === 'desc' }"
                    >&#9660;</span
                  >
                </th>
                <th style="width: 35%;">
                  Title
                  <span
                    @click="fetchSortedData('title', 'asc')"
                    :class="{ active: column === 'title' && direction === 'asc' }"
                    >&#9650;</span
                  >
                  <span
                    @click="fetchSortedData('title', 'desc')"
                    :class="{ active: column === 'title' && direction === 'desc' }"
                    >&#9660;</span
                  >
                </th>
                <th style="width: 25%;">
                  Published Date
                  <span
                    @click="fetchSortedData('publishedDate', 'asc')"
                    :class="{ active: column === 'publishedDate' && direction === 'asc' }"
                    >&#9650;</span
                  >
                  <span
                    @click="fetchSortedData('publishedDate', 'desc')"
                    :class="{ active: column === 'publishedDate' && direction === 'desc' }"
                    >&#9660;</span
                  >
                </th>
                <th style="width: 25%;">
                  ISBN
                  <span
                    @click="fetchSortedData('isbn', 'asc')"
                    :class="{ active: column === 'isbn' && direction === 'asc' }"
                    >&#9650;</span
                  >
                  <span
                    @click="fetchSortedData('isbn', 'desc')"
                    :class="{ active: column === 'isbn' && direction === 'desc' }"
                    >&#9660;</span
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="w-screen">
                <td colspan="4">
                  <div  role="status" class="animate-pulse">
                    <div class=" mb-3 mt-3  h-7 mt bg-gray-300 animate-pulse"></div>
                    <div class=" mb-3   h-7 mt bg-gray-300 animate-pulse"></div>
                    <div class=" mb-3   h-7 mt bg-gray-300 animate-pulse"></div>
                    <div class=" mb-3   h-7 mt bg-gray-300 animate-pulse"></div>
            
                    <span class="sr-only">Loading...</span>
                </div>
                </td>
              </tr>
              <tr v-else v-for="(item, index) in filterLists" :key="index">
                <td :class="{ color: column === 'id' && yes === false }">
                  {{ item._id }}
                </td>
                <td :class="{ color: column === 'title' && yes === false }">
                  {{ item.title }}
                </td>
                <td :class="{ color: column === 'publishedDate' && yes === false }">
                  {{ item.publishedDate }}
                </td>
                <td :class="{ color: column === 'isbn' && yes === false }">
                  {{ item.isbn }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    
    <script>
    
    
    export default {
      name: 'HelloWorld',
      components:{
        //VueSpinner
      },
      data() {
        return {
          filterLists: [],
          column: '_id',
          direction: 'asc',
          yes: false,
          loading: false
        };
      },
      methods: {
    
      async fetchSortedData(columnName, order) {
        this.loading = true;
        try {
          const response = await fetch(`http://localhost:1600/books/sort/${columnName}/${order}`);
          const data = await response.json();
          this.filterLists = data;
          this.column = columnName;
          this.direction = order;
        } catch (error) {
          console.error('Error fetching sorted data:', error);
        } finally {
          // Set loading to false after 2000ms
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        }
      }
    },
      mounted() {
        this.fetchSortedData(this.column, this.direction);
      }
    };
    </script>
    
    <style scoped>
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .table th,
    .table td {
      border: 1px solid #4848488f;
      padding: 8px;
      text-align: left;
    }
    
    .table th {
      background-color: #f2f2f2;
      font-weight: bold;
      position: sticky;
      top: 0;
      z-index: 1;
      border: 3px solid #000000;
      margin-right: 30px
    }
    
    .table thead th {
      background-color: #5dc9f8;
    }
    
    .table th span {
      cursor: pointer;
      margin-left: 5px;
    }
    
    .active {
      border: 1px solid black;
    }
    
    .color {
      background-color: rgb(225, 225, 225) !important;
      /* Give priority to this background color */
      border: 5px solid black;
    }
    
    .spinner-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    </style>
    
    
    <!-- 
    //<script>
    // import ObserVer from './ObserVer.vue';
    // import {
    //     sortBy
    // } from 'lodash';
    
    // export default {
    //     name: 'HelloWorld',
    //     components: {
    //         ObserVer // Register the Observer component
    //     },
    //     data() {
    //         return {
    //             filterLists: [],
    //             obsDisplay: false,
    //             page: 1,
    //             column: 'id',
    //             direction: 'asc',
    //             yes : false
    //         };
    //     },
    //     methods: {
    //         async intersected() {
    //             try {
    //                 let result = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${this.page++}`);
    //                 const lists = await result.json();
    //                 this.filterLists = [...this.filterLists, ...lists];
    
    //                 // Sort if there's an active column
    //                 if (this.column) {
    //                     this.sortData();
    //                 }
    //             } catch {
    //                 alert("All Data Loaded")
    //             }
    //         },
    //         ascending(columnName) {
    //             if (this.column === columnName && this.direction === 'asc') {
    //                 this.direction = 'asc';
    //                 this.column = 'id';
    //             } else {
    //               this.column = columnName;
    //                 this.direction = 'asc';
    //             }
    //             this.sortData();
    //         },
    //         descending(columnName) {
    //             if (this.column === columnName && this.direction === 'desc') {
    //               this.direction = 'asc';
    //                 this.column = 'id';
    //                 this.yes = false;
    //             } else {
    //                 // Set descending sorting
    //                 this.column = columnName;
    //                 this.direction = 'desc';
    //             }
    //             this.sortData();
    //         },
    
    //         sortData() {
    //             if (this.direction === 'asc') {
    //                 this.filterLists = sortBy(this.filterLists, this.column);
    //             } else if (this.direction === 'desc') {
    //                 this.filterLists = sortBy(this.filterLists, this.column).reverse();
    //             }
    //         },
    //         async loadMoreData() {
    //             await this.intersected();
    //         },
    //         async fetchData() {
    //             await this.intersected();
    //             this.obsDisplay = true;
    //         }
    //     },
    
    //     mounted() {
    //         this.fetchData();
    //     }
    // };
    
    //</script> -->