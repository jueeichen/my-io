<template>
  <navbar :parameter="parameter" />
  <view class="integral">
    <view class="integral-top">
      <image src="" />
      <view>
        <view class="integral-top-contet">
          <view class="integral-top-contet-top">
            <image src="" />
            <view class="integral-coin">1261</view>
            <view class="integral-symbol">积分</view>
            <van-icon
              name="arrow"
              class="iconfont integral-arrow"
              color="#fff"
            />
          </view>
          <view class="integral-top-contet-bottom">分享好友赚积分, 享免升学资格喔</view>
          <view class="integral-top-contet-btn">赚积分</view>
        </view>
      </view>
    </view>
    <view class="integral-list">
      <view
        class="integral-list-item"
        v-for="(item,index) in 4"
        :key="index"
      >
        <image class=""></image>
        <view class="integral-list-item-title">中南财经政法大学硕士报名费</view>
        <view class="integral-list-item-bottom">
          <view class="">
            <text class="">360</text>
            <text class="">积分</text>
          </view>
          <view class="">去兑换</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "integral",
  components: {
    navbar
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
        title: "积分商城",
        return: 1

      },
    };
  }
};
</script>


