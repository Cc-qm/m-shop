<template>
  <nav>
      <ul>
        <router-link
          v-for="nav in navlist"
          :key="nav.id"
          :to="nav.path"
          tag="li"
          active-class="active"
        >
          <i class="iconfont" :class="nav.icon"></i>
          <span>{{nav.title}}</span>
        </router-link>
      </ul>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      navlist: [
        { id: 1, title: '首页', path: '/home', icon: 'icon-shouye' },
        { id: 2, title: '分类', path: '/category', icon: 'icon-fenlei' },
        { id: 3, title: '购物车', path: '/cart', icon: 'icon-cart_icon' },
        { id: 4, title: '我的', path: '/member', icon: 'icon-ziyuan' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  color:#66ccff;
}
nav{
    position: fixed;
    left:0px;
    bottom:0px;
    z-index: 10;
    background: #fff;
    width:100%;
    height:0.5rem;  //0.5rem  iphone6 ==> 1rem=100px
    ul{
      display: flex;
      li{
        flex:1;
        line-height: 0.25rem;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
