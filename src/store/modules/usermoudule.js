const module = {
  namespaced: true,
  state: {
    userMessage: {}
  },
  mutations: {
    setUserMessage (state, item) {
      state.userMessage = item
    },
    deleteUserMessage (state) {
      state.userMessage = {}
    }
  }
}
export default module
