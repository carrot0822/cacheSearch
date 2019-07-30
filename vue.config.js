const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set("assets", resolve("@/assets"))
            .set("components", resolve("@/components"))
            .set("common", resolve("@/common"))
            .set("page", "@/page")
            .set("request", "@/request")
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end();
    },
}