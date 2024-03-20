<template>

    <div class="bg-zinc-100 h-12 p-6 m-6 shadow-md flex items-center  ">
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