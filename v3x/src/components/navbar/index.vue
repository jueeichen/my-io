<template>
  <view class="navbar-wrapper">
    <view
      class="navbar fixed"
      :class="{ 'border-bottom:': parameter.border }"
      :style="{ height: navH + 'rpx' }"
    >
      <view class="navbar-top">
        <view
          class="nav-back flex-row"
          @tap="back"
          :class="{ white: parameter.color === 1 }"
          v-if="parameter.return === 1"
        >
          <van-icon name="arrow-left" class="iconfont icon-back" />
        </view>
        <view class="nav-title line1">{{ parameter.title }}</view>
        <view class="nav-right flex-row" v-if="parameter.right === 1">
          <text></text>
        </view>
      </view>
    </view>
    <view class="navbar" :style="{ height: navH + 'rpx' }"></view>
  </view>
</template>

<script>
import { computed } from "vue";
import "./index.styl";
import Taro from '@tarojs/taro'
import { useStore } from "vuex";
export default {
  props: {
    parameter: {
      type: Object,
      default() {
        return {
          parameter: {
            title: " ",
            return: 1,
            background: "#fff",
            color: "#333",
            border: 1,
          },
        };
      },
    },
  },
  setup(props) {
    const store = useStore();
    // const navH = computed(() => store.global.navHeight );
    // console.log(store);
    // console.log(store.state.global.navHeight);
    return {
      navH: store.state.global.navHeight,
      back: () => {
        console.log('点击了返回')
        Taro.navigateBack({
          delta: 1,
          fail(err) {
            Taro.switchTab({
              url: "/pages/index/index",
            });
          },
        });
      },
    };
  },
  // data() {
  //   return {
  //     navH: 0, // 导航标题高度
  //   };
  // },
  // methods: {
  //   back: function () {
  //     uni.navigateBack({
  //       delta: 1,
  //       fail(err) {
  //         uni.switchTab({
  //           url: "/pages/index/index",
  //         });
  //       },
  //     });
  //   },
  // },
  // beforeMount() {
  //   this.navH = getApp().globalData.navHeight;
  // },
};
</script>

