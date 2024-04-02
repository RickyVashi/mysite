<template>
    <div class="w-full">
      <nav class="bg-purple-800 text-white flex justify-between">
          <span class="text-xl flex items-center mx-5 font-bold"> HelloMi</span>
          <ul class="px-28 py-4 flex space-x-11 justify-end">
              <li class="cursor-pointer" >Home</li>
              <li class="cursor-pointer">About</li>
              <li class="cursor-pointer">Category</li>
              <li class="cursor-pointer">Contact Us</li>
          </ul>
      </nav>
      <main class=" bg-fuchsia-300 flex  justify-around">
          <div class="main py-40 pl-9">
              <div class="text-6xl "> The Best Phones...</div>
              <p class="py-3  mx-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, nostrum.</p>
              <div class="buttons my-4">
                  <button class="bg-purple-800 px-3 py-2 rounded-2xl mx-1 text-white hover:text-slate-900 hover:bg-fuchsia-700">
                      Buy Now
                  </button>
                  <button  class="bg-purple-800 px-3 py-2 rounded-2xl text-white hover:text-slate-900 hover:bg-fuchsia-700">
                      Contact Us
                  </button>
              </div>
          </div>
          <div class="flex items-center ">
              <img src="../../assets/bg.png" class="h-80">
          </div>
      </main>
      <div class="bg-purple-800 flex  px-6 fixed bottom-0 w-full items-left h-12"><p class="p-1 text-white w-full flex  text-2xl font-thin">Design & Created By @Ricky Vashi </p></div>
  </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  
  </style>