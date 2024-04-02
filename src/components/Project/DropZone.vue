<template>
<h1 class="font-semibold text-lg bg-gray-100 p-4 my-12 mx-12 ">Drop Zone</h1>

<div class="flex flex-col justify-center items-center">
    <div class="drag-area border-2 border-dashed border-[#938af3] rounded-xl text-center w-3/5 h-72" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
        <div class="flex flex-col items-center justify-center h-72">
            <div>
                <span class="select text-[#938af3] cursor-pointer text-xl"><span class="material-symbols-outlined material-icons">
                        cloud_upload
                    </span></span>
            </div>
            <div>
                <span class="select text-[#938af3] cursor-pointer font-semibold text-lg" role="button" @click="selectFiles">Select files to upload</span>
            </div>
            <div>
                <span class="select text-[#938af3] cursor-pointer">File format : .mp3 .wav</span>
            </div>
            <div>
                <span class="select text-[#938af3] cursor-pointer">Max size : 700MB</span>
            </div>
        </div>
        <input name="file" type="file" class="file hidden" ref="fileInput" :multiple="allowMultiple" @change="onFileSelect" />
    </div>
    <button class="bg-[#938af3] px-4 py-2 rounded-lg m-8" @click="uploadFiles">Upload Files</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            files: [],
            isDragging: false,
           // allowMultiple: true,
        };
    },
    props: {
        allowMultiple: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    methods: {
        //On click of select Image
        selectFiles() {
            this.$refs.fileInput.click();
        },

        //After file is selected
        onFileSelect(event) {
            const files = event.target.files;
            this.validateFile(files);
          
        },

        //From the above call
        validateFile(files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Check file extension
                const fileNameParts = file.name.split('.');
                const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase(); // Convert extension to lowercase for case-insensitive comparison

                if (!['mp3', 'wav'].includes(fileExtension)) {
                    this.$vs.notify({
                        color: 'danger',
                        position: 'bottom-right',
                        title: 'File format mismatch',
                        text: 'File must be the only type of .mp3 or .wav'
                    })
                    continue;
                }

                // Check file size
                if (file.size > 700 * 1024 * 1024) { // 700MB in bytes
                    this.$vs.notify({
                        color: 'danger',
                        position: 'bottom-right',
                        title: 'File size mismatch',
                        text: 'File size must be the less than 700MB..'
                    })
                    continue;
                }

                // If both conditions pass, add the file
                if (!this.files.some((e) => e.name === file.name)) {
                    this.files.push({
                        name: file.name,
                        url: URL.createObjectURL(file)
                    });
                }
            }
        },

        uploadFiles() {
            // Perform upload logic here
            console.log("Uploading Files:", this.files);
            this.files = [];
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
            this.validateFile(files);
        },

    }
}
</script>

<style scoped>

</style>
