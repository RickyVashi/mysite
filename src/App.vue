<template>
<div class="w-full scrollbar-hide">
    <router-view></router-view>
</div>
</template>

<script>


export default {
    name: 'App',
    components: {
      
    },
}
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* For IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  </style>
