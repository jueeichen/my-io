<template>
  <navbar :parameter="parameter" />
  <view class="integral-detail">
    <!-- <view></view> -->
    <view class="integral-detail-top">

      <view>可用积分</view>
      <view>1261</view>
      <view>积分规则</view>

    </view>

    <view
      class="index-tabs"
      v-if="true"
    >
      <van-tabs
        :swipeable="true"
        :animated="true"
        :sticky="true"
        :offset-top="tabsHeight"
      >
        <van-tab title="收入">
          <view class="tab-item integral-detail-list">
            <view
              class="integral-detail-item"
              v-for="(item,index) in 5"
              :key="index"
            >
              <view>
                <view>注册成功</view>
                <view>+300</view>
              </view>
              <view>贡 献 人：*亮</view>
              <view>贡 献 ID：1234567</view>
              <view>贡献时间：2021-4-9 12:00:23</view>
              <view>入账时间：2021-4-9 12:00:23</view>
            </view>

          </view>
        </van-tab>
        <van-tab title="支出">
          <view class="tab-item integral-detail-list">
            <view
              class="integral-detail-item"
              v-for="(item,index) in 5"
              :key="index"
            >
              <view>
                <view>注册成功</view>
                <view>-300</view>
              </view>
              <view>贡 献 人：*亮</view>
              <view>贡 献 ID：1234567</view>
              <view>贡献时间：2021-4-9 12:00:23</view>
              <view>入账时间：2021-4-9 12:00:23</view>
            </view>

          </view>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>

import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "integralDetail",
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
        title: "积分明细",
      },
    };
  }
};
</script>


