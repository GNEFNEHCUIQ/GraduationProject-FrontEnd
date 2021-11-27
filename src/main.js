import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Router from 'vue-router'

Vue.prototype.axios = axios
Vue.config.productionTip = false

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:8081/";//后端处理了跨域处理，这里可以直接配置后端请求地址
//axios.defaults.baseURL = "svr";
axios.defaults.withCredentials = false; //不允许JS访问跨域的Cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.use(Router)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
