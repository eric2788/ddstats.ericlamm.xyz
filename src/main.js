import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import virutalScroller from './plugins/virutal-scroller'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { loadFonts } from './plugins/webfontloader'
import './registerServiceWorker'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(virutalScroller)
  .mount('#app')
