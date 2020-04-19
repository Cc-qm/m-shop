<template>
  <div class="update">
    <div class="back iconfont icon-fanhui" @click="back"></div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldPassword"
        type="password"
        name="password"
        label="旧密码"
        placeholder="修改前的密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="newPassword"
        type="password"
        name="newPassword"
        label="新密码"
        placeholder="新的密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="newPassword2"
        type="password"
        name="newPassword2"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '两次输入密码不一致', validator: (value, rule) => value==newPassword}]"
      />
      <div style="margin: .2rem;">
        <van-button round block type="info" native-type="submit">
          修改密码
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Form, Field, Button, Dialog } from 'vant'
import instance from '@/utils/http'

Vue.use(Form).use(Field).use(Button)
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  methods: {
    ...mapMutations('tabbar', ['show', 'hide']),
    onSubmit (values) {
      delete values.newPassword2
      values.username = this.userMessage.username
      // console.log('submit', values)
      if (this.oldPassword === this.newPassword) {
        Dialog({
          message: '新密码不要与旧密码相同！',
          closeOnClickOverlay: true
        })
        return
      }
      instance.patch('/api/updatepassword', values).then(res => {
        Dialog({
          message: res.msg,
          closeOnClickOverlay: true
        }).then(() => {
          localStorage.clear()
          this.$router.push('/login')
        })
      }).catch(err => {
        Dialog({
          message: err,
          closeOnClickOverlay: true
        })
      })
    },
    back () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState('user', ['userMessage'])
  },
  created () {
    this.hide()
  },
  destroyed () {
    // this.show()
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
    margin: 2rem 0;
    // background: linear-gradient(#ffffff, #ade4ff, #ffffff);
    .van-cell{
      font-size: .14rem;
      line-height: .24rem;
      padding: .1rem .16rem;
      background: none;
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
