import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'
Vue.use(VueI18n)
const messages = {
    en: {
        // ES6扩展运算符合并对象
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
}
// 结合cookie记录用户选择的语言，若无默认en
const i18n = new VueI18n({
    // set locale
    // options: en or zh
    locale: sessionStorage.getItem('language') || 'en',
    // set locale messages
    messages
})
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
  })
  

export default i18n