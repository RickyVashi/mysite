import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/DashBoard.vue';
import MySchedule from '../components/MySchedule.vue';
import ProjectS from '../components/ProjectS.vue';
import CalenDar from '../components/CalenDar.vue';
import AddProject from '../components/AddProject.vue';
import ApexCharts from '../components/Project/ApexCharts.vue';
import ChatApp from '../components/Project/ChatApp.vue';
import CurrencyTransfer from '../components/Project/CurrencyTransfer.vue';
import DoubleList from '../components/Project/DoubleList.vue';
import DropZone from '../components/Project/DropZone.vue';
import InfiniteScroll from '../components/Project/InfiniteScroll.vue';
import MultiSelect from '../components/Project/MultiSelect.vue'
import InfiObse from '../components/Project/InfiObse.vue';
import VeeForm from '@/components/Project/VeeForm.vue';
import VMask from '@/components/Project/VMask.vue';
import API_Sorting from '@/components/Project/API_Sorting.vue'
import TailWind from '@/components/Project/TailWind.vue';
import ToDo from '@/components/Project/ToDo.vue';
import VueX from '@/components/Project/VueX.vue';
import WeeklyReport from '@/components/Project/WeeklyReport.vue';
import LogIn from '@/components/LogIn.vue';
import SignUp from '@/components/SignUp.vue';
import MainApp from '../components/MainApp.vue';
import FullApp from '../components/FullApp.vue';
import ForGet from '@/components/ForGet.vue';
import OFetch from '@/components/Project/OFetch.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import MommentJs from '@/components/Project/MommentJs.vue';
import AudioRecorder from '@/components/Project/AudioRecorder.vue';

const routes = [
  {
    path: '',
    component: MainApp,
    children: [
      {path : '', redirect : '/dashboard' },
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      { path: '/myschedule', name: 'myschedule', component: MySchedule },
      { path: '/projects', name: 'projects', component: ProjectS },
      { path: '/projects/ApexCharts', name: 'apexCharts', component: ApexCharts },
      { path: '/projects/ChatApp', name: 'chatApp', component: ChatApp },
      { path: '/projects/CurrencyTransfer', name: 'currencyTransfer', component: CurrencyTransfer },
      { path: '/projects/InfiniteScroll', name: 'infiniteScroll', component: InfiniteScroll },
      { path: '/projects/InfiObs', name: 'infiObs', component: InfiObse },
      { path: '/projects/VeeForm', name: 'veeForm', component: VeeForm },
      { path: '/projects/VMask', name: 'vMask', component: VMask },
      { path: '/projects/MultiSelect', name: 'multiSelect', component: MultiSelect },
      { path: '/projects/DoubleList', name: 'doubleList', component: DoubleList },
      { path: '/projects/DropZone', name: 'dropZone', component: DropZone },
      { path: '/projects/API_Sorting', name: 'apiSorting', component: API_Sorting },
      { path: '/projects/TailWind', name: 'tailWind', component: TailWind },
      { path: '/projects/ToDo_App', name: 'toDoApp', component: ToDo },
      { path: '/projects/VueX', name: 'vuex', component: VueX },
      { path: '/projects/ofetch', name: 'ofetch', component: OFetch },
      { path: '/projects/AudioRecorder', name: 'AudioRecorder', component: AudioRecorder },
      { path: '/projects/MommentJs', name: 'MommentJ', component: MommentJs },
      { path: '/calendar', name: 'calendar', component: CalenDar },
      { path: '/addProject', name: 'addProject', component: AddProject },
      { path: '/WeeklyReport', name: 'weeklyReport', component: WeeklyReport },
      { path: '/ProfilePage', name: 'ProfilePage', component:ProfilePage},
    ]
  },
  {
    path: '',
    component: FullApp,
    children: [
      { path: '/signup',name:'Signup', component: SignUp },
      { path: '/login', name :'Login',component: LogIn },
      { path : '/forget', name: 'Forget', component : ForGet}
    ]
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to,from,next) => {

  if(to.name == 'Login'){
    const token = window.localStorage.getItem('token');
    if(token){
      next('/dashboard');
    }

  }
  if (!['Login', 'Signup', 'Forget'].includes(to.name)) {
    
    const token = window.localStorage.getItem('token');

    if (!token) {
      next('/login'); // Redirect to login only if there's no token
    }else{
      next();
    }
  } 
  else{
    next(); // Allow access to login, register, and forget routes
  }
   
});



export default router;

