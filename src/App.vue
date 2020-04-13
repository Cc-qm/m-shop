<template>
  <div id="app">
    <router-view/>
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

<style lang="scss">

</style>
