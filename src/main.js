import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
