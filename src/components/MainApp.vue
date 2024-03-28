<template>
<div class="h-screen hidden md:flex">
    <div class="w-1/5 h-screen fixed top-0 left-0">
        <SideBar />
    </div>

    <div class="flex flex-col w-full overflow-y-hidden overflow-x-hidden ml-[20%]">
        <div class="sticky top-0">
            <TopBar />
        </div>

        <div class=" overflow-y-auto h-full overflow-x-hidden">
            <!-- <div v-if="loading" class="timer my-10">
                    <div class="skeleton-page flex flex-col items-center w-full px-10">
                        <div class="bg-[#4547497a] w-full h-12 p-6 m-6 rounded-md"></div>
                        <div class="row flex justify-center mb-8 rounded-lg">
                            <div class="skeleton-item "></div>
                            <div class="skeleton-item"></div>
                            <div class="skeleton-item"></div>
                        </div>
                        <div class="row flex justify-center">
                            <div class="skeleton-item"></div>
                            <div class="skeleton-item"></div>
                            <div class="skeleton-item"></div>
                        </div>
                    </div>
                </div> -->
            <router-view />
        </div>
    </div>
</div>

<div class="h-screen md:hidden">
    <div class="flex">
        <div class="w-full fixed left-0 right-0 top-0 z-10">
            <TopBar />
        </div>
    </div>
    <div class="my-16">
        <router-view></router-view>
    </div>
</div>
</template>

    
<script>
import TopBar from './TopBar.vue'
import SideBar from './SideBar.vue'

export default {
    name: 'App',
    components: {
        SideBar,
        TopBar,

    },
    data() {
        return {
            loading: true,
            login: null,
            attendanceRecords: [],
            attendanceTakenToday: null,
            today: new Date().toISOString().slice(0, 10),
        }
    },
    async beforeMount() {
        this.login = window.localStorage.getItem('token');

        const response = await this.$axios.get(`${this.$URL}/dates`);
        this.attendanceRecords = response.data;
        this.attendanceTakenToday = this.attendanceRecords.some(record => record.date === this.today);

        if (this.attendanceTakenToday) {
            window.localStorage.setItem('flag', 'true');
        }

    },

}
</script>

    
<style scoped>
.skeleton-item {
    width: 350px;
    height: 250px;
    background-color: #4547497a;
    /* light grey */
    margin: 0 10px;
    animation: shimmer 2s infinite linear;
    border-radius: 5%;
}

@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }

    100% {
        background-position: 200px 0;
    }
}
</style>
