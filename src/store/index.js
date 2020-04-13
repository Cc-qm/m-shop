import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './modules/tabbarmodule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabbar
  }
})
