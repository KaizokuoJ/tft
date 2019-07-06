import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

window.Intercom("boot", {
  app_id: "u877z778"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
