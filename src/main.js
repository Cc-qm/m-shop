import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载自定义指令文件directive.js
import '@/utils/directives'
// 加载自定义组件文件component.js
import '@/utils/components'
// 引入全局样式
import '@/styles/main.scss'
// 引入rem文件
import '@/utils/rem.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
