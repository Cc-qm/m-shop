<template>
   <!-- 登录注册 组件 -->
  <div id="apps">
      <div class="login">
          <div class="welcome"><img src="@/assets/images/welcome.png"></div>
          <div class="login-form">
              <div class="login-inp"><label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username"/></div>
              <div class="login-inp"><label>密码</label><input type="password" placeholder="请输入密码" v-model="password"/></div>
              <div class="login-inp"><a href="#" @click="submit()">{{btnName}}</a></div>
          </div>
          <div class="login-txt"><a href="#" @click="redirects('/register')">立即注册</a>|<a href="#" @click="tip()">忘记密码？</a></div>
      </div>
      <div style="text-align:center;">
      </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import instance from '@/utils/http'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      username: '',
      password: '',
      btnName: '立即登录'
    }
  },
  methods: {
    ...mapMutations('tabbar', ['show', 'hide']),
    submit () {
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({
          message: '用户名或则密码不能为空！',
          closeOnClickOverlay: true
        })
        return
      }
      instance.post('/api/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        localStorage.setItem('token', res.token)
        // 跳转到用户页面
        this.$router.replace('/Member')
      }).catch(err => {
        Dialog({
          message: err,
          closeOnClickOverlay: true
        })
      })
    }
  },
  created () {
    this.hide()
  },
  destroyed () {
    this.show()
  }
}
</script>
<style lang="scss" scoped>
  #apps{
    background: red;
    body{font-family:SimHei,'Helvetica Neue',Arial,'Droid Sans',sans-serif;font-size:14px;color:#333;background:#f2f2f2;}
    a, a.link{color:#666;text-decoration:none;font-weight:500;}
    a, a.link:hover{color:#666;}
    h1,h2,h3,h4,h5,h6{font-weight: normal;}

    .login{width:100%;height:100%;background:url(../assets/images/login-bg.png) no-repeat;background-size:cover;position:fixed;z-index:-10;}
    .welcome{width:100%;margin:25% 0;}
    .welcome img{width:100%;}
    .login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
    .login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
    .login-inp input{line-height:30px;color:#fff;background-color:transparent;border:none;outline: none;}
    .login-inp a{display:block;width:100%;text-align:center;line-height:30px;color:#fff;font-size:16px;letter-spacing:5px;}
    .login-txt{text-align:center;color:#fff;font-size: 12px;}
    .login-txt a{color:#fff;padding:0 5px;}

}
</style>
