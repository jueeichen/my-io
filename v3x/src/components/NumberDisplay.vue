<template>
  <view>
    <text class="title">{{ getNumbers }}</text>
  </view>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    console.log(store)
    const getNumbers = computed(() => store.getters['modulesA/getNumbers'])
    console.log(store.state.modulesA)
    return {
      getNumbers
    }
  }
}
</script>

<style>
.title {
  font-size: 40px;
}
</style>
