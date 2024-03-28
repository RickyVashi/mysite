<template>
<div class="w-full h-screen flex justify-center items-center bg-[#222431]">
    <main>
        <div class="left-side"></div>
        <div class="right-side">
            <h4 class="text-2xl mb-2">Sign Up</h4>
            <div class="or"></div>

            <label for="fullName">Full Name</label>
            <input type="text" placeholder="Enter Full Name" v-model="name" name="name" required />

            <label for="email">Email</label>
            <input type="text" placeholder="Enter Email" v-model="email" name="email" required />

            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password" v-model="password" name="password" required />

            <!-- Add additional fields as needed -->

            <button type="submit" class="login-btn" @click="hideSignUp">Sign up</button>
            <div class="links">
                <a href="/login">Already have an account? Log in</a>
            </div>
        </div>
    </main>

</div>
</template>

<script>
import router from '../router/route'
import axios from 'axios'

export default {
    data() {
        return {
            name: null,
            email: null,
            password: null,

        }
    },
    methods: {
        async hideSignUp() {

            const user = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            try {
                const obj = await axios.post(`${this.$URL}/register`, user)
                console.log(obj);

                this.$vs.notify({
                    color: 'success',
                    position: 'top-right',
                    title: `Congretulations`,
                    text: `${obj.data}`
                })

                router.push('/login');

            } catch (error) {
                if (error.response) {
                    this.$vs.notify({
                        color: 'danger',
                        position: 'top-right',
                        title: 'Error',
                        text: error.response.data.message // Display the error message received from the server
                    })
                }
            }

        },
        login() {
            router.push('/login')
        }
    }
}
</script>

<style scoped>
/* Add your existing styles here */
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");


/* Snow */

#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
}

main {
    display: grid;
    grid-template-columns: 45% 55%;
    place-items: center;
    background: #f6f6f6;
    width: min(700px, 95%);
    border-radius: 20px;
}

/* Left Side */

.left-side {
    height: 100%;
    width: 100%;
    background-image: url(https://ih1.redbubble.net/image.3775529279.3375/hj,750x-pad,750x1000,f8f8f8.u1.jpg);
    background-repeat: no-repeat;
    background-size: 150%;
    background-position: center;
    pointer-events: none;
    border-radius: 20px 0 0 20px;
    overflow: hidden;
    transition: background-size 0.3s ease;
}

.left-side:hover {
    background-size: 250%;
    /* Adjust the background size for the zoom effect */
}

/* Right Side */

.right-side {
    padding: 60px;
}

/* Button Group */

.btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    margin-bottom: 32px;
}

.btn-group .btn {
    display: flex;
    align-items: center;
    column-gap: 4px;
    width: max-content;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 8px 6px;
    border: 2px solid #6b7280;
    border-radius: 5px;
    background-color: #f6f6f6;
    transform: scale(1);
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.5s, color 0.5s;
}

.btn-group .btn:focus {
    transform: scale(0.97);
}

.btn-group .btn:hover {
    background-color: #000;
    color: #eee;
}

.btn img {
    width: 16px;
    height: 16px;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f6f6;
    border-radius: 50%;
    padding: 2px;
}

/* OR */

.or {
    position: relative;
    text-align: center;
    margin-bottom: 24px;
    font-size: 1rem;
    font-weight: 600;
}

.or::before,
.or::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 50%;
    height: 1px;
    background: #000;
}

.or::before {
    left: 0;
}

.or::after {
    right: 0;
}

/* Inputs and Labels */

input {
    width: 100%;
    padding: 12px 20px;
    border: 2px solid #ccc;
    outline: 0;
    border-radius: 5px;
    background-color: transparent;
    margin: 4px 0 18px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.5s;
}

input:focus {
    border: 2px solid #000;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: #000;
    transition: background-color 5000s ease-in-out 0s;
}

label {
    font-weight: 600;
    font-size: 0.9rem;
}

/* Login Button */

.login-btn {
    width: 100%;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 24px;
    margin: 12px 0 24px;
    border: 2px solid #6b7280;
    border-radius: 5px;
    background-color: #f6f6f6;
    cursor: pointer;
    transition: all 0.5s;
}

.login-btn:hover {
    background-color: #000;
    color: #eee;
}

/* Links */

.links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

a:link,
a:visited,
a:hover,
a:active {
    text-decoration: none;
}

a {
    color: #000;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -1px;
    transition: all 0.4s ease;
}

a:hover {
    color: rgb(13, 133, 185);
}

/* Additional style for flash messages */
.flash-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}
</style>
