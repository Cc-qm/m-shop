<template>
  <div>
    <Title></Title>
    <van-tree-select height="3rem%" :items="items" :main-active-index.sync="active">
      <template #content>
        <ul v-show="active === index" v-for="(item, index) in itemsList" :key="index" class="itemList">
          <!-- <div class="item" v-for="(val) in item" :key="val._id">
            <img v-lazy="val.img" alt="">
            <p>{{val.name}}</p>
          </div> -->
             <router-link
              class="item"
              v-for="val in item"
              :key="val._id"
              :to="{
                name: 'detail',
                params: {
                  id: val._id
                }
              }"
              tag="li"
            >
              <img v-lazy="val.img" alt="">
              <p>{{val.name}}</p>
            </router-link>
        </ul>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import { TreeSelect, Lazyload } from 'vant'

Vue.use(TreeSelect).use(Lazyload, {
  lazyComponent: true,
  loading: '/lazyimg.jpeg.gif'
})
export default {
  data () {
    return {
      active: 0,
      items: [],
      itemsList: []
    }
  },
  computed: {
    ...mapState('goods', ['goodsList'])
  },
  methods: {
    ...mapMutations('tabbar', ['show']),
    // 提取出所有得type
    setItems (goodsList) {
      const arr = []
      goodsList.filter((item) => {
        if (!arr.includes(item.type)) {
          arr.push(item.type)
          return true
        }
        return false
      })
      return arr
    },
    // 根据type提取分类goods
    category (arr) {
      const A = arr.map((item, index) => {
        const filterArr = this.goodsList.filter(value => {
          return value.type === item.text
        })
        // console.log(filterArr)
        return filterArr
      })
      this.itemsList = A
    }
  },
  created () {
    this.show()
    this.items = this.setItems(this.goodsList).map(item => {
      return {
        text: item
      }
    })
    this.category(this.items)
    // console.log(this.itemsList)
  }
}
</script>

<style lang="scss" scoped>
.van-tree-select{
  padding-top: .54rem;
  .van-sidebar{
    width: .5rem;
  }
  .itemList{
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    width: 1.2rem;
    height: 1.5rem;
    text-align: center;
    padding: .1rem;
    img{
      width: 80%;
      display: inline-block;
    }
    p{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  // .van-tree-select__content{
  //   flex: 3;
  // }
  .van-sidebar{
     position: fixed;
    top: .54rem;
    left: 0;
    width: .88rem;
    height: 100%;
  }
  .van-sidebar-item--select {
    border-color: #66ccff;
  }
  .van-tree-select__content{
    margin-left: 1.1rem;
    margin-bottom: .5rem;
  }
}
</style>
