// 收藏 预约接口
import axios from 'axios'
var url = window.url
const collectUrl = {
    search:`${url}serviceforreadermodule/SfrTbCollect/checkCollect`, // 判断是否收藏
    add:`${url}serviceforreadermodule/SfrTbCollect/addSfrTbCollect`, // 收藏
    delete:`${url}serviceforreadermodule/SfrTbCollect/deleteSfrTbCollectByBook` // 取消收藏
}

const orderUrl = {
    order:`${url}serviceforreadermodule/bookTbSubscribeLog/subscribe` // 预约
}

export const collectInt ={
    check:search,
    collect:collect,
    delect:delectCo
}
// 预约查询
export function orderInt(obj) {
    return axios.post(orderUrl.order,obj
    ).then((res) => {
        return Promise.resolve(res)
    })
}
// 收藏查询
function search(obj) {
    return axios.get(collectUrl.search,{
        params:obj
    }).then((res) => {
        return Promise.resolve(res)
    })
}
// 点击收藏
function collect(data) {
    return axios.post(collectUrl.add,data).then((res) => {
        return Promise.resolve(res)
    })
}
// 取消收藏
function delectCo(data) {
    return axios.post(collectUrl.delete,data).then((res) => {
        return Promise.resolve(res)
    })
}