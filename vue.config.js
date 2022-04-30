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
    msTileColor: '#ffffff',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      runtimeCaching: [
        {
          // global stats only cache first
          urlPattern: ({url}) => {
            console.debug(`CacheFirst: `)
            console.debug(url)
            return url.origin === process.env.VUE_APP_API_URL && url.pathname === '/stats'
          },
          handler: 'CacheFirst',
          options: {
            cacheName: 'global-stats',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 86400,
            },
          },
        },
        {
          urlPattern: ({url}) => {
            console.debug(`NetworkFirst`)
            console.debug(url)
            return url.origin === process.env.VUE_APP_API_URL
          },
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 10
          },
        }
      ]
    }
  }
})
