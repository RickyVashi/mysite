<template>

    <div class="bg-zinc-100 h-12 p-6 mx-4 mb-4 shadow-md flex items-center md:mt-4  ">
        <p class="font-mono text-lg">{{name}}</p>
    </div>
      
 </template>
 
 <script>
 
 export default {
   props:{
    name: {
      type: String,
      required: true
    },
   }
 }
 </script>
 
 <style>
 
 </style>