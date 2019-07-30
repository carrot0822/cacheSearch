import Vue from 'vue'
import App from './App.vue'
import '../src/common/css/reset.css'
import '../src/common/css/common.css'
import '../src/common/scss/index.scss'
import router from './router'
import store from '../src/store/store'


import './permission' 
import '@/request/api/http'


//css
import ElementUI from 'element-ui'
import i18n from './lang/index.js'
Vue.use(ElementUI) // 注册插件
import 'element-ui/lib/theme-chalk/index.css'

import './common/css/zyf.css'


window.vm=new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
