
<template>
    <div class="bg-[#265073] h-screen">
      <!-- Header -->
      <div class="logo p-7 flex flex-row h-1/8">
        <img class="mr-5 h-12 rounded-full" src="https://png.pngtree.com/element_our/png/20181008/star-logo-design-png_123799.jpg">
        <div class="Description flex-col">
          <h1 class="text-white font-semibold text-lg pb-0 mb-0">Internship Projects</h1>
          <h1 class="text-white font-light pt-0 -mt-1">Task Management</h1>
        </div>
      </div>
  
      <!-- Border -->
      <div class="border-t-2 border-white"></div>
  
      <!-- Menu -->
      <div class="mt-10 flex flex-col " >
        <!-- <div @click="show = !show"  class="flex items-center text-lg h-12 text-white pl-10 justify-left cursor-pointer hover:text-blue-950 hover:bg-white">
            <i class="material-icons -ml-3 mr-3">dashboard</i>
            <span>Dashboard</span>
            <i v-if="!show" class="material-icons absolute right-5  hover:text-blue-950">expand_more</i>
            <i v-if="show" class="material-icons absolute right-5  hover:text-blue-950">expand_less</i>
          </div>
        <div v-show="show" class="dropdown">
            <router-link to="/dashboard" active-class="clicked" class="flex  items-center h-8 text-white  pl-16 justify-left cursor-pointer hover:text-blue-950 hover:bg-white">
              <span>My Schedule 1</span>
            </router-link>
            <router-link to="/dashboard2" active-class="clicked" class="flex  items-center h-8 text-white  pl-16 justify-left cursor-pointer hover:text-blue-950 hover:bg-white">
              <span>My Schedule 2</span>
            </router-link>
        </div> -->
        
        <!-- Dropdown Submenu -->
        <router-link to="/dashboard" active-class="clicked" class="flex text-lg items-center h-12 text-white pl-10 justify-left cursor-pointer ">
          <i class="material-icons -ml-3 mr-3">dashboard</i>
          <span>Dashboard</span>
          
      </router-link>
     

        
       
        <!-- End of Dropdown Submenu -->
  
       
        <router-link to="/calendar" active-class="clicked" class="flex text-lg items-center h-12 text-white pl-10 justify-left cursor-pointer ">
            <i class="material-icons -ml-3 mr-3"><span class="material-symbols-outlined">
                    calendar_month
                </span></i>
            <span>Attendance</span>
        </router-link>
        <router-link to="/addProject" active-class="clicked" class="flex text-lg items-center h-12 text-white pl-10 justify-left cursor-pointer ">
            <i class="material-icons -ml-3 mr-3">add_task</i>
            <span>Add Task</span>
        </router-link>
        <router-link to="/projects" active-class="clicked" class="flex text-lg items-center h-12 text-white pl-10 justify-left cursor-pointer ">
          <i class="material-icons -ml-3 mr-3">emoji_events</i>
          <span>Tasks</span>
      </router-link>
      <router-link to="/myschedule" active-class="clicked" class="flex text-lg items-center h-12 text-white pl-10 justify-left cursor-pointer ">
        <i class="material-icons -ml-3 mr-3">report</i>
        <span>Weekly Reports</span>
      </router-link>
      </div>
  
      <!-- Border -->
      <div class="border-t-2 mt-20 border-white"></div>
  
      <!-- Footer -->
      <div class="absolute bottom-0 w-64 h-24">
        <div class="logo p-7 flex h-1/8">
          <img class="mr-5 h-12 rounded-full" src="https://www.pngall.com/wp-content/uploads/5/Profile.png">
          <div class="Description flex-col">
            <h1 class="text-white font-semibold text-lg pb-0 mb-0">{{user}}</h1>
            <h1 class="text-white font-light pt-0 -mt-1 text-sm ">vk2491638@gmail.com</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
        return{
            show : false,
            user : null
        }
    },
    mounted(){
      this.user = window.localStorage.getItem('user')
    }
  }
  </script>
  
  <style scoped>
  .clicked {
    --tw-text-opacity: 1;
    color: rgb(23 37 84 / var(--tw-text-opacity));
    background-color: white;
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
    margin-left : 20px
  }

  .bg-purple-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(48, 48, 48) !important;
}
  </style>
  

