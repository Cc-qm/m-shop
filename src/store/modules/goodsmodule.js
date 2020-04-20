import instance from '@/utils/http'

const module = {
  namespaced: true,
  state: {
    goodsList: []
  },
  mutations: {
    setGoodsList (state, data) {
      state.goodsList = data
      // console.log(2222, data)
    }
  },
  actions: {
    getGoodsActions (store) {
      instance.get('/api/goods/goods').then(res => {
        // console.log(res.data)
        store.commit('setGoodsList', res.data)
      })
    }
  }
}

export default module
