<template>
  <div class="flex justify-around items-center my-10">
    <button @click="showChild('first')" class="px-4 py-2 bg-yellow-300 hover:bg-yellow-500 rounded-lg shadow-md">First Child</button>
    <button @click="showChild('second')" class="px-4 py-2 bg-green-300 hover:bg-yellow-500 rounded-lg shadow-md">Second Child</button>
  </div>
 
  <div v-if="flag === 'first'" class="flex flex-col justify-center items-center">
    <FormData :errors="errors"></FormData>
    <button @click="submitForm" class="px-4 py-2 bg-blue-300 hover:bg-blue-500 rounded-lg shadow-md">Submit</button>
  </div>

  <div v-if="flag === 'second'" class="flex flex-col justify-center items-center">
    <FormData2 :errors="errors"></FormData2>
    <button @click="submitForm" class="px-4 py-2 bg-blue-300 hover:bg-blue-500 rounded-lg shadow-md">Submit</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FormData from './FormData.vue';
import FormData2 from './FormData2.vue';

export default {
  components: {
    FormData,
    FormData2
  },
  computed: {
    ...mapState({
      formData: state => state.formData,
      validationSchema: state => state.validationSchema
    }),
    selectedSchema() {
      return this.validationSchema;
    }
  },
  data() {
    return {
      errors: {},
      flag: null
    };
  },
  methods: {
    showChild(child) {
      this.flag = child;
      this.errors = []
    },
    async submitForm() {
      const schema = this.selectedSchema;
      if (!schema) {
        console.error('Validation schema not found for selected child component');
        return;
      }

      try {
        await schema.validate(this.formData, { abortEarly: false });
        console.log('Form data:', this.formData);
      } catch (error) {
        if (error.inner) {
          const fieldErrors = {};
          error.inner.forEach(err => {
            fieldErrors[err.path] = err.message;
          });
          this.errors = fieldErrors;
          console.log(this.errors);
        } else {
          console.log('Validation error:', error.message);
        }
      }
    }
  }
};
</script>







  <!-- <template>
    <div>
      <RecorderVew id="1" audioSrc="https://content.voitex.com/index.php/api/library/playFile/36_02272024_08473908005200.wav"></RecorderVew>
      <RecorderVew></RecorderVew>
      <DropZone :allowMultiple="true"></DropZone>
        <FormData></FormData>
        <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </template>
  
  <script>
  import RecorderVew from './RecorderVew.vue'
  import FormData from './FormData.vue'
 import DropZone from './DropZone.vue'
  export default {
      components:{
          RecorderVew,
          DropZone,
         FormData
      }
  }
  </script>  -->

 