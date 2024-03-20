<template>
    <div class="obs">
  
    </div>
  </template>
  
  <script>
  export default {
      name : 'ObserVer',
      data(){
          return{
              observer : null
          }
      },
      mounted(){
          this.observer = new IntersectionObserver(([entry]) =>{  //entry = first5 index o
              if(entry && entry.isIntersecting){
                  this.$emit('intersect');
              }
  
          });
  
          this.observer.observe(this.$el)
      }
  }
  </script>
  
  <style>
  .obs {
      height: 50px;
      background-color: blue;
  }
  </style>