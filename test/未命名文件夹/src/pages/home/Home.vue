
<template>
  <div>
    <h1>JJJJJJJJJJJ</h1>
    <p>UUUUUUUUUUUU</p>
    <p>EEEEEEEEEEEE</p>
    <p>EEEEEEEEEEEE</p>
    <p>IIIIIIIIIIII</p>
    <p class="test">这是Jueei的demo 点击测试zepto</p>


    <div class="test1">测试宽度1rem</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      $('.test').click(function () {
        alert('测试zepto成功')
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
.test1{
  width: 1rem;
  height: 1rem;
  background-color: red;
}
</style>