

<template>
    
    <main>
        <vue-header class="main__header"></vue-header>
        <section class="main__content">
            <vue-form class="content__first" 
            :fields="fields" 
            operation="Update" 
            :colorField="color"
            @submit="updateUser">
                <template slot="options">
                    <input type="button" value="delete account" class="delete" @click="confirmDelete = true">
                    <!--//////////////////// DELETE ////////////////////-->
                    <p class="options__error" v-if="error">{{errorMessage}}</p>
                    <input 
                    type="text" 
                    placeholder="Enter your username" 
                    class="options__enterUsername"
                    v-model="userToDelete"
                    v-if="confirmDelete">
                    <div class="options__select" v-if="confirmDelete">
                        <input type="button" value="confirm" @click="deleteUser">
                        <input type="button" value="cancel" @click="confirmDelete = false">
                    </div>
                    <!--////////////////////////////////////////////////-->
                </template>
            </vue-form>
        </section>
        <vue-footer class="main__footer"></vue-footer>
    </main>
    
</template>

<script>
// import components
import vueHeader from './sub-components/header.vue'
import vueFooter from './sub-components/footer.vue'
import vueForm from './sub-components/form.vue'
// mixins
import profileSocket from '../mixins/profileSocket'
// firebase
import firebase from '../services/firebase'

const firebaseAuth = firebase.auth()

export default {

    data() {
        return {
            fields: [
                {
                    model: {
                        name: 'email',
                        value: JSON.parse(localStorage['user']).email
                    },
                    label: 'Email',
                    type: 'email',
                    autocomplete: '',
                },
                {
                    model: {
                        name: 'username',
                        value: JSON.parse(localStorage['user']).username
                    },
                    label: 'Username',
                    type: 'text',
                    autocomplete: 'off'
                }
            ],
            confirmDelete: false,
            error: false,
            errorMessage: '',
            userToDelete: ''
        }
    },

    methods: {

        updateUser(credentials) {
            this.io.emit('updateUser', this.myUser.id, credentials)
        },

        deleteUser() {
            
            if (this.userToDelete !== this.myUser.username) {
                
                this.errorMessage = 'Invalid username'
                return this.error = true
            }
            
            this.invalidUsername = false
            // let's wrap the user in firebase
            const user = firebaseAuth.currentUser
            // delete user the firebase user
            user.delete()
            .then(() => {

                // delete the mongodb user
                this.io.emit('deleteUser', this.myUser.id)
            })
            .catch(e => {
                this.errorMessage = 'Sign in and try again'
                this.error = true
            })
           
        }

    },
    
    watch: {
        confirmDelete(newState, oldState) {
            if (newState === false) {

                this.error = false
                this.errorMessage = ''
            }
        }
    },

    components: {
        vueHeader,
        vueForm,
        vueFooter
    },

    mixins: [profileSocket]

}
</script>

<style lang="scss" scoped>

//import stylesheets
@import './css/main';

main {

    display: grid;
    grid-template-areas:
    "header"
    "content"
    "footer";
}

.main__header {

    grid-area: header;

}

.main__content {

    display: grid;
    grid-area: content;
    grid-template-areas:
    "first-content";
}

.content__first {

    grid-area: first-content;
}



.main__footer {

    grid-area: footer;

}

.delete,
.options__select > input {

    font-weight: 600;
    font-size: 14px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
}

.delete,
.options__select > input,
.options__enterUsername {
    margin-bottom: 12px;
}

.delete {
    
    padding: 4px 8px;
    transition: all 300ms;
    border: 2px solid rgb(128, 0, 0);

    color: white;
    background-color: rgb(230, 0, 0);

    &:hover {
        color: rgb(230, 0, 0);
        background-color: white;
    }
}

.options__select {
    
    display: flex;
    width: 100%;
    justify-content: space-around;

    & > input {
        height: fit-content;
        width: fit-content;
        padding: 4px 8px;
        transition: all 300ms;
        border: none;

        color: $normal-black;
        background-color: $normal-white;
    }

    & > input:hover {
        background-color: rgb(180, 180, 180)
    }
}

.options__error {
    padding-bottom: 5px;

    color: rgba(255, 0, 0, 0.8);
    font-family: $roboto;
    font-size: 15px;
}


.options__enterUsername {
    padding: 5px;

    font-family: $roboto;
}


</style>
