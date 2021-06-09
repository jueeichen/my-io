<template>
  <navbar :parameter="parameter" />
  <view class="my-order">
    <view class="my-order-index">
      <van-tabs
        :swipeable="true"
        :animated="true"
        :sticky="true"
        :offset-top="tabsHeight"
      >
        <van-tab title="报名待支付">
          <view class="tab-item">
            <my-order-item />
          </view>
        </van-tab>
        <van-tab title="学费待支付">
          <view class="tab-item">
            <my-order-item />
          </view>
        </van-tab>
        <van-tab title="已完成">
          <view class="tab-item">
            <my-order-item />
          </view>
        </van-tab>
      </van-tabs>
    </view>

  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import MyOrderItem from "@/components/myOrderItem/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "myOrder",
  components: {
    navbar, MyOrderItem
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
        title: "我的订单"
      }
    };
  }
};
</script>


