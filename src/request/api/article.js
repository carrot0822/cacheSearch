import axios from 'axios'
var url = window.url
var fileUrl = window.fileUrl;
export const  showUrl =`${fileUrl}filemodule/showFile/getFile`  
const articleUrl = {
    apex:`${url}serviceforreadermodule/readerTbNotice/currency/selectLittle`, // 前5页
    allList:`${url}serviceforreadermodule/readerTbNotice/currency/selectPage`, // 查询分页
    concrete:`${url}serviceforreadermodule/readerTbNotice/currency/selectOne` // 具体查询
}

export const articleInt = {
    apex,
    allList,
    concrete
}
// 
function apex(obj) {
    return axios.get(articleUrl.apex,{
        params:obj
    }).then((res) => {
        return Promise.resolve(res)
    })
}

function allList(obj) {
    return axios.get(articleUrl.allList,{
        params:obj
    }).then((res) => {
        return Promise.resolve(res)
    })
}

function concrete(obj) {
    return axios.get(articleUrl.concrete,{
        params:obj
    }).then((res) => {
        return Promise.resolve(res)
    })
}