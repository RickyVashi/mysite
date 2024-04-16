<template>
  <div>
    <h1 class="font-semibold text-lg bg-gray-100 p-4 my-8 mx-12">V-Mask Credit Card</h1>
    <div class="py-10 px-40">
      <!-- VueMultiselect component -->
      <VueMultiselect
        v-model="selectedOption"
        ref="multiselect"
        :loading="loading"
        :options="optionsList"
        placeholder="Select an option or type to search..."
        track-by="id"
        label="name"
        :searchable="true"
        :multiple="false"
        :internalSearch="false"
        @search-change="debouncedFetchOptions"
      >
        <template #noResult>
          <div v-if="showNoResult" class="flex justify-between">
            <h2>No result found for "{{ data }}"</h2>
            <h2 class="px-2 py-1 rounded-md bg-blue-100" @click="openCreateAlbumModal" role="button">Create an album</h2>
          </div>
        </template>
        <!-- Template for when no options are available -->
        <template v-slot:noOptions>
          <div>Search Something</div>
        </template>
      </VueMultiselect>

      <!-- Loading indicator -->
      <div v-if="loading" role="status" class="animate-pulse">
        <div class="mb-3 mt-3 h-7 mt bg-gray-300 animate-pulse"></div>
        <div class="mb-3 h-7 mt bg-gray-300 animate-pulse"></div>
        <div class="mb-3 h-7 mt bg-gray-300 animate-pulse"></div>
        <div class="mb-3 h-7 mt bg-gray-300 animate-pulse"></div>
        <span class="sr-only">Loading...</span>
      </div>

      <!-- Selected option content -->
      <div v-if="selectedOption !== null">
        <div class="wrapper">
          <div class="outer">
            <div class="content animated fadeInLeft">
              <span class="bg animated fadeInDown">EXCLUSIVE</span>
              <h1>{{ selectedOption.name }}</h1>
              <p>{{ selectedOption.description }}</p>
              <div class="button">
                <a href="#">$ {{ selectedOption.price }}</a
                ><a class="cart-btn" href="#"><i class="cart-icon ion-bag"></i>ADD TO CART</a>
              </div>
            </div>
            <div class="img-container">
              <img :src="selectedOption.image" class="animated fadeInRight" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for creating an album -->
    <div v-if="showCreateAlbumModal" class="modal-overlay w-3/5">
      <div class="modal w-2/5 ml-1/5">
        <h2>Create an Album</h2>
        <div class="flex flex-col mt-4">
          <label class="">Number:</label>
          <input type="number" v-model="albumNumber" class="px-2 py-1 border rounded-md w-full" />
        </div>
        <div class="flex flex-col mt-4">
          <label class="mr-4">String:</label>
          <input type="text" v-model="albumString" class="px-2 py-1 border rounded-md" />
        </div>
        <div class="w-full">
          <MultiDatePicker class="w-full"/>
        </div>
        <div class="flex justify-center mt-4 ">
          <button @click="closeCreateAlbumModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect';
import debounce from 'lodash.debounce';
import axios from 'axios';
import MultiDatePicker from './MultiDatePicker.vue'

export default {
  name: 'HelloWorld',
  components: {
    VueMultiselect,
    MultiDatePicker
  },
  data() {
    return {
      selectedOption: null,
      optionsList: [],
      loading: null,
      showNoResult: false,
      showCreateAlbumModal: false,
      albumNumber: null,
      albumString: ''
    };
  },
  methods: {
    debouncedFetchOptions: debounce(async function(query) {
      this.showNoResult = false; // Hide noResult template initially
      if (query !== '') {
        try {
          this.loading = true;
          this.data = query;
          let response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
          const lists = response.data.products.map((option, index) => ({
            id: index,
            name: option.title,
            brand: option.brand,
            description: option.description,
            price: option.price,
            image: option.thumbnail
          }));
          

          this.optionsList = lists;
          if (lists.length === 0) {
            this.showNoResult = true; // Show noResult template if no results found
          }
          this.loading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }, 500),
    openCreateAlbumModal() {
      this.$refs.multiselect.deactivate()
      this.showCreateAlbumModal = true;
      this.albumString = this.data;
    },
    closeCreateAlbumModal() {
      const temp = {name : this.albumString , id : this.albumNumber};
      this.optionsList.push(temp)
      this.selectedOption =  temp;
      this.showCreateAlbumModal = false;
    }
  }
};
</script>

<style>
/* Add your styles here */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  
  border-radius: 8px;
}
</style>



<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
* {
    box-sizing: border-box;
}

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Montserrat;
    margin-top: -120px;
    width: 100%;
    height: 100vh;
}

.outer {
    position: relative;
    background: #38476038;
    ;
    border: 5px solid black;
    border-radius: 10px;
    height: 350px;
    width: 550px;
    overflow: hidden;
    display: flex;
    align-items: center;
}

img-container {
    margin: 20px;
    position: absolute;
    top: 25px;
    right: 0px;
    z-index: 0;
}

img {
    margin: 20px;
    position: absolute;
    top: 25px;
    right: 0px;
    z-index: 0;
    animation-delay: 0.5s;
    height: 250px;
    width: 200px;
}

.content {
    animation-delay: 0.3s;
    position: absolute;
    left: 20px;
    z-index: 3
}

h1 {
    color: #111;
}

p {
    width: 280px;
    font-size: 13px;
    line-height: 1.4;
    color: #000000;
    margin: 20px 0;

}

.bg {
    display: inline-block;
    color: #fff;
    background: #494a4d;
    padding: 5px 10px;
    border-radius: 50px;
    font-size: .7em;
}

.button {
    width: fit-content;
    height: fit-content;
    margin-top: 10px;

}

.button a {
    display: inline-block;
    overflow: hidden;
    position: relative;
    font-size: 11px;
    color: #111;
    text-decoration: none;
    padding: 10px 15px;
    border: 1px solid #aaa;
    font-weight: bold;

}

.button a:after {
    content: "";
    position: absolute;
    top: 0;
    right: -10px;
    width: 0%;
    background: #111;
    height: 100%;
    z-index: -1;
    transition: width 0.3s ease-in-out;
    transform: skew(-25deg);
    transform-origin: right;
}

.button a:hover:after {
    width: 150%;
    left: -10px;
    transform-origin: left;

}

.button a:hover {
    color: #fff;
    transition: all 0.5s ease;
}

.button a:nth-of-type(1) {
    border-radius: 50px 0 0 50px;
    border-right: none;
}

.button a:nth-of-type(2) {
    border-radius: 0px 50px 50px 0;
}

.cart-icon {
    padding-right: 8px;

}

.footer {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
