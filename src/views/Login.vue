<template>
   <!-- 登录注册 组件 -->
  <div id="apps">
      <div class="login">
          <div class="welcome"><img src="@/assets/images/welcome.png"></div>
          <div class="login-form">
            <div v-if="isShowLogin">
              <div class="login-inp"><label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username"/></div>
              <div class="login-inp"><label>密码</label><input type="password" placeholder="请输入密码" v-model="password"/></div>
            </div>
            <div v-else class="register">
              <div class="tip">用户名与密码为必填项哦~~</div>
              <div class="login-inp"><label>用户名</label><input type="text" placeholder="请输入用户名" v-model="username"/></div>
              <div class="login-inp"><label>密码</label><input type="password" placeholder="请输入密码" v-model="password"/></div>
              <div class="login-inp"><label>确认密码</label><input type="password" placeholder="请确认密码" v-model="password2"/></div>
              <div class="login-inp"><label>昵称</label><input type="text" placeholder="请输入昵称" v-model="nickname"/></div>
              <div class="login-inp" style="border:0">
                <label>头像上传</label>
                <van-uploader :max-count="1" v-model="fileList"/>
               </div>
            </div>
            <div class="login-inp"><a href="#" @click="submit()">{{btnName}}</a></div>
          </div>
          <div class="login-txt"><a href="#" @click="isShowLogin=!isShowLogin">{{btnName2}}</a>|<a href="#" @click="tip()">忘记密码？</a></div>
      </div>
      <div style="text-align:center;">
      </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import instance from '@/utils/http'
import { Dialog, Form, Uploader } from 'vant'
import Vue from 'vue'

Vue.use(Form).use(Uploader)

export default {
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      nickname: '',
      fileList: [],
      isShowLogin: true
    }
  },
  computed: {
    btnName () {
      return this.isShowLogin ? '立即登录' : '立即注册'
    },
    btnName2 () {
      return this.isShowLogin ? '立即注册' : '立即登录'
    }
  },
  methods: {
    ...mapMutations('tabbar', ['show', 'hide']),
    // 提交登录请求
    submit () {
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({
          message: '用户名或则密码不能为空！',
          closeOnClickOverlay: true
        })
        return
      }
      if (this.btnName === '立即登录') {
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
      } else {
        if (this.password !== this.password2) {
          Dialog({
            message: '两次输入的密码不一致！',
            closeOnClickOverlay: true
          })
          return
        }
        const params = new FormData()
        params.set('username', this.username)
        params.set('password', this.password)
        params.set('nickname', this.nickname)
        if (this.fileList.length > 0) {
          params.set('files', this.fileList[0].file)
        }
        // console.log(params)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        instance.post('/api/reg', params, config).then(res => {
          console.log(res)
        }).catch(err => {
          Dialog({
            message: err,
            closeOnClickOverlay: true
          })
        })
      }
    },
    tip () {
      Dialog({
        message: '该功能正在努力开发中~~~',
        closeOnClickOverlay: true
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
    .login-inp label{width:5em;text-align:center;display:inline-block;color:#fff;}
    .login-inp input{line-height:30px;color:#fff;background-color:transparent;border:none;outline: none;}
    .login-inp a{display:block;width:100%;text-align:center;line-height:30px;color:#fff;font-size:16px;letter-spacing:5px;}
    .login-txt{text-align:center;color:#fff;font-size: 12px;}
    .login-txt a{color:#fff;padding:0 5px;}
    .register{
      position: relative;
    }
    .tip{
      position: absolute;
      top: -.3rem;
      left: .3rem;
      color: #f00;
    }
}
</style>
