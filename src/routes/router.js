import Vue from 'vue'
import VueRouter from 'vue-router'
// components
import home from './../components/home'
import signup from './../components/sign-up'
import signin from './../components/sign-in'
import chatRoom from './../components/chat-room'
import profile from './../components/profile'
// api
import api from '../services/api'
//store
import store from '../store'
// firebase
import firebase from '../services/firebase'

const firebaseAuth = firebase.auth()

Vue.use(VueRouter)
// Promises
const Access = () => new Promise((resolve, reject) => {

    // here we set the csrf token
        api
        .getAccess()
        .then(res => {
            if (!res.data) return resolve(false)
            store.commit('setToken', res.data.token)
            return resolve(true)
        })
        .catch((err) => {
            return resolve(false)
        })
    })
// Functions
function Logged() {
    // true if the user is logged
    if (!store.state.login) return false
    return true
}

function Logout() {
    // true if the user is logout
    if (store.state.login) return false
    return true
}

// Router
const Router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/signup',
            name: 'signup',
            component: signup,
            beforeEnter: (to, from, next) => {
                // if the user is logged or have token can't access to this route
                // if is logout then we get the csrf token
                const logout = Logout()
                if (!logout) return next('/')
                Access()
                .then(res => {
                    if (!res) return next('/')
                })
                return next()
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: signin,
            beforeEnter: (to, from, next) => {
                // if the user is logged or have token can't access to this route
                // if is logout then we get the csrf token
                const logout = Logout()
                if (!logout) return next('/')
                Access()
                .then(res => {
                    if (!res) return next('/')
                    return next()
                })
            }
        },
        {
            path: '/chat',
            name: 'chat-room',
            component: chatRoom
        },
        {
            path: '/profile',
            name: 'profile',
            component: profile,
            beforeEnter: (to, from, next) => {
                // same behavior than before
                const logged = Logged()
                if (!logged) return next('/signin')
                Access()
                .then(res => {
                    if (!res) return next('/')
                    return next()
                })
            }
        }
    ]
})

Router.beforeEach((to, from, next) => {
    api
    .login()
    .then(res => {
        store.commit('setStatus', res.data.login)
        if (!res.data.login) {

            if (localStorage['user']) localStorage.removeItem('user')
            next()
            
        } else if (!localStorage['user']) {

            firebaseAuth.signOut()
            .then(() => {
                api
                .logout()
                .then(res => {
                    store.commit('setStatus', res.data.login)
                    next('/signin')
                })
            })

        } else {
            next()
        }

    })
})

export default Router