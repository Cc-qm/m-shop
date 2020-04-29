<template>
  <div id="app">
    <transition name= "app" mode="out-in">
      <router-view/>
    </transition>
    <Tabbar v-show="isTabbarShow"></Tabbar>
  </div>
</template>

<script>
// 引入Tabbar组件
import Tabbar from '@/components/Tabbar'
import { mapState } from 'vuex'

export default {
  components: {
    Tabbar
  },
  computed: {
    ...mapState('tabbar', ['isTabbarShow'])
  }
}
</script>

<style lang="scss" scoped>
  .app-enter-active{
    animation: move .3s;
  }
  .app-leave-active{
    animation: move .3s reverse;
  }
  @keyframes move{
    0%{
      opacity: 0;
      transform: translateY(.5rem);
    }
    100%{
      opacity: 1;
      transform: translateY(0rem);
    }
  }
</style>
