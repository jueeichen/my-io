
<template>
  <div>
    <h1>333333333444</h1>
    <p @click="$router.back()">返回上一页</p>
    <p>3333333</p>
    <p>EEEEE33333EEEEEEE</p>
    <p>EEEEEE33EEEEEE</p>
    <p>IIIIIII333IIIII</p>
    <p class="test">这是Jueei的demo 点击测试zepto</p>

  </div>
</template>

<script>
  export default {
    mounted() {
    var _this = this;
      $('.test').click(function () {
        _this.$router.push("/home")
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