import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.lighten2,
    secondary: '#00A79D',
    accent: colors.purple.accent1,
    error: colors.red.accent3
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
