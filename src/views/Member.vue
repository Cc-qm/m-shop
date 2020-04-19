<template>
   <div class="center">
      <div class="center-view">
        <div class="avator">
          <div class="img" @click="previewImg">
            <img :src="'http://localhost:3000'+userMessage.icon"   class="avator-icon">
          </div>
          <div class="nick-name">你好, {{userMessage.nickname}}</div>
          <div class="nick-name cancel" @click="cancel">注销登录</div>
          <div class="message">个性签名：{{userMessage.message || '无'}}</div>
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
            <span>修改或完善用户信息</span>
            <i class="iconfont icon-jiantouarrow487"></i>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ImagePreview } from 'vant'
import Vue from 'vue'
Vue.use(ImagePreview)
export default {
  computed: {
    ...mapState('user', ['userMessage'])
  },
  methods: {
    ...mapMutations('tabbar', ['show']),
    cancel () {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 跳转页面方法
    toggle (path) {
      this.$router.push(path)
    },
    previewImg () {
      ImagePreview({
        images: ['http://localhost:3000' + this.userMessage.icon],
        closeable: true,
        closeIconPosition: 'top-left',
        showIndex: false
      })
    }
  },
  created () {
    this.show()
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
      background: linear-gradient(#ffffff, #66ccff);
      padding: .64rem 0 0 1rem;
      color: #ffffff;
      background-size: cover;
      display: flex;
      .img{
        width: 0.63rem;
        height: 0.63rem;
        border-radius: 50% 50%;
        margin-right: 20px;
        border: .02rem solid #fff;
        margin: .06rem .20rem 0rem -.64rem;
        overflow: hidden;
      }
      img{
        // border-radius: .35rem;
        width: 100%;
      }
      .nick-name{
        // width: 0.64rem;
        height: 0.24rem;
        margin-top: .1rem;
        margin-right: .23rem;
        font-size: .16rem;
        color: rgb(0, 87, 85);
      }
      .cancel{
        color: rgb(241, 241, 241);
        font-size: .14rem;
        padding: .05rem;
        background: rgb(97, 97, 97);
        border-radius: .5rem;
        line-height: .14rem;
      }
      .message{
        position: absolute;
        top: 1rem;
        left: 1.2rem;
        font-size: .14rem;
        margin-right: .5rem;
        color: chocolate;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
      margin-bottom: .10rem;
      border-bottom: .01rem solid rgb(231, 231, 231);
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
