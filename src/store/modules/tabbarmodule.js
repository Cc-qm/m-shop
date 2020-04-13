const module = {
  namespaced: true,
  state: {
    isTabbarShow: true
  },
  mutations: {
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  }
}
export default module
