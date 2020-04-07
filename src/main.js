import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'n-zepto'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wx from 'weixin-jsapi'



Vue.prototype.$http = axios;
Vue.use(VueAxios,axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
