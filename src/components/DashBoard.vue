<template>
<div class="flex-col overflow-y-hidden overflow-x-hidden">
    <ComponentName name="Dashboard" />
    <div class="md:h-56 flex flex-col md:flex-row bg-pink-50 px-6">
        <div class="flex-grow w-full md:w-28 flex bg-gradient-to-r rounded-t-2xl rounded-b-2xl from-pink-400 to-purple-500 my-2 md:m-5">
            <div class="flex-col flex-grow">
                <p class="text-2xl font-semibold mt-5 ml-5">Total Active Days</p>
                <p class="text-white text-7xl font-bold ml-5 mt-5 ">{{ totalDays }}</p>
            </div>
            <div class="text-white flex-grow mt-16">
                <i class="material-icons" style="font-size: 6rem;">task</i>
            </div>
        </div>
        <div class="flex-grow w-full md:w-28 flex bg-gradient-to-r rounded-t-2xl rounded-b-2xl from-blue-400 to-green-500 my-2 md:m-5">
            <div class="flex-col flex-grow">
                <p class="text-2xl font-semibold mt-5 ml-5">Total Present Days</p>
                <p class="text-white text-7xl font-bold ml-5 mt-5 ">{{ presentDays }}</p>
            </div>
            <div class="text-white flex-grow mt-16">
                <i class="material-icons" style="font-size: 6rem;">co_present</i>
            </div>
        </div>
        <div class="flex-grow w-full md:w-28 flex bg-gradient-to-r rounded-t-2xl rounded-b-2xl from-yellow-400 to-red-500 my-2 md:m-5">
            <div class="flex-col flex-grow">
                <p class="text-2xl font-semibold mt-5 ml-5">Total Absent Days</p>
                <p class="text-white text-7xl font-bold ml-5 mt-5 ">{{ absentDays }}</p>
            </div>
            <div class="text-white flex-grow mt-16">
                <i class="material-icons" style="font-size: 6rem;">disabled_by_default</i>
            </div>
        </div>
    </div>
   
</div>
<div class="hidden md:w-full  md:flex m-8 px-6 overflow-x-auto overflow-y-hidden">
    <div class="hidden md:w-1/5 md:block">
        <div class="border rounded relative">
            <div class="bg-blue-300 h-12 flex items-center justify-center text-2xl font-semibold">Months</div>
            <div class="absolute inset-x-0 top-full z-10 bg-white border border-t-0 rounded-b-lg shadow-md flex flex-col items-center" @mouseleave="closeDropdown">
                <div v-for="(month, index) in months" :key="index" :class="{ 'bg-gray-300': selectedMonth === index + 1 }" class="w-full text-lg font-medium px-4 py-2 cursor-pointer" @click="selectMonth(index+1)">
                    {{ month }}
                </div>
            </div>
        </div>
    </div>

    <div class="block  md:hidden">
        <div class="border rounded flex flex-col">
            <div class="bg-blue-300 h-12 text-2xl font-semibold w-full">Months</div>
            <!-- <div class="absolute inset-x-0 top-full z-10 bg-white border border-t-0 rounded-b-lg shadow-md flex flex-col items-center" @mouseleave="closeDropdown">
                <div v-for="(month, index) in months" :key="index" :class="{ 'bg-gray-300': selectedMonth === index + 1 }" class="w-full text-lg font-medium px-4 py-2 cursor-pointer" @click="selectMonth(index+1)">
                    {{ month }}
                </div>
            </div> -->
        </div>
    </div><div class="charts flex flex-col md:flex-row w-4/5">
        <div class="mx-6">
            <apexchart ref="chart" type="bar" width="400" height="300" class="apex" :options="barOptions" :series="barData"></apexchart>
        </div>
        
        <div class="mx-8">
            <apexchart ref="chart" type="donut" width="400" class="apex" :options="pieOptions" :series="pieData"></apexchart>
        </div>
    </div>
</div>


</template>

<script>
import ComponentName from './ComponentName.vue'

export default {
    components: {
        ComponentName,
    },
    data() {
        return {
            teacherFlag : false,
            dropdown: false,
            totalDays: 0,
            presentDays: 0,
            absentDays: 0,
            loading: true,
            months: ["January", "February", "March", "April", "May"], // Add more months as needed
            selectedMonth: null,
            pDay: 0,
            aDay: 0,
            tDay: 0,
            barData: [],
            pieData: [],
            barOptions: {
                plotOptions: {
                    bar: {
                        distributed: true,
                        horizontal: true
                    }
                },
                chart: {
                    id: "bar-chart",
                    type: "bar" // Specify the chart type
                },
                yaxis: {
                    // Will be populated dynamically based on selected month
                    title: {
                        text: "Attendance" // Add x-axis label
                    }
                },
                xaxis: {
                    categories: ['Present', 'Absent', 'Total'],
                    title: {
                        text: "Number of Days" // Add y-axis label
                    }
                },
                title: {
                    text: "Month Wise Attendance",
                    align: "center" // Align title to center
                },
                theme: {
                    palette: 'palette2' // upto palette10
                }
            },
            pieOptions: {
                pie: {
                    donut: {
                        size: '5%'
                    }
                },
                chart: {
                    id: "pie-chart",
                },
                labels: ['Present', 'Absent', 'Total'],
                theme: {
                    palette: 'palette4' // upto palette10
                },
                title: {
                    text: "Overall View",
                    align: "center" // Align title to center
                },
            },

        };
    },
    async mounted() {
        const name = window.localStorage.getItem('user');
        if(name == 'teacher'){
            this.teacherFlag = true;
        }
        try {
            const response = await this.$axios.get('http://localhost:1600/count');

            this.presentDays = response.data.presentTrueCount;
            this.absentDays = response.data.presentFalseCount;
            this.totalDays = this.presentDays + this.absentDays;

            this.pieData = [this.presentDays, this.absentDays];

            this.loading = false; // Corrected typo
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.localStorage.clear();
            } else {
                console.error("Error:", error);
            }
        }
        this.selectMonth(1);
    },
    methods: {
        selectMonth(month) {
            this.selectedMonth = month;
            this.fetchData();
            this.closeDropdown();
        },

        async fetchData() {
            try {
                if (!this.selectedMonth) {
                    console.error('No month selected.');
                    return;
                }
                // Make an HTTP request to fetch data for the selected month
                const response = await this.$axios.get(`http://localhost:1600/count/${this.selectedMonth}`);
                // Assuming the response contains data for chart
                this.pDay = response.data.presentTrueCount;
                this.aDay = response.data.presentFalseCount;

                this.tDay = this.pDay + this.aDay;

                this.barData = [{
                    name: 'No of Days',
                    data: [this.pDay, this.aDay, this.tDay]
                }];
                // Update x-axis categories dynamically based on the selected month
                this.barOptions.xaxis.categories = ['Present', 'Absent', 'Total'];

                this.loading = false;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.localStorage.clear();
                    location.reload();
                } else {
                    console.error("Error:", error);
                }
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        closeDropdown() {
            this.isDropdownOpen = false;
        },

    }
};
</script>
