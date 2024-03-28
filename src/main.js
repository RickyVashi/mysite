import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import 'material-icons/iconfont/material-icons.css';
import router from './router/route';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { mask } from 'vue-the-mask';
import store from './components/Project/store/store';
import Vuesax from 'vuesax3';
import 'vuesax3/dist/vuesax.css';
import axiosPlugin from './axios';
import VueApexCharts from "vue3-apexcharts";
//import vue3GoogleLogin from 'vue3-google-login'


// Set a global property to access environment variables



const app = createApp(App);

app.config.globalProperties.$URL = "https://d5a6-2405-201-200b-d34f-4073-a902-4f32-e213.ngrok-free.app";

app.directive('mask', mask);
app.use(VCalendar);
app.use(router);
app.use(store);
app.use(Vuesax);
app.use(VueApexCharts);
app.use(axiosPlugin);

app.mount('#app');


