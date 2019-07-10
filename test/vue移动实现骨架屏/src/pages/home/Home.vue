<template>
  <div>
    <h1 class="useLazy">1212425345</h1>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <p>234234234234</p>
    <img  src="../../static/image/img/1.jpg" >

    <lazy-load>
      <h1>lazy-load Demo</h1>

      <ul>
        <li v-for="(src, index) in imgs" :key="index">
          <img class="lazyImg" src="##" :datasrc="src">
        </li>
      </ul>
    </lazy-load>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        imgs: [
          "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg",
           "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg", "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg", "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg", "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg", "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg", "../../static/image/img/1.jpg",
          "../../static/image/img/2.jpg",
          "../../static/image/img/3.jpg",
          "../../static/image/img/4.jpg",
          "../../static/image/img/5.jpg",
          "../../static/image/img/6.jpg",
          "../../static/image/img/7.jpg",
          "../../static/image/img/8.jpg",
          "../../static/image/img/9.jpg",
          "../../static/image/img/10.jpg",
          "../../static/image/img/11.jpg",
        ]
      }
    }
  }

</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/mixins.styl"
  .useLazy
    color red
    text-align center
    p
      display inline-block
      color yellow
      background-color: pink;
      font-size 20PX
      width 350px

  .useLazy {
    min-height: 100vh;
  }

  .useLazy h1 {
    text-align: center;
    padding: 20px;
    background-color: rgb(96, 182, 204);
    color: #fff;
    position: sticky;
    top: 0;
  }

  .useLazy li {
    display: inline-block;
    width: 33%;
    height: 153px;
    padding: 3px;
    box-sizing: border-box;
  }

  .useLazy li img {
    width: 100%;
    height: 100%;
  }
</style>