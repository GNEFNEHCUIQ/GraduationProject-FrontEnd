import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Router from 'vue-router'
import global_ from './global/global.vue'
import "@/static/global.css"

/*quill 富文本编辑器*/
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)




import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {initMenu} from "./utils/menus";

Vue.use(ElementUI);

Vue.prototype.global = global_
Vue.prototype.axios = axios
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:8081/";//后端处理了跨域处理，这里可以直接配置后端请求地址
//axios.defaults.baseURL = "svr";
axios.defaults.withCredentials = false; //不允许JS访问跨域的Cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

Vue.use(Router)

router.beforeEach((to,from,next)=>{
  if (window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store)
    next()
  } else {
    //如果不登陆，就让他去登录页面，判断目标路由是否是登录界面
    if (to.path === '/login' ) {
      // 访问的登录页，直接跳转
      next();
    }else if( to.path === '/register'){
      next();
    } else if (to.path === '/' ){
      next('/login' );
    }else {
      // 访问的其他界面，先登录在跳转到之前想访问但是没进去的页面
      //next('/login')
      next('/login?redirect=' + to.path);
    }
  }
    /*initMenu(router,store)*/
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
