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
// import SignUp from '../components/SignUp.vue';
// import LogIn from '../components/LogIn.vue';
const routes = [
  { path: '/', component: Dashboard },
  { path: '/dashboard', component: Dashboard },
  { path: '/myschedule', component: MySchedule },
  { path: '/projects', component: ProjectS },
  { path: '/projects/ApexCharts', component: ApexCharts },
  { path: '/projects/ChatApp', component: ChatApp },
  { path: '/projects/CurrencyTransfer', component: CurrencyTransfer },
  { path: '/projects/InfiniteScroll', component: InfiniteScroll },
  { path: '/projects/InfiObs', component: InfiObse },
  { path: '/projects/VeeForm', component: VeeForm },
  { path: '/projects/VMask', component: VMask },
  { path: '/projects/MultiSelect', component: MultiSelect },
  { path: '/projects/DoubleList', component: DoubleList },
  { path: '/projects/DropZone', component: DropZone },
  { path: '/projects/API_Sorting', component: API_Sorting },
  { path: '/projects/TailWind', component: TailWind },
  { path: '/projects/ToDo_App', component: ToDo },
  { path: '/projects/VueX', component: VueX },
  { path: '/calendar', component: CalenDar },
  { path: '/addProject', component: AddProject },
  { path: '/WeeklyReport', component: WeeklyReport },
  // { path: '/register', compoment : SignUp},
  // { path: '/logIn', component : LogIn}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
