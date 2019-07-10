<template>
  <div>
    <p @click="$router.back()">返回上一页</p>
    
    <h1>JJJJJJJJJJJ</h1>
    <p>UUUUUUUUUUUU</p>
    <p>EEEEEEEEEEEE</p>
    <p>EEEEEEEEEEEE</p>
    <p>IIIIIIIIIIII</p>
    <p class="test">这是Jueei的demo 点击测试zepto+>home1</p>
    <img :src="imgUrl" alt="">
    <!-- <div v-html="imgData"></div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        imgUrl: "https://img.alicdn.com/tfs/TB1ZLvBOXzqK1RjSZFvXXcB7VXa-520-280.jpg",
        imgData: '<img src="https://img.alicdn.com/tfs/TB1ZLvBOXzqK1RjSZFvXXcB7VXa-520-280.jpg" ><img src="https://img.alicdn.com/tfs/TB1ZLvBOXzqK1RjSZFvXXcB7VXa-520-280.jpg" >'
      }
    },
    mounted() {
      // var _this = this;
      // $('.test').click(function () {
      //   _this.$router.push("/home1")
      // })
      // let data = this.jpgToWebP(this.imgData, ".jpg_640x640q85s150_.webp", ".jpg_640x0q85s150.jpg")
      // this.imgData = data;
      // console.log(data);
      // let data1 = this.autoWebP(this.imgUrl, "_640x640q85s150_.webp", "_640x0q85s150.jpg")
      // console.log(data1);
      // this.imgUrl = data1


      this.getNewsById({name:'d34j1',pass:'12234',auth:'3433',cb:()=>{}}).then(res=>{
        console.log(res)
      })
    },
    methods: {
      ...mapActions(['getNewsById']),
      ...mapActions({getNewsById:'getNewsById'}),
      checkWebp() {
        try {
          return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
        } catch (err) {
          return false;
        }


      },
      autoWebP(src, type1, type2) {
        src = src.replace(/\s/g, '');
        if (this.checkWebp()) {
          src += type1;
        } else {
          src += type2;
        }
        return src;
      },
      jpgToWebP(str, type1, type2) {
        let src;
        if (this.checkWebp()) {
          src = str.replace(/.jpg/g, type1)
        } else {
          src = str.replace(/.jpg/g, type2)
        }
        return src
      }

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
    img 
      width 100vw;  

</style>