<template>
  <div class="shopCart">
    <div class="title">购物车
      <!-- <van-icon name="setting" @click="showDelete=!showDelete"/> -->
      <span @click="showDelete=!showDelete">{{showDelete?'完成':'编辑'}}</span>
    </div>
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
          <van-icon name="clear" @click="deleteHandle([item._id])" v-show="showDelete"/>
        </li>
      </ul>
      <div class="nohaveshop" v-else>
        <van-icon name="shopping-cart-o" />
        <p class="p1">你的购物车空空如也~~</p>
        <p class="p2">快去采购吧!</p>
      </div>
    </div>
    <div class="cartfotter" v-if="userMessage.cart&&userMessage.cart.length > 0">
      <van-submit-bar :price="totalprice*100" :button-text="showDelete?'删除所选'+'('+sum+')':'去结算'+'('+sum+')'" @submit="onSubmit">
        <van-checkbox v-model="allchecked" @click="checkAll" checked-color="#66ccff">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import { Icon, Checkbox, Stepper, SubmitBar, Toast, Dialog } from 'vant'
import instance from '@/utils/http'
Vue.use(Icon).use(Checkbox).use(Stepper).use(SubmitBar).use(Toast).use(Dialog)
export default {
  data () {
    return {
      // allchecked: false,
      selectedData: [],
      // 总价
      totalprice: 0,
      showDelete: false
    }
  },
  created: function () {
    this.count()
    if (this.userMessage.cart) {
      this.userMessage.cart.forEach(item => {
        if (item.isSelect) {
          this.selectedData.push(item._id)
        }
      })
    }
    // console.log(this.selectedData)
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
    },
    // 显示选中的商品总数
    sum () {
      let goodsSum = 0
      if (this.userMessage.cart) {
        this.userMessage.cart.forEach(item => {
          if (item.isSelect) {
            goodsSum += item.num
          }
        })
      }
      return goodsSum
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
      this.count()
      // console.log(this.selectedData)
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
      // console.log(this.userMessage.cart)
      this.saveToDatabase()
    },
    // 计算价格
    count: function () {
      let totalPrice = 0 // 临时总价
      if (this.userMessage.cart) {
        this.userMessage.cart.forEach(function (val) {
          if (val.isSelect) {
            totalPrice += val.num * val.price // 累计总价
          }
        })
      }
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
      if (this.showDelete) {
        this.deleteHandle(this.selectedData)
        return
      }
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
    deleteHandle (idArr) {
      Dialog.confirm({
        // title: '标题',
        message: '确认要移除商品吗'
      }).then(() => {
        const userMsg = this.userMessage
        delete userMsg._id
        Toast.loading({ forbidClick: true })
        // userMsg.cart = this.userMessage.cart.filter(obj => obj._id !== item._id)
        userMsg.cart = this.userMessage.cart.filter(item => {
          // return item._id !== id
          return !idArr.includes(item._id)
        })
        instance.patch('/api/updatemessage', userMsg).then(res => {
          this.setUserMessage(res.data)
          Toast.clear()
        })
      }).catch(() => {
        // on cancel
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
  .title{
    background: #66ccff;
    height: .54rem;
    width: 100%;
    position: fixed;
    top: 0;
    text-align: center;
    font-size: .18rem;
    color: #fff;
    left: 0;
    line-height: .54rem;
    span{
      position: absolute;
      right: .15rem;
      font-size: .15rem;
    }
  }
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
  .van-submit-bar{
    bottom: .5rem;
  }
}
</style>
