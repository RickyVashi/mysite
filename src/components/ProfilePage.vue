<template>
<div id="algn">
    <div id="card">
        <div id="upper-bg">
            <img src="https://th.bing.com/th/id/R.db989291b2539b817e46ad20d4947c36?rik=5AQ%2b6OG1VA05yg&riu=http%3a%2f%2fgetdrawings.com%2ffree-icon%2fcool-profile-icons-70.png&ehk=qe8q701EM70pD%2b3qlduqUPsiVZbx8Uqjo%2fE5hU%2f9G%2fc%3d&risl=&pid=ImgRaw&r=0" alt="profile-pic" class="profile-pic">
        </div>
        <div id="lower-bg">
            <div class="text">
                <div class="flex flex-row justify-center items-center">
                    <div class="relative">
                        <p v-if="!isEditing" class="name">{{ name }}</p>
                        <input type="text" v-else v-model="name" @keyup.enter="saveName" class="name-input border rounded-md px-3 py-2 mb-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
                    </div>
                </div>
                <div class="flex flex-row justify-center items-center">
                    <div class="relative">
                        <p v-if="!isEditing" class="title">{{ email }}</p>
                        <input type="text" v-else v-model="email" @keyup.enter="saveName" class="name-input border rounded-md px-3 py-2 mb-2 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
                    </div>
                </div>
                <button @click="isEditing = !isEditing" class="edit-button my-3">
                    <span v-if="!isEditing" class="px-2 my-4 py-1 mt-4 rounded-md font-medium text-lg bg-blue-300">Edit</span>
                    <span v-else @click="saveName" class="px-2 py-1 my-4 rounded-md font-medium text-lg bg-green-300">Save</span>
                </button>
            </div>
            <div id="icons">
                <a href="#" class="ico"><img width="48" height="48" src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new" /></a>
                <a href="#" class="ico">
                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/github.png" alt="github" />
                </a>
                <a href="#" class="ico">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin" />
                </a>
                <a href="#" class="ico">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new" />
                </a>
            </div>
            <div id="btn">
                <button class="msg">Subscribe</button>
                <button class="msg">Message</button>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            email: null,
            isEditing: false,

        }
    },
    mounted() {
        this.name = window.localStorage.getItem('user');
        this.email = window.localStorage.getItem('email');
    },
    methods:{
        saveName() {
        
        const obj = {
            name: this.name,
            email: this.email,

        }
        this.$axios.post(`${this.$URL}/editProfile`, obj)
        .then(response => {
                console.log(response);
                window.localStorage.setItem("user",this.name);
                window.localStorage.setItem("email",this.email);
            })

            .catch(error => {
                if (error.response && error.response.status === 401) {
                    window.localStorage.clear();
                    location.reload();
                } else {
                    console.error("Error:", error);
                }
            });
    }
    }
    

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
}

#algn {
    height: 92vh;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#card {
    width: 370px;
    height: 435px;
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 #E7E9EB, 0 6px 20px 0 #E7E9EB;
}

#upper-bg {
    width: 100%;
    height: 35%;
    background-color: #9AD0C2;
    display: flex;
    justify-content: center;
    position: relative;
}

.profile-pic {
    width: 35%;
    background-color: white;
    border: 3px solid #9AD0C2;
    border-radius: 50%;
    padding: 3px;
    position: absolute;
    top: 40px;
}

#lower-bg {
    width: 100%;
    height: 65%;
}

.text {
    text-align: center;
    padding-top: 35px;
}

.text .name {
    font-weight: 600;
    font-size: large;
    padding: 0;
    margin: 5px;
}

.text .title {
    padding: 0;
    margin: 0;
    font-size: 15px;
}

#icons {
    display: flex;
    justify-content: center;
    margin: 15px;
}

#icons img {
    width: 80%;
    height: 90%;
}

.ico {
    display: flex;
    justify-content: center;
    align-items: center;
}

#btn {
    display: flex;
    justify-content: center;
    margin: 15px;
}

#btn button {
    margin: 0 20px;
    padding: 10px 15px;
    background-color: #9AD0C2;
    border: none;
    border-radius: 50px;
    font-weight: 700;
}

#btn button:hover {
    box-shadow: 0 4px 8px 0 #E7E9EB, 0 6px 20px 0 #E7E9EB;
}

#l-c-s {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px 10px;
}

#l-c-s .num {
    display: flex;
}

#l-c-s .dvr {
    width: 2px;
    height: 25px;
    background-color: gray;
}

#l-c-s img {
    width: 24px;
    height: 24px;
}

.license {
    font-size: 12px;
    text-align: center;
}

.license .ll {
    padding: 0 10px;
    display: inline;
}
</style>
