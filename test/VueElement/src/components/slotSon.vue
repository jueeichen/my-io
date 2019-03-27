<template>
  <div>
    我是子组件
    这是父组件传来的slot:
    <slot >123</slot>
    <button @click="getUser">点我</button>
  </div>
</template>

<script>
  export default {
    name: "slotSon",
    methods:{
    getUser(){
    this.$emit('showuser','爸爸')
    }
    }
  }
</script>

<style scoped>

</style>