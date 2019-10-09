const path = require("path")
const webpack = require("webpack")
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
	configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
	  
    } else {
      // 为开发环境修改配置...
    }
  },
    chainWebpack: config =>{
        config.resolve.alias
            .set("assets",resolve("@/assets"))
            .set("components",resolve("@/components"))
            .set("common",resolve("@/common"))
            .set("page","@/page")
            .set("request","@/request")
    }
}