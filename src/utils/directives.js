import Vue from 'vue'
// 搜索框自动获取焦点指令
Vue.directive('focus', {
  inserted (el) {
    // console.log(el)
    el.querySelector('input').focus()
  }
})
