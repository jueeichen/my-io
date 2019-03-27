
<template>
  <div>
    <h1>JJJJJJJJJJJ</h1>
    <p>UUUUUUUUUUUU</p>
    <p>EEEEEEEEEEEE</p>
    <p>EEEEEEEEEEEE</p>
    <p>IIIIIIIIIIII</p>
    <p class="test">这是Jueei的demo 点击测试zepto+>home1</p>
  </div>
</template>

<script>
  export default {
    mounted() {
      var _this = this;
      $('.test').click(function () {
          _this.$router.push("/home1")
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