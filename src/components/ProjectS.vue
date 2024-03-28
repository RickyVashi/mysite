<template>
<div>
    <ComponentName name="Projects" />
    <div class="mt-0 md:ml-12 md:mr-10 md:my-10">
        <div class="flex flex-col md:flex-wrap md:flex-row mx-2 shadow-t-lg md:gap-x-12 md:gap-y-6 ">
            <router-link v-for="(project) in projects" :key="project._id" :to="`/projects/${project.title}`" class="w-full md:w-[30%] my-2">
                <div class="c-card block md:w-[100%] bg-blue-50 border-b-4 border-blue-200 shadow-md hover:shadow-xl hover:bg-blue-300 rounded-lg overflow-hidden">

                   
                    <div class="relative pb-48 rounded mt-2 mx-2 overflow-hidden">
                        <img class="absolute h-full w-full object-fit" :src="project.image" alt="">
                    </div>
                    
                    <div class="relative p-4">
                        <div v-if="teacherFlag == true" class="ribbon-2 space-x-4">By - {{project.userName}}</div>
                        <h2 class="mt-2 mb-2 font-bold text-xl">{{ project.title }}</h2>
                        <p class="text-sm h-20 text-justify">{{ project.description }}</p>
                        <div class="mt-3 flex items-center mb-2">
                            <span class="text-sm font-semibold">From :- </span> <span class="font-bold text-xl">{{project.from_date}}</span> <span class="text-sm font-semibold ml-8">To :-</span> <span class="font-bold text-xl ml-1">{{project.to_date}}</span>
                        </div>
                        <span class="text-sm font-semibold">Last updated : {{ timeAgo(project.from_date) }} </span>
                    </div>
                    
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import ComponentName from './ComponentName.vue';


export default {
    components: {
        ComponentName
    },
    data() {
        return {
            projects: [],
            teacherFlag: false,
            user : null
        };
    },
    mounted() {
        const user = window.localStorage.getItem('user');

        if(user == 'teacher'){
            this.teacherFlag = true;
        }
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await this.$axios.get(`${this.$URL}/projects`);

                this.projects = response.data.map(project => ({
                    ...project,
                    from_date: this.formatDate(project.from_date),
                    to_date: this.formatDate(project.to_date)
                }));
            } catch (error) {
                if (error.response && error.response.status === 401) {
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
        },
        timeAgo(value) {
            const day = value.substring(0, 2);
            const month = value.substring(3, 5);
            return moment([2024, month - 1, day - 1]).fromNow();
        }
    }
};
</script>

<style scoped>
.ribbon-2 {
    --f: 10px;
    /* control the folded part*/
    --r: 15px;
    /* control the ribbon shape */
    --t: 10px;
    /* the top offset */

    position: absolute;
    inset: var(--t) calc(-1*var(--f)) auto auto;
    padding: 0 10px var(--f) calc(10px + var(--r));
    clip-path:
        polygon(0 0, 100% 0, 100% calc(100% - var(--f)), calc(100% - var(--f)) 100%,
            calc(100% - var(--f)) calc(100% - var(--f)), 0 calc(100% - var(--f)),
            var(--r) calc(50% - var(--f)/2));
    background: #0b8a62;
    box-shadow: 0 calc(-1*var(--f)) 0 inset #0005;
    color: white;
}

</style>
