<template>
  <div>
    <van-button type="default" class="backTop" @click="backTop" v-show="isShowing">
      <van-icon name="upgrade" size=".5rem"/>
    </van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Button } from 'vant'

Vue.use(Button).use(Icon)
export default {
  data () {
    return {
      isShowing: false,
      scrollTrigger: false, // 是否在向上滚动途中
      scrollTop: 0
    }
  },
  methods: {
    // 返回顶部
    backTop () {
      const that = this
      // 防止用户频繁点击返回顶部按钮，待返回顶部成功后设置scrollTrigger为初始值
      if (that.scrollTrigger) {
        // console.log(11111)
        return
      }
      // 获取当前距离顶部的数值，设置每次上滑的高度直到滚动到顶部为止
      let scrollTop = this.scrollTop
      let steep = scrollTop / 2000
      const timer = setInterval(() => {
        that.scrollTrigger = true
        scrollTop -= steep
        steep += 5
        if (scrollTop <= 0) {
          clearInterval(timer)
          that.scrollTrigger = false
        }
        document.body.scrollTop = document.documentElement.scrollTop = scrollTop
      }, 30)
    },
    backTopShow () {
      this.scrollTop = document.documentElement.scrollTop
      this.scrollTop > 100 ? this.isShowing = true : this.isShowing = false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.backTopShow, true)
  }
}
</script>
<style lang="scss" scoped>
.backTop{
  position: fixed;
  padding: 0;
  bottom: .7rem;
  right: .2rem;
  z-index: 2;
  color: #66ccff;
  background: none;
  border: none;
  border-radius: 50% 50%;
}
</style>
