
// modules
import axios from 'axios'
//store
import store from '../store'

// process connections
const process = axios.create({
    baseURL: 'https://salty-sierra-26198.herokuapp.com/process',
    withCredentials: true
})
// normal connections
const normal = axios.create({
    baseURL: 'https://salty-sierra-26198.herokuapp.com',
    withCredentials: true
})

export default {
    // process instance
    getAccess() {
        return process.get('/getaccess')
    },

    setHeader() {
        process.defaults.headers['X-CSRF-TOKEN'] = store.state.token
    },

    removeHeader() {
        process.defaults.headers['X-CSRF-TOKEN'] = ''
    },

    createUser(credentials) {
        this.setHeader()
        return process
        .post('/createuser', credentials)
        .then(res => {
            this.removeHeader()
            return res
        })
    },

    checkUser(credentials) {
        this.setHeader()
        return process
        .post('/checkuser', credentials)
        .then(res => {
            this.removeHeader()
            return res
        })
    },
    // check if the user is logged
    login() {
        return process.get('/login')
    },
    // logout the user
    logout() {
        return process.get('logout')
    },

    // ------------------ normal instance ----------------
    getMessages() {
        return normal.get('getmessages')
    }

}