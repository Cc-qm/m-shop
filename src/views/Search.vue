<template>
  <div>
    搜索页面
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('tabbar', ['hide'])
  },
  created () {
    this.hide()
  }
}
</script>
