<template>
  <div class="search">
    <div class="header">
      <div class="back iconfont icon-fanhui" @click="back"></div>
      <van-search
        v-focus
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <van-sticky class="sort">
      <div  @click="isActive=!isActive; sortList()" :style="isActive?{color: '#66ccff'}:''">按价格排序</div>
      <div @click="sortRule=sortRule==='des'?'asc':'des'; changeSortList()">价格<i class="iconfont" :class="sortRule==='des'?'icon-xia--jiantou':'icon-shang--jiantou'"></i></div>
    </van-sticky>
    <div class="goodsList">
      <!-- <div class="item">
        <img src="https://img2.yaya.cn/pic/product/440x440/20170518150233875.jpg.webp" alt="">
        <div class="left">
          <h3>摩可 红米4A 半屏钢化膜</h3>
          <p class="price">￥39</p>
          <p class="detail">暂无评价</p>
        </div>
      </div> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="10"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="item" v-for="item in list" :key="item._id">
          <img v-lazy="item.img" alt="">
          <div class="left">
            <h3>{{item.name}}</h3>
            <p class="price">￥{{item.price}}</p>
            <p class="detail">{{item.detail}}</p>
          </div>
        </div>
        <!-- <div v-for="(item, index) in list" :key="index">{{item.name}}</div> -->
      </van-list>
    </div>
    <div v-show="errText" style="text-align:center">{{errText}}</div>
    <BackTop></BackTop>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import instance from '@/utils/http'
import Vue from 'vue'
import { Search, Sticky, List, Lazyload } from 'vant'

Vue.use(Search).use(Sticky).use(List).use(Lazyload, {
  lazyComponent: true,
  loading: '/lazyimg.jpeg.gif'
})
export default {
  data () {
    return {
      value: '',
      sortRule: 'des', // 按什么顺序排序
      // sort: '', // 按哪个区域排序
      list: [], // 显示的数组
      errText: '', // 出错显示的信息
      limit: 0,
      loading: false,
      finished: false,
      isActive: false
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide']),
    onSearch () {
      // console.log(this.value)
      this.list = []
      this.limit = 0
      this.isActive = false
      this.getGoods()

      this.sortRule = 'des'
      this.errText = ''
    },
    back () {
      // this.$router.push('/home')
      this.$router.back()
    },
    getGoods () {
      instance.get('/api/goods/goods', {
        params: {
          _sort: this.isActive ? 'price' : '',
          _sortRule: this.sortRule,
          q: this.value,
          _limit: this.limit = this.limit + 10
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data
        // 加载状态结束
        this.loading = false
        if (this.list.length >= res.count) {
          this.finished = true
        }
      }).catch(err => {
        console.log(err)
        this.errText = err
      })
    },
    onLoad () {
      // console.log(11111)
      this.getGoods()
    },
    sortList () {
      this.limit = 0
      this.getGoods()
    },
    changeSortList () {
      // console.log(111, this.sortRule)
      // this.sortRule = this.sortRule === 'des' ? 'asc' : 'des'
      this.limit = 0
      // console.log(this.sortRule, this.sort)
      this.getGoods()
    }
  },
  created () {
    this.hide()
  }
}
</script>
<style lang="scss" scoped>
.search{
 font-size: .14rem;
 .van-search__content--round {
    border-radius: 999px;
    height: .34rem;
  }
}
  .header{
    display: flex;
    .back{
      width: .5rem;
      padding: .1rem;
      padding-top: .15rem;
      font-size: .25rem;
      // line-height: .54rem;
    }
    .van-search--show-action {
      padding: .1rem .2rem;
      width: 100%;
    }
  }
  .sort{
    width: 100%;
    height: .5rem;
    // background: #ccc;
    div{
      display: inline-block;
      width: 50%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      background: #fff;
      box-shadow: 0 5px 7px 0 rgba(0,0,0,.08);
    }
  }
  .goodsList{
    .item{
      width: 100%;
      height: 1.28rem;
      display: flex;
      padding: .1rem .1rem .18rem;
      border-bottom: .001rem solid #ccc;
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
  }
</style>
