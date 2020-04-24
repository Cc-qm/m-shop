<template>
  <div>
    <van-row>
      <van-col span='4' @click="toggle"  class="address">{{userMessage?userMessage.address?userMessage.address.split('/')[2]:'完善信息':'请登录'}}<i class="iconfont">&#xe628;</i></van-col>
      <van-search
        v-model="value"
        shape="round"
        background="#66ccff"
        placeholder="请输入搜索关键词"
        @click="goToSearch"
      />
    </van-row>
  </div>
</template>
<script>
import Vue from 'vue'
import { Search, Col, Row } from 'vant'
import { mapState } from 'vuex'
Vue.use(Search).use(Col).use(Row)
export default {
  data () {
    return {
      value: '' // 搜索框的值
    }
  },
  computed: {
    ...mapState('user', ['userMessage'])
  },
  methods: {
    // 点击地址后跳转
    toggle () {
      if (this.userMessage) {
        this.$router.push('/member/updateMessage')
      } else {
        this.$router.push('/login')
      }
    },
    // 点击搜索后跳转
    goToSearch () {
      this.$router.push('/home/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-search__content--round {
      border-radius: 999px;
      height: .34rem;
  }
  .address{
    background: #66ccff;
    text-align: center;
    height: .54rem;
    line-height: .54rem;
    color: #fff;
    padding-left: .05rem;
    i{
      font-size: .1rem;
    }
  }
  .van-row{
    position: fixed;
    top: 0;
    width: 100%;
    font-size: .14rem;
    z-index: 1;
    .van-search{
      height: .54rem;
    }
  }
</style>
