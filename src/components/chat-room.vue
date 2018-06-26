
<template>

    <main>
        <vue-header class="main__header"></vue-header>
        <section class="main__content">
            <section class="content__first">
                <h1 class="first__title">Chat</h1>
                <chat @message="sendMessage">
                    <template slot="users">
                        <ul class="users__list" >
                            <li v-for="user in users" :key="user.id" :style="{color: user.color}" v-if="users"><span>{{user.username}}</span></li>
                        </ul>
                    </template>
                    <template slot="messages">
                        <ul class="messages__list">
                           <li v-for="message in messages" :key="message.id">
                               <span class="username" :style="{color: message.color}">{{message.username}}:</span><span class="message">{{message.content}}</span>
                            </li>
                        </ul>
                    </template>
                </chat>
            </section>
        </section>
        <vue-footer class="main__footer"></vue-footer>
    </main>
    
</template>

<script>
// import components
import vueHeader from './sub-components/header.vue'
import chat from './sub-components/chat.vue'
import vueFooter from './sub-components/footer.vue'
// Sockets // Firebase
import chatSocket from '../mixins/chatSocket'
// api
import api from '../services/api'

export default {

    data() {
        return {
            myUser: localStorage['user'] ? JSON.parse(localStorage['user']) : undefined,
            users: [],
            messages: []
            // io prop is set in the created lifecycle
        }
    },

    components: {
        vueHeader,
        chat,
        vueFooter
    },

    methods: {

        sendMessage(message) {
            // send the message to the server
            if (!this.$store.state.login) return
            this.io.emit('message', {
                userId: this.myUser['id'],
                content: message, 
                createAt: Date.now()
            }, this.myUser['username'], this.myUser['color'])

        }

    },

    mixins: [chatSocket]

}
</script>

<style lang="scss" scoped>

// import stylesheets
@import './css/main';

main {

    display: grid;
    grid-template-areas:
    "header"
    "content"
    "footer";
}

.main__header {

    grid-area: header
}

.main__content {

    display: grid;
    grid-area: content;
    grid-template-areas:
    "chat";
}
//padding
.content__first {
    grid-area: chat;
    display: flex;
    height: min-content;
    min-height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    background-color: $normal-black;
}

.first__title {

    color: $normal-white;
    font-family: $ubuntu;
    font-size: 30px;
}

.main__footer {

    grid-area: footer;
}

@media screen and (max-width: 800px) {

    .content__first {
        min-height: 90vh;
        padding-top: 50px;
    }
    
}



</style>
