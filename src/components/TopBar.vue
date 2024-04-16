<template>
<div class="flex flex-row items-center  justify-between h-14 px-4 bg-[#F1FADA]">

    <div class="items-center hidden md:flex">
        <input type="text" placeholder="Search..." class="manual-search-input px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
    </div>

    <div class="flex flex-grow items-center justify-start space-x-4 md:hidden">
        <button class="text-gray-700 hover:text-blue-500" @click="showMenu">
            <i v-if="!show" class="material-icons">menu</i>
            <i v-else class="material-icons">close</i>
        </button>
    </div>

    <div class="flex flex-row items-center justify-end space-x-4">
        <button @click="route" class="text-gray-700 hover:text-blue-500" :class="flag == 'false' ? 'notalert' : 'alert'">
            <i class="material-icons">notifications</i>
        </button>

        <button class="text-gray-700 hover:text-blue-500" @click="showRoute">
            <i class="material-icons">message</i>
        </button>
        <button @click="routeProfile" class="text-gray-700 block hover:text-blue-500 md:hidden">
            <i class="material-icons">
                account_circle</i>
        </button>
        <button class="text-gray-700 hover:text-blue-500" @click="handleLogin">
            <i class="material-icons">exit_to_app</i>
        </button>
    </div>

</div>
<div v-if="show">
    <SideBar />
</div>
</template>

<script>
import router from '../router/route'
import SideBar from './SideBar.vue'
export default {
    data() {
        return {
            flag: null,
            show: false,
        }
    },
    components: {
        SideBar
    },

    async mounted() {

        this.flag = window.localStorage.getItem('flag');
        console.log(this.flag);

        // Add event listener to capture keypress event
        window.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
        // Remove event listener when component is destroyed
        window.removeEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        route() {
            if (!this.$store.state.flag) {
                router.push({
                    path: '/calendar'
                })
            }
        },
        showRoute() {
            
                router.push({
                    path: '/chatapp'
                })
            
        },
        routeProfile() {
                router.push({
                    path: '/ProfilePage'
                })
            
        },
        handleLogin() {
            window.localStorage.clear();
            location.reload();
        },
        showMenu() {
            this.show = !this.show;
        },
        handleKeyPress(event) {
            // Check if Ctrl + F is pressed
            if (event.ctrlKey && event.key === 'f') {
                // Prevent default browser search behavior
                event.preventDefault();
                // Focus on the manual search bar
                this.focusManualSearchBar();
            }
        },
        focusManualSearchBar() {
            // Focus on the manual search bar input element
            const searchBar = document.querySelector('.manual-search-input');
            if (searchBar) {
                searchBar.focus();
            }
        }
    },
}
</script>


<style scoped>
.alert {
    color: red;
}

.alert {
    -webkit-animation: ring 4s .7s ease-in-out infinite;
    -webkit-transform-origin: 50% 4px;
    -moz-animation: ring 4s .7s ease-in-out infinite;
    -moz-transform-origin: 50% 4px;
    animation: ring 4s .7s ease-in-out infinite;
    transform-origin: 50% 4px;
}

@-webkit-keyframes ring {
    0% {
        -webkit-transform: rotateZ(0);
    }

    1% {
        -webkit-transform: rotateZ(30deg);
    }

    3% {
        -webkit-transform: rotateZ(-28deg);
    }

    5% {
        -webkit-transform: rotateZ(34deg);
    }

    7% {
        -webkit-transform: rotateZ(-32deg);
    }

    9% {
        -webkit-transform: rotateZ(30deg);
    }

    11% {
        -webkit-transform: rotateZ(-28deg);
    }

    13% {
        -webkit-transform: rotateZ(26deg);
    }

    15% {
        -webkit-transform: rotateZ(-24deg);
    }

    17% {
        -webkit-transform: rotateZ(22deg);
    }

    19% {
        -webkit-transform: rotateZ(-20deg);
    }

    21% {
        -webkit-transform: rotateZ(18deg);
    }

    23% {
        -webkit-transform: rotateZ(-16deg);
    }

    25% {
        -webkit-transform: rotateZ(14deg);
    }

    27% {
        -webkit-transform: rotateZ(-12deg);
    }

    29% {
        -webkit-transform: rotateZ(10deg);
    }

    31% {
        -webkit-transform: rotateZ(-8deg);
    }

    33% {
        -webkit-transform: rotateZ(6deg);
    }

    35% {
        -webkit-transform: rotateZ(-4deg);
    }

    37% {
        -webkit-transform: rotateZ(2deg);
    }

    39% {
        -webkit-transform: rotateZ(-1deg);
    }

    41% {
        -webkit-transform: rotateZ(1deg);
    }

    43% {
        -webkit-transform: rotateZ(0);
    }

    100% {
        -webkit-transform: rotateZ(0);
    }
}

@-moz-keyframes ring {
    0% {
        -moz-transform: rotate(0);
    }

    1% {
        -moz-transform: rotate(30deg);
    }

    3% {
        -moz-transform: rotate(-28deg);
    }

    5% {
        -moz-transform: rotate(34deg);
    }

    7% {
        -moz-transform: rotate(-32deg);
    }

    9% {
        -moz-transform: rotate(30deg);
    }

    11% {
        -moz-transform: rotate(-28deg);
    }

    13% {
        -moz-transform: rotate(26deg);
    }

    15% {
        -moz-transform: rotate(-24deg);
    }

    17% {
        -moz-transform: rotate(22deg);
    }

    19% {
        -moz-transform: rotate(-20deg);
    }

    21% {
        -moz-transform: rotate(18deg);
    }

    23% {
        -moz-transform: rotate(-16deg);
    }

    25% {
        -moz-transform: rotate(14deg);
    }

    27% {
        -moz-transform: rotate(-12deg);
    }

    29% {
        -moz-transform: rotate(10deg);
    }

    31% {
        -moz-transform: rotate(-8deg);
    }

    33% {
        -moz-transform: rotate(6deg);
    }

    35% {
        -moz-transform: rotate(-4deg);
    }

    37% {
        -moz-transform: rotate(2deg);
    }

    39% {
        -moz-transform: rotate(-1deg);
    }

    41% {
        -moz-transform: rotate(1deg);
    }

    43% {
        -moz-transform: rotate(0);
    }

    100% {
        -moz-transform: rotate(0);
    }
}

@keyframes ring {
    0% {
        transform: rotate(0);
    }

    1% {
        transform: rotate(30deg);
    }

    3% {
        transform: rotate(-28deg);
    }

    5% {
        transform: rotate(34deg);
    }

    7% {
        transform: rotate(-32deg);
    }

    9% {
        transform: rotate(30deg);
    }

    11% {
        transform: rotate(-28deg);
    }

    13% {
        transform: rotate(26deg);
    }

    15% {
        transform: rotate(-24deg);
    }

    17% {
        transform: rotate(22deg);
    }

    19% {
        transform: rotate(-20deg);
    }

    21% {
        transform: rotate(18deg);
    }

    23% {
        transform: rotate(-16deg);
    }

    25% {
        transform: rotate(14deg);
    }

    27% {
        transform: rotate(-12deg);
    }

    29% {
        transform: rotate(10deg);
    }

    31% {
        transform: rotate(-8deg);
    }

    33% {
        transform: rotate(6deg);
    }

    35% {
        transform: rotate(-4deg);
    }

    37% {
        transform: rotate(2deg);
    }

    39% {
        transform: rotate(-1deg);
    }

    41% {
        transform: rotate(1deg);
    }

    43% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(0);
    }
}
</style>
