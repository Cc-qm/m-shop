<template>
  <div class="update">
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
      <div style="margin: .16rem;">
        <van-button round block type="info" native-type="submit">
          修改密码
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
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
    }
  },
  computed: {
    ...mapState('user', ['userMessage'])
  }
}
</script>

<style lang="scss" scoped>
  .update{
    margin: 2rem 0;
  }
</style>
