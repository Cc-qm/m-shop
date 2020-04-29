<template>
  <div>
    <div class="back iconfont icon-fanhui" @click="back"></div>
    <div class="title">已收藏的商品
      <span @click="showDelete=!showDelete">{{showDelete?'完成':'编辑'}}</span>
    </div>
    <div class="nohavelove" v-if="userMessage.loveGoods.length === 0">
      <van-icon name="like-o" />
        <p class="p1">你的收藏夹空空如也~~</p>
        <p class="p2">快去逛逛吧!</p>
    </div>
    <ul v-else>
      <router-link
        class="item"
        v-for="item in userMessage.loveGoods"
        :key="item._id"
        :to="{
          name: 'detail',
          params: {
            id: item._id
          }
        }"
        tag="li"
      >
        <img v-lazy="item.img" alt="">
        <div class="left">
          <h3>{{item.name}}</h3>
          <p class="price">￥{{item.price}}</p>
          <p class="detail">{{item.detail}}</p>
        </div>
        <van-icon name="clear" @click.stop="deleteHandle([item._id])" v-show="showDelete"/>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Vue from 'vue'
import { Lazyload, Icon, Toast, Dialog } from 'vant'
import instance from '@/utils/http'
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: '/lazyimg.jpeg.gif'
}).use(Icon).use(Toast).use(Dialog)

export default {
  data () {
    return {
      showDelete: false
    }
  },
  computed: {
    ...mapState('user', ['userMessage'])
  },
  methods: {
    ...mapMutations('user', ['setUserMessage']),
    back () {
      this.$router.back()
    },
    // 删除某一项
    deleteHandle (idArr) {
      Dialog.confirm({
        // title: '标题',
        message: '确认要移除商品吗'
      }).then(() => {
        const userMsg = this.userMessage
        delete userMsg._id
        Toast.loading({ forbidClick: true })
        // userMsg.cart = this.userMessage.cart.filter(obj => obj._id !== item._id)
        userMsg.loveGoods = this.userMessage.loveGoods.filter(item => {
          // return item._id !== id
          return !idArr.includes(item._id)
        })
        instance.patch('/api/updatemessage', userMsg).then(res => {
          this.setUserMessage(res.data)
          Toast.clear()
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back{
  position: absolute;
  top: .15rem;
  color: #fff;
  left: .1rem;
  font-size: .25rem;
}
.title{
  background: #66ccff;
  color: #fff;
  text-align: center;
  height: .54rem;
  width: 100%;
  line-height: .54rem;
  font-size: .18rem;
  span{
    position: absolute;
    right: .15rem;
    font-size: .15rem;
  }
}
.item{
  width: 100%;
  height: 1.28rem;
  display: flex;
  padding: .1rem .1rem .18rem;
  position: relative;
  border-bottom: .001rem solid #ccc;
  .van-icon {
    position: absolute;
    top: .1rem;
    right: .1rem;
    color: crimson;
    font-size: .16rem;
  }
  img{
    width: 1rem;
    height: 1rem;
    float: left;
  }
  .left{
    float: left;
    padding-left: .05rem;
    h3{
      width: 2rem;
      padding-top: .08rem;
      font-size: .14rem;
      color: #333;
      font-weight: 700;
      margin-bottom: .13rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price{
      color: #FB4E44;
      font-weight: 700;
      font-size: .16rem;
      margin-bottom: .13rem;
    }
    .detail{
      font-size: .12rem;
      color: #9c9c9c;
    }
  }
}
.nohavelove {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      .van-icon {
        font-size: .60rem;
        color: #666;
      }
      p {
        font-size: .14rem;
        color: #999;
      }
      .p1 {
        margin-top: .20rem;
      }
    }
</style>
