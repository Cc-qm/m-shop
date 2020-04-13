<template>
  <div>
    <van-row>
      <van-col span='4' class="address">霞山区<i class="iconfont">&#xe628;</i></van-col>
      <van-search
        v-model="value"
        shape="round"
        background="#66ccff"
        placeholder="请输入搜索关键词"
      />
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Col, Row } from 'vant'

Vue.use(Search).use(Col).use(Row)
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
// .iconfont {
//     font-family:"iconfont" !important;
//     font-size: 16px;
//     font-style: normal;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }
.address{
  background: #66ccff;
  text-align: center;
  height: .54Rem;
  line-height: .54rem;
  color: #fff;
  padding-left: .05rem;
  i{
    font-size: .1rem;
  }
}
</style>
