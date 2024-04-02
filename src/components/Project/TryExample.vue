<template>
    <div>
      <RecorderVew id="1" audioSrc="https://content.voitex.com/index.php/api/library/playFile/36_02272024_08473908005200.wav"></RecorderVew>
        <!-- <RecorderVew></RecorderVew> -->
        <!-- <DropZone :allowMultiple="true"></DropZone> -->
    </div>
  </template>
  
  <script>
  import RecorderVew from './RecorderVew.vue'
 //import DropZone from './DropZone.vue'
  export default {
      components:{
          RecorderVew,
         // DropZone
      }
  }
  </script>
  
  <style>
  /* Your component styles here */
  </style>
  