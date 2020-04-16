const module = {
  namespaced: true,
  state: {
    userMessage: {}
  },
  mutations: {
    setUserMessage (state, item) {
      state.userMessage = item
    }
  }
}
export default module
