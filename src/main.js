import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
new Vue({
    el: '#app',
    render: h => h(App)
})