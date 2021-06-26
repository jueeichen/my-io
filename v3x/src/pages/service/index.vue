<template>
  <view class="hide-100vh">
    <navbar :parameter="parameter" />
    <view class="service">
      <!-- <view > </view> -->
      <view class="service-container">
        <view class="service-container-top">
          <image src=""></image>
          <view>
            <view>静音 </view>
            <view>广东 深圳</view>
          </view>
        </view>
        <image class="qr-code" src=""></image>
        <view class="service-content-1"> 班主任微信</view>
        <view class="service-content-2"> 扫一扫上面的二维码, 加我微信</view>
      </view>

      <view class="service-content-3"
        >请保存到相册后，微信扫一扫加老师微信号
      </view>
    </view>
    <view class="service-btn">
      <image src="" />
      <view> 保存图片</view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "about",
  components: {
    navbar,
  },
  setup(props) {
    const store = useStore();
    const test = () => {
      console.log("test");
    };
    return {
      tabsHeight: store.state.global.tabsHeight,
      test,
      parameter: {
        title: "班主任微信",
        return: 1,
      },
    };
  },
};
</script>


