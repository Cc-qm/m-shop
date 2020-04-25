<template>
  <div>
    <Title></Title>
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
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          offset="100"
        >
          <ul class="van-clearfix item-list">
            <!-- <van-cell v-for="item in list" :key="item.id" :title="item.name" /> -->
            <!-- <div class="item" v-for="item in list" :key="item._id">
              <img  v-lazy="item.img" alt="">
              <div class="detail">{{item.detail}}</div>
              <div class="name">{{item.name}}</div>
              <div class="price">￥{{item.price}}</div>
            </div> -->
            <router-link
              class="item"
              v-for="item in list"
              :key="item._id"
              :to="{
                name: 'detail',
                params: {
                  id: item._id
                }
              }"
              tag="li"
            >
              <img  v-lazy="item.img" alt="">
              <div class="detail">{{item.detail}}</div>
              <div class="name">{{item.name}}</div>
              <div class="price">￥{{item.price}}</div>
            </router-link>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Search, Col, Row, Swipe, SwipeItem, Lazyload, List, PullRefresh } from 'vant'
import instance from '@/utils/http'

Vue.use(Search).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload, {
  lazyComponent: true,
  loading: '/lazyimg.jpeg.gif'
}).use(List).use(PullRefresh)
export default {
  data () {
    return {
      value: '', // 搜索框的值
      images: [], // 轮播图
      list: [], // 显示的商品
      goodsIndex: 0, // 商品索引
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      limit: 0
    }
  },
  created () {
    this.show()
    instance.get('/api/goods/banners').then(res => {
      // console.log(res.data[0].data)
      this.images = res.data[0].data
    })
    if (this.goodsList.length === 0) {
      setTimeout(() => {
        this.getGoodsActions()
      }, 2000)
    }
  },
  computed: {
    // ...mapState('user', ['userMessage']),
    ...mapState('goods', ['goodsList'])
  },
  methods: {
    ...mapActions('goods', ['getGoodsActions']),
    ...mapMutations('tabbar', ['show']),
    // 到底部加载
    onLoad () {
      if (this.goodsList.length === 0) { // 首次访问vuex还没有值，直接发送请求获取
        instance.get('/api/goods/goods', {
          params: {
            _limit: this.limit = this.limit + 10
          }
        }).then(res => {
          if (this.refreshing) { // 判断是否是下拉刷新
            this.list = []
            this.refreshing = false
          }
          // console.log(res)
          this.list = res.data
          // 加载状态结束
          this.loading = false
          if (this.list.length >= res.count) {
            this.finished = true
          }
        }).catch(() => {
          this.error = true
          this.loading = false
        })
      } else { // 直接从vuex中获取
        this.goodsIndex = this.goodsIndex + 10
        if (this.refreshing) { // 判断是否是下拉刷新
          this.list = []
          this.refreshing = false
        }
        this.list = this.goodsList.slice(0, this.goodsIndex)
        this.loading = false
        // console.log(this.list)
        if (this.list.length === this.goodsList.length) {
          this.finished = true
        }
      }
    },
    // 下拉刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.limit = 0
      this.goodsIndex = 0
      this.getGoodsActions() // 跟新vuex内的商品数据
      setTimeout(() => { // 延迟执行，以获取最新更新的商品
        this.onLoad()
      }, 500)
    }
    // // 点击地址后跳转
    // toggle () {
    //   if (this.userMessage) {
    //     this.$router.push('/member/updateMessage')
    //   } else {
    //     this.$router.push('/login')
    //   }
    // },
    // // 点击搜索后跳转
    // goToSearch () {
    //   this.$router.push('/home/search')
    // }
  }
}
</script>

<style lang="scss" scoped>
// .address{
//   background: #66ccff;
//   text-align: center;
//   height: .54rem;
//   line-height: .54rem;
//   color: #fff;
//   padding-left: .05rem;
//   i{
//     font-size: .1rem;
//   }
// }
// .van-row{
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 1;
//   .van-search{
//     height: .54rem;
//   }
// }
.banner{
  background: #66ccff;
  padding-top: .1rem;
  padding-bottom: .1rem;
  margin-top: .54rem;
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
  // overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .van-pull-refresh{
    width: 100%;
  }
  .item-list{
    width: 100%;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
}
</style>
