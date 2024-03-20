<template>
<div>
    <ComponentName name="Projects" />

    <div class="mt-0 ml-12 mr-10 my-10">
        <div class="flex flex-wrap mx-2 shadow-t-lg gap-x-12 gap-y-6">
            <router-link v-for="(project) in projects" :key="project._id" :to="`/projects/${project.title}`" class="w-[30%]">
                <div class="c-card block w-[100%] bg-blue-50 border-b-4 border-blue-200 shadow-md hover:shadow-xl hover:bg-blue-300 rounded-lg overflow-hidden">
                    <div class="relative pb-48 rounded mt-2 mx-2 overflow-hidden">
                        <img class="absolute  h-full w-full object-fit" :src="project.image" alt="">
                    </div>
                    <div class="p-4">
                        <h2 class="mt-2 mb-2 font-bold text-xl">{{ project.title }}</h2>
                        <p class="text-sm h-20 text-justify">{{ project.description }}</p>
                        <div class="mt-3 flex items-center">
                            <span class="text-sm font-semibold">From :- </span> <span class="font-bold text-xl">{{project.from_date}}</span> <span class="text-sm font-semibold ml-8">To :-</span> <span class="font-bold text-xl ml-1">{{project.to_date}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import ComponentName from './ComponentName.vue';

export default {
    components: {
        ComponentName
    },
    data() {
        return {
            projects: [],
        };
    },
    mounted() {
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await this.$axios.get('http://localhost:1600/projects');
                console.log(response);

                this.projects = response.data.map(project => ({
                    ...project,
                    from_date: this.formatDate(project.from_date),
                    to_date: this.formatDate(project.to_date)
                }));
            } catch (error) {
                if (error.response && error.response.status === 401) 
                {
                    window.localStorage.clear();
                    location.reload();
                } else {
                    console.error("Error:", error);
                }
            }
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (zero-based) and pad with leading zero if needed
            return `${day}-${month}`; // Return formatted date string
        }
    }
};
</script>
