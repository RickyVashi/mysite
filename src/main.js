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
import { FeatherIcon } from 'vue-feather-icons';
import GoogleSignInPlugin from "vue3-google-signin"

// Set a global property to access environment variables



const app = createApp(App);

 app.config.globalProperties.$URL = "http://localhost:1600";
//app.config.globalProperties.$URL = "http://192.168.29.219:1600";

app.directive('mask', mask);
app.use(VCalendar);
app.use(router);
app.use(store);
app.use(Vuesax);
app.use(VueApexCharts);
app.use(axiosPlugin);
app.use(GoogleSignInPlugin, {
    clientId:  '955571392515-muemhvn6jok7v4vgqufj6vt5pblk2l0k.apps.googleusercontent.com',

  });

app.component('FeatherIcon', FeatherIcon);


app.mount('#app');


