import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './modules/tabbarmodule'
import user from './modules/usermoudule'
import goods from './modules/goodsmodule'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer (data) {
      return {
        user: data.user
      }
    }
  })],
  modules: {
    tabbar,
    user,
    goods
  }
})
