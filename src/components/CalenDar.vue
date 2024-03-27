<template>
<div>
    <ComponentName name="My Attendance" />
    <div v-if="!attendanceTakenToday && !showCalendar" class="flex mx-10 h-full">
        <p class="flex-grow"><span class="font-bold text-2xl align-left">{{user}}</span> Give Today's Attendance</p>
        <!-- Buttons for marking present or absent -->
        <div class="flex items-center">
            <button @click="markAttendance(true)" class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Present</button>
            <button @click="markAttendance(false)" class="bg-red-500 text-white px-4 py-2 rounded-md">Absent</button>
        </div>
    </div>

    <!-- Calendar component -->
    <div class="pl-2  pr-2 md:mx-10 shadow-lg" v-if="showCalendar">
        <VCalendar :attributes="calendarAttributes" expanded min-date="2024-01-10" max-date="2024-04-22" :initial-page="{ month: 3 ,  year : 2024}" />
    </div>
</div>
</template>

<script>
import ComponentName from './ComponentName.vue';

export default {
    components: {
        ComponentName
    },
    data() {
        return {
            showCalendar: false,
            attendanceRecords: [],
            today: new Date().toISOString().slice(0, 10),
            monthName: null, // Get today's date in "YYYY-MM-DD" format
            token: null,
            attendanceTakenToday: null,
            user: null
        };
    },
    mounted() {

        this.user = window.localStorage.getItem('user')

        this.fetchAttendanceRecords();

    },
    computed: {
        calendarAttributes() {
            const publicHolidays = ['2024-01-26', '2024-01-22'];
            return this.attendanceRecords.map(record => {
                let highlightColor;
                let fMode;
                const isPublicHoliday = publicHolidays.some(holiday => holiday === record.date);
                if (record.present === true) {
                    highlightColor = 'green';
                    fMode = 'light';
                } else if (record.present === false) {
                    highlightColor = 'red';
                    fMode = 'light';
                } else {
                    highlightColor = 'yellow';
                    fMode = 'solid';
                }
                if (isPublicHoliday) {
                    highlightColor = 'blue';
                    fMode = 'solid';
                }
                return {
                    key: record.date,
                    highlight: {
                        color: highlightColor,
                        fillMode: fMode
                    },
                    dates: new Date(record.date)
                };
            });
        }
    },
    methods: {
        async markAttendance(present) {
            if (!this.attendanceTakenToday) {
                const attendanceRecord = {
                    date: this.today,
                    present
                };
                try {
                    await this.$axios.post('http://localhost:1600/add', attendanceRecord);
                    console.log('Attendance record sent successfully');
                    this.attendanceTakenToday = true;
                    this.showCalendar = true;
                    location.reload();

                    this.fetchAttendanceRecords();
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        window.localStorage.clear();
                        window.reload();
                    } else {
                        console.error("Error:", error);
                    }
                }
            } else {
                alert("Attendance for today has already been taken.");
            }
        },
        async fetchAttendanceRecords() {
            try {

                const response = await this.$axios.get('http://localhost:1600/dates');
                this.attendanceRecords = response.data;
                this.attendanceTakenToday = this.attendanceRecords.some(record => record.date === this.today);
                
                window.localStorage.setItem('flag', 'true');

                if (this.attendanceTakenToday) {
                    this.showCalendar = true; // Show calendar if attendance is already taken
                }
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

<style>
.vc-container .vc-weekday-1 {
    color: #6366f1;
}
</style>
