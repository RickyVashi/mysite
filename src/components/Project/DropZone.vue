<template>
  <h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Drop Zone</h1>
  <div class="flex flex-col justify-center items-center card  p-8 w-96 mx-auto my-12 border-2 shadow-lg bg-gray-100 ">
    <div class="text-center mb-6">
      <p class="text-blue-500 text-lg">Drag & Drop Images</p>
    </div>

    <div class="drag-area border-2 border-dashed border-gray-300 rounded p-6 text-center mb-6"
         @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
      <span v-if="!isDragging">
        Drag & Drop Image Here or
        <span class="select text-blue-500 cursor-pointer" role="button" @click="selectFiles">Choose</span>
      </span>
      <div v-else class="select text-blue-500">Drop Images Here</div>
      <input name="file" type="file" class="file hidden" ref="fileInput" multiple @change="onFileSelect"/>
    </div>
   
  </div>

  <div class="flex justify-center items-center card h-56 p-8 mx-12 my-12 border-2 shadow-lg bg-gray-100 ">
      <div class="grid grid-cols-4 gap-10">
        <div class="image-container" v-for="(image, index) in images" :key="index">
          <div v-if="image" class="image relative">
            <span @click="removeImage(index)" class="absolute top-0 right-0 cursor-pointer">&times;</span>
            <img :src="image.url" class="w-full h-full object-cover" alt="Uploaded Image"/>
          </div>
          <div v-else class="empty-space h-full"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      isDragging: false
    };
  },
  methods: {
    selectFiles() {
      this.$refs.fileInput.click();
    },
    onFileSelect(event) {
      const files = event.target.files;
      this.addImages(files);
    },
    addImages(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.split("/")[0] !== "image") {
          console.log("File is not an image:", file.name);
          continue;
        }

        if (!this.images.some((e) => e.name === file.name)) {
          this.images.push({ name: file.name, url: URL.createObjectURL(file) });
        }
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    onDragOver(event) {
      event.preventDefault();
      this.isDragging = true;
      event.dataTransfer.dropEffect = "copy";
    },
    onDragLeave(event) {
      event.preventDefault();
      this.isDragging = false;
    },
    onDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer.files;
      this.addImages(files);
    },
    uploadImages() {
      // Perform upload logic here
      console.log("Uploading images:", this.images);
      // Clear images array after upload
      this.images = [];
    }
  }
}
</script>

<style scoped>

</style>
