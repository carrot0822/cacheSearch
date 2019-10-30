// 通用方法
// 得到一个26个大写字母的数组
export function getBigLetter() {
    var str = [];
    for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i)); // 将unicode转码为一个字母
    }
    return str;
}

// token一套
const tokenKey = 'authorization'
export function getToken() {
    return sessionStorage.getItem(tokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(tokenKey, token)
}

export function removeToken() {
    return sessionStorage.removeItem(tokenKey)
}

// 
/**
 * 
 * @param {number} times 
 * @param {string} fmt 
 */
export function format(times, fmt) {
    let obj = new Date(times)
    var o = {
        "M+": obj.getMonth() + 1, //月份
        "d+": obj.getDate(), //日
        "h+": obj.getHours(), //小时
        "m+": obj.getMinutes(), //分
        "s+": obj.getSeconds(), //秒
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
        "S": obj.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }

    return fmt;
}