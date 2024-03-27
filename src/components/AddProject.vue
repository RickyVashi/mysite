<template>
<div>
    <ComponentName name="Add new task" />

    <div class="flex justify-center mt-6">
        <button @click="toggleForm" class="bg-blue-600 hover:bg-blue-800 w-40 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
            {{ showForm ? 'Hide' : 'Add Task' }}
        </button>
    </div>

    <div v-if="showForm" class="add flex justify-center items-center mt-6">
        <div class="mx-8 md:w-1/2">
            <form class="bg-slate-200 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm">
                <!-- Title Field -->
                <div class="mb-4">
                    <label class="block text-md font-semibold mb-2" for="title">Title</label>
                    <input v-model="formData.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
                </div>
                <!-- Description Field -->
                <div class="mb-4">
                    <label class="block text-md font-semibold mb-2" for="description">Description</label>
                    <textarea v-model="formData.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-md font-semibold mb-2" for="description">Image URL</label>
                    <input type="text" v-model="formData.image" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" placeholder="ImageLink">
                </div>
                <!-- Timespan from Date to Date Fields -->
                <div class="flex mb-4">
                    <div class="w-1/2 mr-4">
                        <label class="block text-md font-semibold mb-2" for="from_date">From Date</label>
                        <input v-model="formData.from_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="from_date" type="date" />
                    </div>
                    <div class="w-1/2">
                        <label class="block text-md font-semibold mb-2" for="to_date">To Date</label>
                        <input v-model="formData.to_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="to_date" type="date" />
                    </div>
                </div>
                <!-- Submit Button -->
                <div class="flex items-center justify-center mt-6">
                    <button class="bg-blue-600 hover:bg-blue-800 w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="flex justify-center items-center mt-4 text-green-600 font-semibold">
        Project added successfully!
    </div>
</div>
</template>

<script>
import ComponentName from './ComponentName.vue'
import router from '../router/route'

export default {
    components: {
        ComponentName
    },
    data() {
        return {
            showForm: true,
            showSuccess: false,
            formData: {
                title: '',
                description: '',
                image: null,
                from_date: '',
                to_date: ''
            }
        };
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        submitForm() {
            this.$axios.post('http://localhost:1600/addproject', this.formData)
                .then(response => {
                    console.log("Hello", response);
                    this.clearForm();
                    this.showForm = false;
                    this.showSuccess = true;
                    setTimeout(() => {
                        this.showSuccess = false;
                    }, 1000);

                    router.push({
                        path: '/projects'
                    })

                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        window.localStorage.clear();
                        location.reload();
                    } else {
                        console.error("Error:", error);
                    }
                });
        },
        clearForm() {
            this.formData.title = '';
            this.formData.description = '';
            this.formData.image = null;
            this.formData.from_date = '';
            this.formData.to_date = '';
        }
    }
};
</script>
