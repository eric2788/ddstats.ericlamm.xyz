const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: false,
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'DDStats - 高亮用户统计'
        return args
      })
  },
  pwa: {
    name: 'DDStats 高亮用户统计',
    themeColor: '#409cff',
    msTileColor: '#ffffff'
  }
})
