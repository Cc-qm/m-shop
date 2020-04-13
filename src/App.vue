<template>
  <div id="app">
    <router-view/>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 引入Tabbar组件
import Tabbar from '@/components/Tabbar'

export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="scss">

</style>
