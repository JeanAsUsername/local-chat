import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: {
        token: null,
        login: false
    },

    mutations: {
        setToken(state, token) {
            state.token = (token || null)
        },
        setStatus(state, login) {
            state.login = (login || false)
        }
    }
})