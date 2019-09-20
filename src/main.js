import Vue from 'vue'
import App from './App.vue'
import '../src/common/css/reset.css'
import '../src/common/css/common.css'
import '../src/common/scss/index.scss'
import router from './router'
import store from '../src/store/store'
import '../src/common/font/iconfont.css'
import './permission' 
import '@/request/api/http'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//css
import ElementUI from 'element-ui'
Vue.use(ElementUI) // 注册插件
import 'element-ui/lib/theme-chalk/index.css'

import './common/css/zyf.css'
import messageFix from './message'
Vue.prototype.messageFix = messageFix

window.vm=new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
