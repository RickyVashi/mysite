<template>
  
  <div id="parent" class="flex mx-5 my-5">
   
    <!-- Left Section: State Selection and Date Picker -->
    <div class="input flex flex-row w-1/2 pr-5">
      <div class="lists flex flex-col w-1/2 border border-gray-300 rounded">
        <h2 class="py-4 border-b border-black">States</h2>
        <ul>
          <li v-for="stateCode in stateCodes" 
              :key="stateCode" 
              :class="{ 'selected': stateName === stateCode, 'bg-gray-200': selectedState === stateCode }" 
              @click="selectState(stateCode)"
              class="py-2 px-4 cursor-pointer hover:bg-gray-100">
            {{ stateCode }}
          </li>
        </ul>
      </div>
      <div id="date" class="w-56 bg-slate-100 p-2 mx-5 my-16 border h-40 border-b-2">
        <h4>Select Date:</h4>
        <datepicker v-model="selectedDate" :upperLimit="upperLimitDate" :lowerLimit="lowerLimitDate" :clearable="true" />
        <button class="my-12 mx-16 py-2 px-4 text-white rounded-md bg-blue-600" @click="showChart">Display</button>
      </div>
    </div>

    <!-- Right Section: Chart Display -->
    <div v-if="show" id="output" class="w-1/2 pl-5">
      <div class="chart mb-4" >
        <apexchart ref="chart" type="bar" width="100%" height="300" class="apex" :options="barOptions" :series="chartData"></apexchart>
      </div>
      <div class="chart" >
        <apexchart ref="chart2" height="300" type="pie" class="apex" :options="pieOptions" :series="pieData"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
import Datepicker from "vue3-datepicker";

export default {
components: {
  apexchart: VueApexCharts,
  Datepicker
},
data() {
  return {
    chartData: [],
    pieData: [],
    barOptions: {
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: "COVID-19 Data for confirmed cases",
      },
    },
    pieOptions: {
      chart2: {
        id: "pie-chart",
      },
      labels: ['Confirmed', 'Deceased', 'Recovered', 'Tested', 'Vaccinated'],
      title: {
        text: "COVID-19 Data (Pie Chart)",
      },
    },
    stateCodes: [],
    stateName: '',
    selectedState: '', // Added selectedState variable to track clicked state
    selectedDate: null,
    lowerLimitDate: new Date('2020-06-26'),
    upperLimitDate: new Date('2021-10-31'),
    show: false
  };
},
created() {
  this.fetchData();
},
methods: {
  async fetchData() {
    try {
      const result = await axios.get("https://data.covid19india.org/v4/min/timeseries.min.json");
      // Get state codes from the fetched data
      this.stateCodes = Object.keys(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  selectState(stateCode) {
    this.selectedState = stateCode; // Set the selected state
    this.stateName = stateCode; // Set the state name
  },
  async showChart() {

    if (!this.stateName || !this.selectedDate) {
      alert("Please select a state and a date.");
      return;
    }

    try {
      const result = await axios.get(`https://data.covid19india.org/v4/min/timeseries.min.json`);

      // Get the selected date
      const selectedDate = new Date(this.selectedDate);

      // Adjust the selected date for the timezone offset
      const adjustedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));

      // Format the adjusted date to yyyy-mm-dd format
      const formattedDate = adjustedDate.toISOString().split('T')[0];

      // Use the formatted date to access state data
      const stateData = result.data[this.stateName].dates[formattedDate];

      if (stateData) {
        // Prepare data for chart
        const categories = Object.keys(stateData);
        const seriesData = Object.values(stateData);

        console.log(categories);
        // Update chart data and show
        this.barOptions.xaxis.categories = categories;
        this.chartData = [{
          name: this.stateName,
          data: seriesData.map(data => data.confirmed || 0),
        }];

        // Prepare data for pie chart
        this.pieData = Object.values(stateData.total);

        this.show = true;
      } else {
        alert("No data available for the selected state and date.");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
},
};
</script>
