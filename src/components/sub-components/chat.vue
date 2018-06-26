
<template>
    <div class="first__chat">
        <div>
            <div class="chat__panel">
                <div class="panel__users">
                    <slot name="users"></slot>
                </div>

                <div class="panel__messages">
                    <slot name="messages"></slot>
                </div>  
            </div>

            <form class="chat__form" @submit.prevent="submit">

                <input type="text" class="form__message" disabled v-if="!login">
                <input type="text" class="form__message" v-model="message" v-else>

                <div class="form__disabled">
                    <p>Sign in to use the chat.</p>
                </div>

                <router-link v-if="!login" to="/signin" class="form__send">Send</router-link>
                <input type="submit" class="form__send" value="Send" v-else> 

            </form>
         </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            login: this.$store.state.login,
            message: ''
        }
    },

    methods: {
        submit() {
            // send message and clear the input
            this.$emit('message', this.message)
            this.message = ''
        }
    },

    // scroll down
    updated() {
        const messagesPanel = document.querySelector('.panel__messages')
        messagesPanel.scrollTop = messagesPanel.scrollHeight
    }
    
}

</script>

<style lang="scss">

//import styles
@import '../css/main';

// padding
.first__chat {
    height: min-content;
    min-height: 60vh;
    width: 100%;
    max-width: 800px;
    padding: 10px;

    & > div {
        height: 100%;
        width: 100%;
        border:  2px solid $normal-white;
    }
}

.chat__panel {

    display: flex;
    height: 55vh;
    min-height: 300px;
    width: 100%;
}

.chat__form {
    position: relative;
    display: flex;
    height: 40px;
    width: 100%;

}

.form__disabled {
    display: none;
}

// input padding
.form__message {
    position: relative;
    width: 80%;
    padding: 5px;
    border: none;

    color: white;
    background-color: $normal-black;
    font-size: 18px;
    box-shadow: 
    -1px 0 5px $normal-white inset;

    &[disabled] + .form__disabled {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 75%;
        color: rgb(255, 29, 18);
        font-family: $ubuntu;
        font-weight: 800;
        text-align: center;
    }

    &:focus {
        background-color: rgb(22, 22, 22);
        outline: none;
    }

}

.form__send {

    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    border: none;

    color: $normal-white;
    background-color: $normal-black;
    font-family: $roboto;
    font-size: 18px;
    text-decoration: none;
    transition: all 150ms;
    cursor: pointer;
    box-shadow: 
    0.1px 0.1px 5px $normal-white inset;

    &:hover {
        color: white;
        background-color: rgb(25, 25, 25);
    }

}
// padding(m)
.panel__users {

    display: flex;
    justify-content: center;
    width: 20%;
    height: 100%;
    padding-top: 10px;
    box-shadow: 
    0 -1px 5px $normal-white inset;
    order: 2;

    background-color: $normal-black;

    & li {
        color: $normal-white;
        font-family: $roboto;
        list-style: none;
    }

    & li::before {
        content: '•';
        padding-right: 8px;
        color: inherit;
        
    }
}
// padding
.panel__messages {
    width: 80%;
    padding: 10px;
    box-shadow: 
    -1px -1px 5px $normal-white inset;
    order: 1;
    overflow-y: scroll;

    & li {
        margin-bottom: 5px;

        color: white;
        list-style: none;
        white-space: none;
    }

    & .username {
        color: orange;
        font-family: $roboto;
    }

    & .message {
        font-family: $ubuntu;
        padding-left: 3px;
    }
    
}

.users__list {
    
    & span {
        color: white;
    }
    
}

@media screen and (max-width: 700px) {

    .chat__panel {
        flex-direction: column;
    }

    .panel__messages {
        width: 100%;
        height: 80%;
        border-top: none;
        order: 2;
    }

    .panel__users {
        width: 100%;
        height: 20%;
        padding-left: 10px;
        padding-top: 0;
        justify-content: flex-start;
        align-items: center;
        order: 1;

    }

    .form__message {
        width: 75%;
    }

    .form__send {
        width: 25%;
    }
}

 

</style>
