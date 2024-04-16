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
            <router-view />
        </div>
    </div>
</div>

</template>

    
<script>
import TopBar from './TopBar.vue'
import SideBar from './SideBar.vue'
import io from 'socket.io-client';

export default {
    name: 'App',
    components: {
        SideBar,
        TopBar,
    },
    mounted(){
        this.socket = io('http://192.168.29.219:3000');
        this.$store.state.socketInstance = this.socket;
      
        const email = window.localStorage.getItem('email');
        const name = window.localStorage.getItem('user');

        // Emit a custom event to notify the server of successful login
        this.socket.emit('join', {
            email: email,
            name: name
        });

        this.socket.on('message:received', (data) => {
            this.$store.state.messages.push(data);
        });
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
