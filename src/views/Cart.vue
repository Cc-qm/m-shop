<template>
  <div class="shopCart">
    <Title></Title>
    <div class="cartList">
      <ul v-if="userMessage.cart&&userMessage.cart.length > 0">
        <li v-for="item in userMessage.cart" :key="item._id">
          <van-checkbox
            :value="item._id"
            v-model="item.isSelect"
            checked-color="#66ccff"
            @click="chooseChange(item._id, item)"
          ></van-checkbox>
          <div class="shopdetail" >
            <div class="detailimg" @click="toDetial(item._id)">
              <img :src="item.img" />
            </div>
            <div class="detailtext">
              <div class="shoptitle van-multi-ellipsis--l2">
                {{ item.name }}
              </div>
              <div class="shoppricenum">
                <p class="shopprice">
                  ¥{{ item.price }}
                </p>
                <div class="shopnum">
                  <van-stepper v-model="item.num" async-change @change="onChange(item)" />
                </div>
              </div>
            </div>
          </div>
          <van-icon name="clear" @click="deleteHandle(item)"/>
        </li>
      </ul>
      <div class="nohaveshop" v-else>
        <van-icon name="shopping-cart-o" />
        <p class="p1">你的购物车空空如也~~</p>
        <p class="p2">快去采购吧!</p>
      </div>
    </div>
    <div class="cartfotter" v-if="userMessage.cart&&userMessage.cart.length > 0">
      <van-submit-bar button-text="去结算" @submit="onSubmit">
        <van-checkbox
          v-model="allchecked"
          checked-color="#66ccff"
          @click="checkAll"
          >全选</van-checkbox
        >
        <div class="buyprice">
          <p class="p1">合计</p>
          <p class="p2">
            ¥{{ totalprice }}
          </p>
        </div>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import { Icon, Checkbox, Stepper, SubmitBar, Toast } from 'vant'
import instance from '@/utils/http'
Vue.use(Icon).use(Checkbox).use(Stepper).use(SubmitBar).use(Toast)
export default {
  data () {
    return {
      // allchecked: false,
      selectedData: [],
      // 总价
      totalprice: 0
    }
  },
  created: function () {
    this.count()
    this.show()
    this.userMessage.cart.forEach(item => {
      if (item.isSelect) {
        this.selectedData.push(item._id)
      }
    })
    console.log(this.selectedData)
  },
  computed: {
    ...mapState('user', ['userMessage']),
    allchecked: {
      // console.log(this.userMessage.cart.every(item => item.isSelect === true))
      get: function () {
        return this.userMessage.cart.every(item => item.isSelect === true)
      },
      set: function () {
      }
    }
  },
  methods: {
    ...mapMutations('tabbar', ['show']),
    ...mapMutations('user', ['setUserMessage']),
    // 单选的change事件
    chooseChange (i, item) {
      // 如果已选中，再点击则将其移除已选中得数组
      if (this.selectedData.indexOf(i) > -1) {
        var arrs = this.selectedData.filter(item => item !== i)
        this.selectedData = arrs
        item.isSelect = false
        // this.remove(this.selectedData, i);
        this.count()
        console.log(1111, this.selectedData)
      } else {
        this.selectedData.push(i)
        item.isSelect = true
        this.count()
      }
      // if (this.selectedData.length < this.userMessage.cart.length) {
      //   this.allchecked = false
      // } else {
      //   this.allchecked = true
      // }
      this.count()
      console.log(this.selectedData)
      this.saveToDatabase()
    },
    // 将修改后的数据保存到数据库
    saveToDatabase () {
      const userMsg = this.userMessage
      delete userMsg._id
      instance.patch('/api/updatemessage', userMsg).then(res => {
        this.setUserMessage(res.data)
        Toast.clear()
      })
    },
    // 商品数量
    onChange (item) {
      Toast.loading({ forbidClick: true })
      this.count()
      console.log(this.userMessage.cart)
      this.saveToDatabase()
    },
    // 计算价格
    count: function () {
      let totalPrice = 0 // 临时总价
      this.userMessage.cart.forEach(function (val) {
        if (val.isSelect) {
          totalPrice += val.num * val.price // 累计总价
        }
      })
      this.totalprice = totalPrice
    },
    // 全选
    checkAll () {
      const list = this.userMessage.cart
      if (this.allchecked) {
        list.forEach(element => {
          element.isSelect = false
        })
        this.selectedData = []
        this.count()
        console.log('111' + this.selectedData)
      } else {
        list.forEach(element => {
          element.isSelect = true
          if (this.selectedData.indexOf(element._id) < 0) {
            this.selectedData.push(element._id)
          }
        })
        this.count()
        console.log('222' + this.selectedData)
      }
      this.saveToDatabase()
    },
    // 去结算
    onSubmit () {
      // 选择购买的商品
      var cartgoods = []
      this.userMessage.cart.forEach(function (item) {
        if (item.isSelect) {
          cartgoods.push({ _id: item._id, num: item.num })
        }
      })
      if (cartgoods.length === 0) {
        Toast('请选择商品购买')
      } else {
        this.$router.push('shopBuy')
      }
      console.log(cartgoods)
    },
    // 删除某一项
    deleteHandle (item) {
      const userMsg = this.userMessage
      delete userMsg._id
      Toast.loading({ forbidClick: true })
      userMsg.cart = this.userMessage.cart.filter(obj => obj._id !== item._id)
      instance.patch('/api/updatemessage', userMsg).then(res => {
        this.setUserMessage(res.data)
        Toast.clear()
      })
    },
    // 点击跳转详情页
    toDetial (id) {
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopCart {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  .cartList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .54rem;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
      li {
        width: 100%;
        height: .96rem;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-bottom: .12rem;
        .van-icon {
          position: absolute;
          top: .1rem;
          right: .1rem;
          color: crimson;
          font-size: .16rem;
        }
        .van-checkbox {
          margin-left: .17rem;
          ::v-deep .van-checkbox__icon {
            height: .14rem;
            line-height: .14rem;
            .van-icon {
              width: .14rem;
              height: .14rem;
              font-size: .12rem;
              border: 1px solid #a5a5a5;
            }
          }
        }
        .shopdetail {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: .13rem;
          .detailimg {
            width: .64rem;
            height: .64rem;
            background: rgba(165, 165, 165, 1);
            border-radius: .04rem;
            img {
              width: 100%;
              height: 100%;
              border-radius: .04rem;
            }
          }
          .detailtext {
            width: 2.30rem;
            height: .60rem;
            display: flex;
            flex-direction: column;
            margin-left: .08rem;
            position: relative;
            .shoptitle {
              width: 1.80rem;
              text-align: justify;
              font-size: .12rem;
              color: #212121;
              line-height: .17rem;
            }
            .shoppricenum {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
              position: absolute;
              bottom: 0;
              .shopprice {
                font-size: .12rem;
                color:#66ccff;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
    .nohaveshop {
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
  }
  .cartfotter {
    width: 100%;
    height: .60rem;
    position: fixed;
    bottom: .5rem;
    left: 0;
    .van-submit-bar{
      position: static;
    }
    .van-submit-bar__bar {
      height: .60rem;
      font-size: .16rem;
      .van-checkbox {
        margin-left: .17rem;
        ::v-deep .van-checkbox__icon {
          height: .14rem;
          line-height: .14rem;
          .van-icon {
            width: .14rem;
            height: .14rem;
            font-size: .12rem;
            border: 1px solid #a5a5a5;
          }
        }
        ::v-deep .van-checkbox__label {
          font-size: .16rem;
          color: #212121;
          margin-left: .9rem;
        }
      }
      .buyprice {
        flex: 1;
        padding-right: .08rem;
        text-align: right;
        display: flex;
        flex-direction: column;
        .p1 {
          font-size: .10rem;
          color: #001410;
        }
        .p2 {
          font-size: .12rem;
          color: #66ccff;
          margin-top: .04rem;
        }
      }
      .van-button--danger {
        width: 1.30rem;
        height: .60rem;
        background: #66ccff;
        border: none;
        font-size: .16rem;
        color: #ffffff;
      }
    }
  }
}
</style>
