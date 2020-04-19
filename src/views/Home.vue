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
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="title">
      <img src="https://img2.yaya.cn/newstatic/1377/cfb1e638aa0a86.jpg.webp" alt="">
    </div>
    <div class="goodsList">
      <div class="item">
        <img src="https://img2.yaya.cn/pic/product/440x440/20191202093027869.jpg.webp" alt="">
        <div>影像之美</div>
        <div>华为 P30 Pro 全网通版</div>
        <div>￥3788</div>
      </div>
      <div class="item">
        <img src="https://img2.yaya.cn/pic/product/440x440/20191202093027869.jpg.webp" alt="">
        <div class="detail">影像之美</div>
        <div class="name">华为 P30 Pro 全网通版</div>
        <div class="price">￥3788</div>
      </div>
      <div class="item">
        <img src="https://img2.yaya.cn/pic/product/440x440/20191202093027869.jpg.webp" alt="">
        <div class="detail">影像之美</div>
        <div class="name">华为 P30 Pro 全网通版</div>
        <div class="price">￥3788</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Col, Row, Swipe, SwipeItem, Lazyload } from 'vant'
import instance from '@/utils/http'

Vue.use(Search).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload, {
  lazyComponent: true
})
export default {
  data () {
    return {
      value: '',
      images: []
    }
  },
  created () {
    instance.get('/api/goods/banners').then(res => {
      // console.log(res.data[0].data)
      this.images = res.data[0].data
    })
  }
}
</script>

<style lang="scss" scoped>
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
.van-search{
  height: .54rem;
}
.banner{
  background: #66ccff;
  padding-top: .2rem;
  padding-bottom: .1rem;
  .van-swipe{
    border-radius: .1rem;
    width: 3.45rem;
    height: 1.72rem;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.title{
  // width: 100%;
  // height: .44rem;
  img{
    width: 100%;
  }
}
.goodsList{
  padding: 0 .14rem 1rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item{
    width: 49%;
    // float: left;
    height: 2.46rem;
    img{
      width: 1.5rem;
      height: 1.5rem;
      margin: .10rem auto;
    }
    .detail{
      background: #ebf6fe;
      color: #87acd8;
      padding: .05rem .15rem;
      width: 100%;
      font-size: .13rem;
    }
    .name{
      font-size: .14rem;
      padding: .05rem .15rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price{
      padding: .05rem .1rem 0;
      color: #FB4E44;
      font-size: .15rem;
    }
  }
}
</style>
