
<template>
  <div>
    <h1 class="test">1212425345</h1>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
  </div>
</template>

<script>
  export default {
    mounted() {
      $('.test').click(function () {
        alert('123')
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