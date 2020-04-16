<template>
   <div class="center">
      <div class="center-view">
        <div class="avator">
          <img :src="'http://localhost:3000/'+userMessage.icon"   class="avator-icon">
          <div class="nick-name" @click="cancel">注销登录</div>
        </div>
        <ul class="my-order-tab">
            <li>
              <i class="iconfont icon-lujing"></i>
              <span>收藏商品</span>
            </li>
             <li><i class="iconfont icon-dingdan_huaban" ></i>
              <span>商品订单</span>
            </li>
        </ul>
        <div class="margin-set systen-set" @click="toggle('/member/updatePassword')">
            <i class="iconfont icon-mima"></i>
            <span>修改密码</span>
            <i class="iconfont icon-jiantouarrow487"></i>
        </div>
        <div class="margin-set systen-set" @click="toggle('/member/updateMessage')">
            <i class="iconfont icon-ziyuan"></i>
            <span>修改用户信息</span>
            <i class="iconfont icon-jiantouarrow487"></i>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['userMessage'])
  },
  methods: {
    cancel () {
      window.localStorage.removeItem('token')
      this.$router.go(0)
    },
    // 跳转页面方法
    toggle (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
  .center-view{
    width: 3.75rem;
    height: 4.85rem;
    background: #ffffff;
    .avator{
      width: 3.75rem;
      height: 1.7rem;
      background: #66ccff;
      padding: .64rem 0 0 1rem;
      color: #ffffff;
      background-size: cover;
      display: flex;
      img{
        width: 0.63rem;
        height: 0.63rem;
        border-radius: 35px;
        margin-right:20px ;
        border: 2px solid #fff;
        margin: 6px 20px 0px -64px;
      }
      .nick-name{
        width: 0.64rem;
        height: 0.24rem;
        margin-top: 23px;
        font-size: 16px;
      }
    }
    .my-order-tab{
      width: 3.75rem;
      height: 0.79rem;
      background: #fff;
      margin-bottom: .10rem;
      display: flex;
      text-align: center;
      font-size: .14rem;
      align-items: center;
      margin-bottom: 10px;
      li{
        flex: 1;
        display: flex;
        flex-direction: column;
        &:active{
          background: rgb(233, 233, 233);
        }
        span{
          margin-top: .1rem;
          color: #797d82;
        }
      }
    }
    .margin-set{
      width: 3.75rem;
      height: 0.49rem;
      border-bottom: .01rem solid #ededed;
      padding-top: .10rem;
      padding-left: .10rem;
      &:active{
        background: rgb(233, 233, 233);
      }
      span{
        width: 3.04rem;
        height: 0.22rem;
        padding-left: .1rem;
        text-align: center;
        font-size: .15rem;
        color: #191a1b;
        flex: 1;
      }
      i:last-child{
        float: right;
        margin-right: .1rem;
      }
    }
  }
</style>
