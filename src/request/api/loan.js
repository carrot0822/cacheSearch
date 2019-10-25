import axios from 'axios'

var url = window.url

const loanInfo={
    lendingRank:`${url}serviceforreadermodule/query/getBorrowCount`,//借阅管理》借阅排行
    getNewbook:`${url}serviceforreadermodule/query/getNewBook`,//借阅排行》新书通报
}


/*****借阅管理》借阅排行*****/
export function lendingRankFun(time){
    return axios.get(loanInfo.lendingRank,{
        params:{
            borrowCountTime:time
        }
    })
}
/*****借阅排行》新书快递*****/
export function getNewbookFun(time){
    return axios.get(loanInfo.getNewbook,{
        params:{
            borrowCountTime:time
        }
    })
}
