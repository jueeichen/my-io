<template>
  <navbar :parameter="parameter" />
  <view class="order">
    <view class="order-top">
      <view class="order-status">
        <text>报名待支付</text>
        <text>为了不影响入学, 请尽快完成支付</text>
      </view>
      <view class="order-top-btn">
        <view>
          <image src="" />
          <text class="active">立即支付</text>
        </view>
        <view>
          <image src="" />
          <text>取消订单 </text>
        </view>
      </view>
    </view>
    <view class="order-detail">
      <view class="order-detail-top">
        <image src="" />
        <view>
          <text>中南财经政法大学定制班</text>
          <text>信息与科学技术专业</text>
        </view>
      </view>
      <view class="order-detail-items">
        <text>学费(含报名费)</text>
        <text>¥7500.00</text>
      </view>
      <view class="order-detail-items">
        <text>报名费</text>
        <text>¥300.00</text>
      </view>
      <view class="order-detail-items">
        <text>报名费优惠券</text>
        <text style="color:#FF5000">-¥100.00</text>
      </view>
      <view class="order-detail-items-bottom-right">
        <text>报名费应付: </text>
        <text>¥</text>
        <text>200.00</text>
      </view>
    </view>
    <view class="order-no">
      <view>
        <text>订单编号</text>
        <text> 1204 7200 3004 1083</text>
      </view>
      <view>
        <text>下单时间</text>
        <text> 2021.04.29 12:00:23</text>

      </view>
      <view>
        <text>支付时间</text>
        <text> 2021.04.29 12:00:23</text>

      </view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "orderDetail",
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
        title: "订单详情"
      }
    };
  }
};
</script>


