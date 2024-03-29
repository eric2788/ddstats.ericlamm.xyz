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
  devServer: {
    allowedHosts: ['serve.ericlamm.xyz'],
  },
  pwa: {
    name: 'DDStats 高亮用户统计',
    themeColor: '#409cff',
    assetsVersion: '1.0.3',
    msTileColor: '#ffffff',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // global stats only cache first
          urlPattern: new RegExp(`^${process.env.VUE_APP_API_URL}/stats.*`),
          handler: 'CacheFirst',
          options: {
            cacheName: 'global-stats',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60,
            },
          },
        },
        {
          urlPattern: new RegExp(`^${process.env.VUE_APP_API_URL}.+`),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 10
          },
        }
      ]
    }
  }
})
