<template>
<div>
    <ComponentName name="Weekly Reports" />

    <div class="mx-8 flex">
        <div v-for="(month, index) in months" :key="index" :class="{ 'bg-gray-300': selectedMonth === month.name }" class="w-full flex justify-center items-center border-2 border-black text-lg font-medium px-4 py-2 cursor-pointer" @click="selectMonth(month.name)">
            {{ month.name }}
        </div>
    </div>

    <carousel :items-to-show="2.5" class="mx-8" v-if="selectedMonth !== null" :navigationEnabled="true" loop="true">
        <slide v-for="(slide,index) in numberOfSlides" :key="slide" class="w-full p-8 rounded-xl">
            <div class="relative flex flex-col mt-6  bg-gray-200 shadow-md bg-clip-border rounded-xl w-96">
                <div class="flex items-center justify-center bg-white h-56 mx-4 mt-6 text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <img src="https://cdn.slidesharecdn.com/ss_thumbnails/reports-120507153540-phpapp01-thumbnail-4.jpg?cb=1336405214" class="h-52 mt-1" alt="card-image" />
                </div>
                <div class="p-6">
                    <h5 class=" mb-2 font-sans items-center justify-center flex text-2xl font-bold tracking-normal text-blue-gray-900">
                        <P class="mr-2">{{ selectedMonth }}</P>
                        <p class="mr-1"> Week - </p>
                        <p>{{ index+1 }}</p>
                    </h5>
                    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <button class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button" @click="downloadReport(selectedMonth , index+1)">
                        View Report
                    </button>
                </div>
            </div>
        </slide>
    </carousel>
</div>
</template>

<script>
import ComponentName from './ComponentName.vue';
import 'vue3-carousel/dist/carousel.css';
import {
    Carousel,
    Slide
} from 'vue3-carousel';

export default {
    name: 'App',
    components: {
        ComponentName,
        Carousel,
        Slide,
    },
    data() {
        return {
            selectedMonth: 'January',
            months: [{
                    name: 'January',
                    value: 3
                },
                {
                    name: 'February',
                    value: 4
                },
                {
                    name: 'March',
                    value: 2
                },
                {
                    name: 'April',
                    value: 0
                },
                {
                    name: 'May',
                    value: 0
                }
                // Add more months as needed with corresponding slide values
            ]
        };
    },
    computed: {
        numberOfSlides() {
            if (this.selectedMonth !== null) {
                const month = this.months.find(month => month.name === this.selectedMonth);
                if (month) {
                    return month.value; // Return the value associated with the selected month
                }
            }
            return 0;
        }
    },
    methods: {
        selectMonth(monthName) {
            this.selectedMonth = monthName;
        },
        async downloadReport(month, week) {
            try {
               
                const m = month.substring(0, 3);
                const fileName = `${m}_Week${week}.pdf`;
                const reportUrl = `${this.$URL}/${fileName}`; // Adjust the URL based on your backend setup
                const response = await this.$axios.get(reportUrl, {
                    responseType: 'blob'
                });
                console.log(response);

                const blobUrl = window.URL.createObjectURL(new Blob([response.data], {
                    type: 'application/pdf'
                }));

                // Open the PDF file in a new tab
                window.open(blobUrl, '_blank');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.localStorage.clear();
                    location.reload();
                } else {
                    console.error("Error:", error);
                }
            }
        }

    }
};
</script>
