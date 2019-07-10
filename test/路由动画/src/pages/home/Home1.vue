
<template>
  <div>
    <p @click="$router.back()">返回上一页</p>

    <h1>22222222222222222</h1>
    <p>222222222222222222</p>
    <p>222222222222</p>
    <p>2222222222222</p>
    <p class="test">跳转到3 往右翻</p>
  </div>
</template>

<script>
  export default {
    mounted() {
      var _this = this;
      $('.test').click(function () {
        _this.$router.push("/home2")
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/mixins.styl"
  div
    color red
    text-align center
    p
      display inline-block
      color yellow
      background-color: pink;
      font-size 20PX
      width 350px

</style>