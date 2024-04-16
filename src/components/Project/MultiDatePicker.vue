<template>
<div class="py-10 px-40 h-20" role="button">

    <VueMultiselect 
    ref="multiselect"
     :options="dateRangeOptions" 
     v-model="selectedDateRange" 
     placeholder="Select Date Range" 
     :open-direction="up" 
     selectedLabel="" selectLabel="" deselectLabel="" 
     label="label" track-by="value"
      @blur="hide"
       :preventAutofocus="true">

        <template #placeholder>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#707070" height="24" width="24">
                    <path d="M8 14Q7.575 14 7.287 13.712Q7 13.425 7 13Q7 12.575 7.287 12.287Q7.575 12 8 12Q8.425 12 8.713 12.287Q9 12.575 9 13Q9 13.425 8.713 13.712Q8.425 14 8 14ZM12 14Q11.575 14 11.288 13.712Q11 13.425 11 13Q11 12.575 11.288 12.287Q11.575 12 12 12Q12.425 12 12.713 12.287Q13 12.575 13 13Q13 13.425 12.713 13.712Q12.425 14 12 14ZM16 14Q15.575 14 15.288 13.712Q15 13.425 15 13Q15 12.575 15.288 12.287Q15.575 12 16 12Q16.425 12 16.712 12.287Q17 12.575 17 13Q17 13.425 16.712 13.712Q16.425 14 16 14ZM5 22Q4.175 22 3.587 21.413Q3 20.825 3 20V6Q3 5.175 3.587 4.588Q4.175 4 5 4H6V2H8V4H16V2H18V4H19Q19.825 4 20.413 4.588Q21 5.175 21 6V20Q21 20.825 20.413 21.413Q19.825 22 19 22ZM5 20H19Q19 20 19 20Q19 20 19 20V10H5V20Q5 20 5 20Q5 20 5 20Z" />
                </svg>
                <span class="pl-2">Select Date Range</span>
            </div>
        </template>

        <template #singleLabel>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#707070" height="24" width="24">
                    <path d="M8 14Q7.575 14 7.287 13.712Q7 13.425 7 13Q7 12.575 7.287 12.287Q7.575 12 8 12Q8.425 12 8.713 12.287Q9 12.575 9 13Q9 13.425 8.713 13.712Q8.425 14 8 14ZM12 14Q11.575 14 11.288 13.712Q11 13.425 11 13Q11 12.575 11.288 12.287Q11.575 12 12 12Q12.425 12 12.713 12.287Q13 12.575 13 13Q13 13.425 12.713 13.712Q12.425 14 12 14ZM16 14Q15.575 14 15.288 13.712Q15 13.425 15 13Q15 12.575 15.288 12.287Q15.575 12 16 12Q16.425 12 16.712 12.287Q17 12.575 17 13Q17 13.425 16.712 13.712Q16.425 14 16 14ZM5 22Q4.175 22 3.587 21.413Q3 20.825 3 20V6Q3 5.175 3.587 4.588Q4.175 4 5 4H6V2H8V4H16V2H18V4H19Q19.825 4 20.413 4.588Q21 5.175 21 6V20Q21 20.825 20.413 21.413Q19.825 22 19 22ZM5 20H19Q19 20 19 20Q19 20 19 20V10H5V20Q5 20 5 20Q5 20 5 20Z" />
                </svg>
                <span class="staticOptionEllipsis pl-2">{{ formatDateRange(selectedDateRange.value) }}</span>
            </div>
        </template>

        <template #option="{ option }">
            <div class="flex items-center justify-between">
                <span class="staticOptionEllipsis">{{ option.label }}</span>
                <svg v-if="selectedDateRange && arrayEquals(selectedDateRange.value, option.value)" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="18px" fill="#2BE100">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
            </div>
        </template>

        <template #afterList>
            <div class="flex items-center justify-between px-2 pb-2 cursor-pointer custom-range-element">
                <VueDatePicker teleport-center ref="datePicker" :model-value="selectedDateRange ? selectedDateRange.value : null" :month-change-on-scroll="false" :clearable="false" :enable-time-picker="false" @update:model-value="handleChangeCustomRange" multi-calendars range vertical auto-apply no-today :teleport="true">
                    <template #trigger>
                        <div class="flex justify-between pl-1 py-1">
                            <span class="text-grey-darker">Custom Range</span>
                            <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="#red" height="24" width="24">
                                <path d="M9.4 18 8 16.6 12.6 12 8 7.4 9.4 6 15.4 12Z" />
                            </svg>
                        </div>
                    </template>
                </VueDatePicker>
            </div>
        </template>
    </VueMultiselect>
</div>
</template>

<script>
import moment from 'moment';
import VueDatePicker from '@vuepic/vue-datepicker';
import VueMultiselect from 'vue-multiselect';


import '@vuepic/vue-datepicker/dist/main.css';
export default {
    components: {
        VueMultiselect,
        VueDatePicker,
    },
    data() {
        return {
            customPosition:{ top: 0, left: 0 }, 
            selectedDateRange: null,
            date: null,
            dateRangeOptions: [{
                    label: "Today",
                    value: [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
                },
                {
                    label: "Yesterday",
                    value: [moment().subtract(1, 'days').format("YYYY-MM-DD"), moment().subtract(1, 'days').format("YYYY-MM-DD")]
                },
                {
                    label: "Last 7 Days",
                    value: [moment().subtract(6, 'days').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
                },
                {
                    label: "Last 30 Days",
                    value: [moment().subtract(29, 'days').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
                },
                {
                    label: "This Month",
                    value: [moment().startOf('month').format("YYYY-MM-DD"), moment().endOf('month').format("YYYY-MM-DD")]
                },
                {
                    label: "Last Month",
                    value: [moment().subtract(1, 'month').startOf('month').format("YYYY-MM-DD"), moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD")]
                },
            ],

        };
    },
    methods: {
        formatDateRange(dateObj) {
            this.date = this.selectedDateRange.value;
            return (dateObj && dateObj.length) ? `${moment(dateObj[0]).format('MMM DD, Y')} - ${moment(dateObj[1]).format('MMM DD, Y')}` : null;
        },
        arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        },
        handleChangeCustomRange(paasdata) {
            alert("Handle Custom")
            this.selectedDateRange = {
                label: "Custom Range",
                value: paasdata
            }
            this.$refs.multiselect.deactivate()
        },
        hide() {
            // Deactivate multiselect only if the click is outside the custom range
            this.$refs.multiselect.deactivate();
        }

    },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.dp--menu-wrapper{
    top:20% !important;
    left:40% !important
}

.multiselect__tag {
    background-color: white;
    font-size: 01rem;
}

.multiselect__tag:hover {
    background-color: white;
}

.multiselect__option--disabled {
    background: white;
    font-style: italic;
}

.multiselect__option--highlight {
    background-color: white;
    color: #444;
    font-size: 0.9rem;
    height: 1rem;
}

.multiselect__content {
    background: rgb(255, 255, 255);
    font-size: 0.9rem;
}

.multiselect__single {
    height: 0.8rem;
    font-size: 01rem;
}

.multiselect__tag {
    position: relative;
    display: inline-block;
    padding: 0.25rem 1.625rem 0.25rem 0.625rem;

    margin-right: 0.625rem;

    line-height: 1;

    margin-bottom: 0.5rem;
}
</style>
