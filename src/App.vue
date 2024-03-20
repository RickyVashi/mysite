<template>
<div v-if="login == null">
    <LogIn />
</div>

<div v-else class="flex h-screen">
    <div class="w-1/5 h-screen fixed top-0 left-0">
        <SideBar />
    </div>

    <div class="flex flex-col w-full overflow-y-hidden overflow-x-hidden ml-[20%]">
        <div class="sticky top-0">
            <TopBar />
        </div>

        <div class=" overflow-y-auto h-full overflow-x-hidden">
            <div v-if="loading" class="timer my-10">
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
            </div>
            <router-view v-else />
        </div>
    </div>
</div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import SideBar from './components/SideBar.vue'
import LogIn from './components/LogIn.vue';


export default {
    name: 'App',
    components: {
        SideBar,
        TopBar,
        LogIn
    },
    data() {
        return {
            loading: true,
            login: null
        }
    },
    async mounted() {
        this.login = window.localStorage.getItem('token');
    },
    methods: {
        handleRouteChange() {
            this.loading = true;
            this.login = window.localStorage.getItem('token');
            // Delay for 1 second before showing the actual content
            setTimeout(() => {
                this.loading = false;
            }, 250);
        }
    },
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.handleRouteChange();
            next();
        });
    }
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
