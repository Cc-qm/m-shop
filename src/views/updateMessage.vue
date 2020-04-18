<template>
  <div class="update">
    <div class="back iconfont icon-fanhui" @click="back"></div>
    <van-form @submit="onSubmit">
      <van-field label="用户名" :value="userMessage.username" readonly label-width=".9rem" name="username"/>
      <van-field
        v-model="userMessage.nickname"
        name="nickname"
        label="昵称"
        placeholder="昵称"
        label-width=".9rem"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="userMessage.phone"
        type="digit"
        name="phone"
        label="手机号码"
        placeholder="手机号码"
        label-width=".9rem"
        :rules="[{ message: '手机号格式不正确',pattern:/^1[3456789]\d{9}$/ }]"
      />
      <van-field
        v-model="userMessage.email"
        type="email"
        name="email"
        label="邮箱"
        label-width=".9rem"
        placeholder="电子邮箱"
        :rules="[{ message: '邮箱格式不正确',pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ }]"
      />
      <van-field
        readonly
        clickable
        name="address"
        :value="value"
        label-width=".9rem"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
          :value="address"
        />
      </van-popup>
      <van-field
        v-model="userMessage.message"
        name="message"
        rows="2"
        autosize
        label="个性签名"
        label-width=".9rem"
        type="textarea"
        maxlength="50"
        placeholder="请输入个性签名"
        show-word-limit
      />
      <div class="login-inp" style="border:0">
        <label style="width: .9rem;display:inline-block">更换头像</label>
          <van-uploader :max-count="1" v-model="fileList"/>
        </div>
      <div style="margin: .2rem;">
        <van-button round block type="info" native-type="submit">
          修改用户信息
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Form, Field, Button, Popup, Area, Uploader, Dialog } from 'vant'
import areaList from '../utils/area'
import instance from '@/utils/http'

Vue.use(Form).use(Field).use(Button).use(Popup).use(Area).use(Uploader).use(Dialog)
export default {
  data () {
    return {
      value: '',
      showArea: false,
      areaList,
      fileList: []
    }
  },
  methods: {
    ...mapMutations('tabbar', ['show', 'hide']),
    ...mapMutations('user', ['setUserMessage']),
    back () {
      this.$router.back()
    },
    onSubmit () {
      const params = new FormData(document.querySelector('form'))
      if (this.fileList.length > 0) {
        params.set('files', this.fileList[0].file)
      }
      const config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      instance.patch('/api/updatemessage', params, config).then(res => {
        this.setUserMessage(res.data)
        Dialog({
          message: res.msg,
          closeOnClickOverlay: true
        }).then(() => {
          this.$router.back()
        })
      }).catch(err => {
        Dialog({
          message: err,
          closeOnClickOverlay: true
        })
      })
    },
    onConfirm (values) {
      this.value = values.map((item) => item.name).join('/')
      this.showArea = false
    }
  },
  computed: {
    ...mapState('user', ['userMessage']),
    address () {
      const city = this.userMessage.address.split('/')[2]
      const cityArr = Object.values(areaList.county_list)
      const cityIndexArr = Object.keys(areaList.county_list)
      return cityIndexArr[cityArr.indexOf(city)]
    }
  },
  created () {
    this.hide()
  }
}
</script>

<style lang="scss" scoped>
  .back{
    position: absolute;
    top: .1rem;
    left: .1rem;
    font-size: .25rem;
  }

  .update{
    margin: .8rem 0;
    .van-cell{
      font-size: .14rem;
      line-height: .24rem;
      padding: .1rem .16rem;
    }
    .van-button__text{
      font-size: .14rem;
    }
    .login-inp{
      padding: .1rem .16rem;
      font-size: .14rem;
    }
  }
</style>
