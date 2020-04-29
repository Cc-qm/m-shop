<template>
  <div>
    <div class="back iconfont icon-fanhui" @click="back"></div>
    <div class="banner" @click="previewImg">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in [goodsInfo.img,goodsInfo.img,goodsInfo.img,goodsInfo.img]" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/4
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="goodsinfo">
      <p class="name">{{goodsInfo.name}}</p>
      <p class="detail">{{goodsInfo.detail}}</p>
      <p class="price">￥<span>{{goodsInfo.price}}</span></p>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="userMessage.cart&&userMessage.cart.length"/>
      <van-goods-action-icon icon="star" :text="isLove?'已收藏':'收藏'" :color="isLove?'#ff5000':'#ccc'" @click="addToLove"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" :loading="!isOver"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload, GoodsAction, GoodsActionIcon, GoodsActionButton, Dialog, ImagePreview } from 'vant'
import { mapMutations, mapState } from 'vuex'
import instance from '@/utils/http'

Vue.use(Swipe).use(SwipeItem).use(Lazyload, {
  lazyComponent: true,
  loading: '/lazyimg.jpeg.gif'
}).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Dialog).use(ImagePreview)
export default {
  props: ['id'],
  data () {
    return {
      goodsInfo: {},
      current: 0,
      isOver: true
    }
  },
  computed: {
    ...mapState('user', ['userMessage']),
    isLove () {
      if (this.userMessage.loveGoods) {
        let isHave = false
        this.userMessage.loveGoods.forEach(item => {
          if (item._id === this.id) {
            isHave = true
          }
        })
        return isHave
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']),
    ...mapMutations('user', ['setUserMessage']),
    back () {
      this.$router.back()
    },
    onChange (index) {
      this.current = index
    },
    // 添加商品到购物车
    addToCart () {
      if (!localStorage.getItem('token')) {
        Dialog({
          message: '请先登录~',
          closeOnClickOverlay: true
        })
        return
      }
      let isHave = false
      this.userMessage.cart.forEach(item => {
        if (item._id === this.id) {
          isHave = true
        }
      })
      if (isHave) {
        Dialog({
          message: '已添加过该商品到购物车~',
          closeOnClickOverlay: true
        })
      } else {
        const userMsg = this.userMessage
        userMsg.cart.push({ ...this.goodsInfo, isSelect: false, num: 1 })
        delete userMsg._id
        // console.log(userMsg)
        this.isOver = false
        instance.patch('/api/updatemessage', userMsg).then(res => {
          this.setUserMessage(res.data)
          this.isOver = true
          Dialog({
            message: '已加入购物车~',
            closeOnClickOverlay: true
          })
        }).catch(err => {
          Dialog({
            message: err,
            closeOnClickOverlay: true
          })
        })
      }
    },
    // 添加商品到收藏夹
    addToLove () {
      if (!localStorage.getItem('token')) {
        Dialog({
          message: '请先登录~',
          closeOnClickOverlay: true
        })
        return
      }
      // console.log(this.id)
      const userMsg = this.userMessage
      if (this.isLove) {
        userMsg.loveGoods = userMsg.loveGoods.filter(item => {
          return item._id !== this.id
        })
      } else {
        userMsg.loveGoods.push(this.goodsInfo)
      }
      // console.log(userMsg.loveGoods)
      delete userMsg._id
      instance.patch('/api/updatemessage', userMsg).then(res => this.setUserMessage(res.data))
    },
    // 点击放大图片查看
    previewImg () {
      ImagePreview({
        images: [this.goodsInfo.img, this.goodsInfo.img, this.goodsInfo.img, this.goodsInfo.img],
        closeable: true,
        closeIconPosition: 'top-left',
        showIndex: false
      })
    }
  },
  created () {
    this.hide()
    instance.get(`api/goods/goods/${this.id}`).then(res => {
      // console.log(1111111111111111111, res)
      this.goodsInfo = res.data
    })
  },
  destroyed () {
    this.show()
  }
}
</script>
<style lang="scss" scoped>
  .back{
    position: absolute;
    top: .1rem;
    left: .1rem;
    font-size: .25rem;
    z-index: 1;
  }
  .banner{
    .van-swipe{
      border-radius: .1rem;
      width: 3.45rem;
      height: 3.45rem;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
      .van-swipe-item{
        &:nth-child(2){
          img{
            transform: rotateZ(30deg);
          }
        }
         &:nth-child(3){
          img{
            transform: rotateZ(90deg);
          }
        }
         &:nth-child(4){
          img{
            transform: rotateZ(120deg);
          }
        }
      }
      .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .goodsinfo{
    padding: .13rem .1rem .1rem;
    .name{
      color: #333;
      font-size: .16rem;
      font-weight: 700;
      margin-bottom: .1rem;
    }
    .detail{
      font-size: .13rem;
      margin-bottom: .1rem;
      color: crimson;
    }
    .price{
      font-size: .16rem;
      color: rgb(255, 83, 118);
      font-weight: 700;
      span{
        font-size: .22rem;
      }
    }
  }
</style>
