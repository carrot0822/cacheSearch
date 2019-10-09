import router from './router'
import store from '../src/store/store'

import {
    getToken
} from '@/common/js/util'
import messageFix from './message'
router.beforeEach((to, from, next) => {
    const hasToken = getToken()

    if (hasToken) {
        console.log(hasToken)
        console.log('第一次阻拦？',to.path)
        if (to.path === '/login') {
            if(from.path === '/login'){
                next({
                    path: '/search'
                })
            } else {
                next(from.path)
            }
            console.log('??/')
        } else {
            const hasName = store.state.name
            console.log('不会走这了？',to.path)
            console.log(hasName)
            if (hasName) {
                next()
                console.log('直接放行才对')
            } else {
                console.log('开始请求')
                store.dispatch('getInfo').then(() => {
                    console.log('???')
                    next()
                }).catch(error => {
                    store.dispatch('resetToken')
                    if (to.meta.permission) {
                        next({
                            path: '/login'
                        })
                        messageFix.error('用户信息拉取失败，请检查相关网络')
                        next()
                    } else {
                        next()
                    }
                    console.log('错误？', error)
                })



            }

        }
    } else {
        if (to.meta.permission) {
            next({
                path: '/login'
            })
            messageFix.error('请先登录')
        } else {
            next()
        }
        console.log(to)

    }
})