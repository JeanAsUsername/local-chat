

<template>
    
    <main>
        <vue-header class="main__header"></vue-header>
        <section class="main__content">
            <vue-form 
            class="content__first" 
            @submit="checkUser" 
            :fields="fields" 
            operation="Sign in"
            :credentials-err="credentialsErr"
            :server-err="serverErr">
            
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
// import api
import api from '../services/api'
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
                        value: ''
                    },
                    label: 'Email',
                    type: 'email',
                    autocomplete: '',
                },
                {
                    model: {
                        name: 'password',
                        value: ''
                    },
                    label: 'Password',
                    type: 'password',
                    autocomplete: 'off'
                },
            ],
            credentialsErr: false,
            serverErr: false
        }
    },

    methods: {
        checkUser(credentials) {
            api
            .checkUser(credentials)
            .then(res => {

                if (res.data.serverError) return this.serverErr = true // Server error
                if (!res.data.login) return this.credentialsErr = true
                
                firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(() => {
                    this.$store.commit('setStatus', res.data.login)
                    const user = {
                        id: res.data.userId,
                        username: res.data.username,
                        email: res.data.email,
                        color: res.data.color
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    this.$router.push('/')
                })
                .catch(err => {
                    return this.serverErr = true
                })

            })
            .catch(err => {
                this.serverErr = true
            })
        }
    },

    components: {
        vueHeader,
        vueForm,
        vueFooter
    }
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

</style>
