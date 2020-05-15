import axios from 'axios'

var url = window.url

const searchUrl = {
    collet:`${url}serviceforreadermodule/query/selectAllBookType`, // 中途分类法
    allSearch:`${url}serviceforreadermodule/query/baseSelect`,
    detail:`${url}serviceforreadermodule/query/getTableTwo`,
    select:`${url}serviceforreadermodule/query/getTableOne`,
    testCollect:`${url}serviceforreadermodule/query/selectAllBookTypes` // 修改版中图
}
export const searchInt = {
    testCollect:testCollect,
    collectInt: collect,
    allSearchInt:allSearch, // 检索接口
}
// 详情接口
export function detailInt(data) {
    return axios.get(searchUrl.detail,{
        params:data
    }).then((res) =>{
        return Promise.resolve(res)
    })
}
export function selectInt(data){
    return axios.get(searchUrl.select,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res)
    })
}
function collect (data){
    return axios.get(searchUrl.collet,{
        params:data
    }).then((res) => {
        return Promise.resolve(res)
    })
}

function allSearch(data) {
    return axios.get(searchUrl.allSearch,{
        params:data
    }).then((res) => {
        return Promise.resolve(res)
    })
}

function testCollect(data) {
    return axios.get(searchUrl.testCollect,{
        params:data
    }).then((res) => {
        return Promise.resolve(res)
    })
}