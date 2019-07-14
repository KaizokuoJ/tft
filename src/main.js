import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMq from 'vue-mq'

Vue.use(BootstrapVue)
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 99999
  },
  defaultBreakpoint: 'sm' // customize this for SSR
});

Vue.config.productionTip = false

window.Intercom("boot", {
  app_id: "ywbnhge7"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
