<template>
  <view class="index">
    <text class="btn">{{ msg }}</text>
    <!-- <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/1-001.png" mode="" />
    <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/1-002.png" mode="" />
    <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/2-001.png" mode="" />
    <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/2-002.png" mode="" />
    <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/3-001.png" mode="" />
    <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/3-002.png" mode="" /> -->
  </view>
</template>

<script>
import { ref } from 'vue'


export default {
  setup () {
    const msg = ref('123')
    return {
      msg
    }
  }
}
</script>
