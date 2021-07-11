<template>
  <swiper
    :style="{ width, height }"
    :indicator-dots="showDots"
    :indicator-color="color"
    :indicator-active-color="activeColor"
    :autoplay="auto"
    :interval="interval"
    :duration="duration"
    :circular="circular"
    @change="onChange"
  >
    <swiper-item
      v-for="(item, index) in initData"
      :key="index"
      @tap="jump(item.jumpUrl || '')"
    >
      <view class="swiper-item">
        <image
          :src="item.showImgUrl || item.imgUrl"
          :style="{ width, height }"
          mode="aspectFill"
        ></image>
        <image v-if="poster" class="qrcode" :src="global.qrcode" mode="aspectFill"></image>

        <!-- {{ item.img }} -->
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
import { computed, ref, onMounted, toRaw } from "vue";
import "./index.styl";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";

export default {
  props: {
    showDots: { type: Boolean, default: true },
    width: { type: String, default: "690rpx" },
    color: { type: String, default: "rgba(255, 255, 255, 0.5)" },
    activeColor: { type: String, default: "rgba(255, 255, 255, 1)" },
    height: { type: String, default: "250rpx" },
    initData: { type: Object, default: () => {} },
    auto: { type: Boolean, default: true },
    poster: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const imgInfo = ref({
      width: 0,
      height: 0,
    });
    const global = ref("");
    const store = useStore();
    global.value = toRaw(store.state.global);

    return {
      global,
      background: [
        {
          url: "",
          img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg",
        },
        {
          url: "",
          img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg",
        },
        {
          url: "",
          img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg",
        },
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 6000,
      duration: 500,
      circular: true,
      jump: (url) => {
        wx.navigateTo({
          url,
        });
      },
    };
  },
};
</script>
