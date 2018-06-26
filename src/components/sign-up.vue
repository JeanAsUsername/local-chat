
<template>
    
    <main>
        <vue-header class="main__header"></vue-header>
        <section class="main__content">
            <vue-form 
            class="content__first" 
            :fields="fields"
            @submit="createUser" 
            operation="Sign up" 
            colorField="#5980a6"
            :server-err="serverErr"></vue-form>
        </section>
        <vue-footer class="main__footer"></vue-footer>
    </main>
    
</template>

<script>
// import components
import vueHeader from './sub-components/header.vue'
import vueFooter from './sub-components/footer.vue'
import vueForm from './sub-components/form.vue'
// import services
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
                        name: 'username',
                        value: ''
                    },
                    label: 'Username',
                    type: 'text',
                    autocomplete: 'off'
                },
                {
                    model: {
                        name: 'email',
                        value: ''
                    },
                    label: 'Email',
                    type: 'email',
                    autocomplete: 'off',
                },
                {
                    model: {
                        name: 'password',
                        value: ''
                    },
                    label: 'Password',
                    type: 'password',
                    autocomplete: 'off'
                }
            ],
            serverErr: false
        }
    },

    components: {
        vueHeader,
        vueForm,
        vueFooter
    },

    methods: {
        createUser(credentials) {
            api
            .createUser(credentials)
            .then(res => {
                
                if (res.data.serverError) {
                    return this.serverErr = true // Server error
                }

                /* when a error occurs, will delete a input from here, to the final
                 the inputs that remain are valid, and will be cleaned */
                let inputs = ['username', 'email', 'password']

                if (res.data.runValidate) {
                    
                    res.data.errors
                    .forEach(e => {
                        if (e.errorType === 'EAIU') {

                            const span = document.querySelector(`span[data-err="${e.input}"]`)
                            inputs.splice(inputs.indexOf(e.input), 1) // delete te the respective input from inputs
                            span.textContent = ' - Email already in use'
                            span.classList.add('err')

                        } else if (e.errorType === 'username') {
                            const span = document.querySelector(`span[data-err="${e.input}"]`)
                            inputs.splice(inputs.indexOf(e.input), 1) // delete te the respective input from inputs
                            span.textContent = ' - Invalid username'
                            span.classList.add('err')

                        } else if (e.errorType === 'email') {
                            // verify that the error 'EAIU' don't exits
                            let cancel = res.data.errors.some(val => {
                                return val.errorType === 'EAIU'
                            })
                            if (cancel) return
                            // execute the email error
                            const span = document.querySelector(`span[data-err="${e.input}"]`)
                            inputs.splice(inputs.indexOf(e.input), 1) // delete te the respective input from inputs
                            span.textContent = ' - invalid email'
                            span.classList.add('err')

                        } else if (e.errorType === 'password') {
                            const span = document.querySelector(`span[data-err="${e.input}"]`)
                            inputs.splice(inputs.indexOf(e.input), 1) // delete te the respective input from inputs
                            span.textContent = ' - invalid password'
                            span.classList.add('err')
                        } 

                    })
                }

                // clear the valid inputs
                if (inputs.length > 0) {

                    inputs.forEach(i => {
                        const span = document.querySelector(`span[data-err=${i}]`)
                        span.textContent = ''
                        span.classList.remove('err')
                    })

                }

                if (res.data.userInfo) {

                    const commingUser = res.data.userInfo,
                        user = {
                        id: commingUser.userId,
                        username: commingUser.username,
                        email: commingUser.email,
                        color: commingUser.color
                    }
                    // register to firebase
                    firebaseAuth.createUserWithEmailAndPassword(user.email, credentials.password)
                    .then(() => {
                        this.$store.commit('setStatus', true)
                        localStorage.setItem('user', JSON.stringify(user))
                        this.$router.push('/')
                    })
                    .catch(err => {
                        return this.serverErr = true
                    })

                }
               
            })
            .catch(err => {

            })

            
        }
 

    },
}
</script>

<style lang="scss">

//import styles
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


span[data-err="username"],
span[data-err="email"], 
span[data-err="password"] {
    display: none;
}

span[data-err="username"].err,
span[data-err="email"].err, 
span[data-err="password"].err {

    display: inline;
    padding-left: 4px;

    color: rgba(255, 0, 0, 0.8);
}

</style>
