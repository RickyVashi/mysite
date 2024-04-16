<template>
<div class="chat-container">
    <div class="user-list">
        <h3>Online Users</h3>
        <div v-for="(user, index) in availableUsers" :key="index">
            <input type="checkbox" :value="user" v-model="selectedUsers">
            <label class="mx-2">{{ user.name }}</label>
        </div>
    </div>
    <div class="message-list">
        <div v-for="message in messages" :key="message.id" :class="{ 'message': true, 'sent': message.user === currentUser, 'received': message.user !== currentUser }">
            <div class="message-content">
                <p>{{ message.text }}</p>
                <span class="message-time">{{ formatTime(message.time) }}</span>
            </div>
        </div>
    </div>
    <div class="input-container">
        <input type="text" v-model="text" @keyup.enter="sendMessage" class="input-message" placeholder="Type your message...">
        <button @click="sendMessage" class="send-button">Send</button>
    </div>
</div>
</template>

  
<script>
// import io from 'socket.io-client';

export default {
    name: 'ChatApp',
    data() {
        return {
            currentUser: '',
            text: '',
            messages: this.$store.state.messages,
            availableUsers: [], // List of available users
            selectedUsers: [],
            socketInstance: null
        };
    },
    mounted() {
        this.currentUser = window.localStorage.getItem('email');
        this.socketInstance = this.$store.state.socketInstance;

        // Retrieve list of online users from the server
        this.socketInstance.on('userList', (users) => {
            this.availableUsers = users.filter(user => user.email !== this.currentUser);
            console.log(this.availableUsers);
        });
        const email = window.localStorage.getItem('email');
        const name = window.localStorage.getItem('user');

        // Emit a custom event to notify the server of successful login
        this.socketInstance.emit('join', {
            email: email,
            name: name
        });

    },
    methods: {
        sendMessage() {
            const message = {
                id: new Date().getTime(),
                text: this.text,
                user: this.currentUser,
                time: new Date(),
                recipients: this.selectedUsers
            };
            this.messages.push(message);
            this.socketInstance.emit('privateMessage', message);
            this.text = '';
        },
        formatTime(time) {
            return new Date(time).toLocaleTimeString();
        }
    }
};
</script>

  
<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.user-list {
    padding: 10px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #ccc;
}

.user-list h3 {
    margin-bottom: 5px;
}

.user-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-list li {
    margin-bottom: 5px;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.message {
    max-width: 70%;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
}

.sent {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
}

.received {
    align-self: flex-start;
    background-color: #f2f2f2;
    color: black;
}

.message-content {
    display: flex;
    flex-direction: column;
}

.message-time {
    font-size: 12px;
    color: #666;
    align-self: flex-end;
}

.input-container {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
}

.input-message {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.send-button {
    margin-left: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
