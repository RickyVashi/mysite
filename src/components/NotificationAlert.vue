<template>
    <vs-notification v-if="showNotification" :position="position" :color="color" :duration="duration">
      {{ message }}
    </vs-notification>
  </template>
  
  <script>
  export default {
    props: {
      showNotification: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'top-right'
      },
      color: {
        type: String,
        default: 'primary'
      },
      duration: {
        type: Number,
        default: 3000 // Default duration is 5 seconds
      }
    }
  };
  </script>
  