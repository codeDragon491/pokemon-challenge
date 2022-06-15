const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/abstracts/_variables.scss";
          @import "@/assets/scss/abstracts/_mixins.scss";
        `    
      }
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .end()
  }
})
