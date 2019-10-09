import axios from 'axios'


import message from '../../message'

//axios.defaults.timeout = 2000
// axios.defaults.baseURL = process.env // 环境 本地发送方的url环境 这个环境怪怪的

axios.interceptors.request.use(

  config => { // 做判断 如果有token就发送token 这里应该判定vuex内的状态
    let token = sessionStorage.getItem('authorization');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },

  error => {
    console.log('超时错误在这里吗', error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => { // 回复信息配置 code！=200
    // 还要其他的方法获得权限吗 这样是否有一些缺陷
    if (response.data.code == 3001) { // 没有登录 token失效
      sessionStorage.removeItem('authorization')
      window.vm.$store.dispatch('logout')
      //window.vm.$router.push('/login')
      message.error(response.data.msg);
      console.log('未登录')
      console.log('当前页面路径', window.vm.$route.path)
    }
    if ( response.data.code == 3003) { //  token失效
      sessionStorage.removeItem('authorization')
      window.vm.$store.dispatch('logout')
      window.vm.$router.push('/login')
      message.error(response.data.msg);
      console.log('拦截器')
      console.log('当前页面路径', window.vm.$route.path)
    }
    if (response.data.code == 3004) { // 已被挤下线
      sessionStorage.removeItem('authorization')
      window.vm.$store.dispatch('logout')
      window.vm.$router.push('/login') // 进入404页面Or权限不够页面
      console.log('token是否清楚')
      message.error(response.data.msg);
    }

    return response
  },
  error => {
    console.log(error)
    console.log(error.message.indexOf('Network'))
   
    console.log('状态吗',error.response)
    console.log('超时错误吗', typeof (error), error.message); //console : Error: Request failed with status code 402
    
    
  },
)


