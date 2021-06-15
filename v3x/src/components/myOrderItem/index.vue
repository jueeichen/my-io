<template>
  <view class="my-order-items" v-if="initData.orderNo">
    <view class="my-order-li-title">
      <view> 订单号{{initData.orderNo}} </view>
      <view> 已完成 </view>
    </view>
    <view class="my-order-li-img">
      <image
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg"
        mode="aspectFill"
      ></image>
      <view>
        <view> {{initData.schoolName}} </view>
        <view>  {{initData.productName}}  </view>
      </view>
    </view>
    <view class="my-order-items-li">
      <view> 学费(含报名费) </view>
      <view> ¥{{initData.productPrice}} </view>
    </view>
    <view class="my-order-items-li">
      <view> 报名费 </view>
      <view> ¥{{initData.signupPrice}} </view>
    </view>
    <view class="my-order-items-li">
      <view> 优惠券 </view>
      <view style="color: #ff5000"> -¥{{initData.signupPayAmount}} </view>
    </view>
    <view class="my-order-items-total">
      <view> 实付金额: ¥ </view>
      <view> {{initData.productPrice-initData.signupPayAmount}}  </view>
    </view>
    <view class="my-order-items-btn">
      <view> 报名完成加老师微信号，「我的」-「班主任微信号」 </view>
      <view> 查看详情 </view>
    </view>
    <!-- <view class="my-order-item-title">中南财经政法大学定制班</view>
    <view class="my-order-items-index">
      <image
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg"
        mode="aspectFill"
      ></image>
      <view>
        <view class="list-item-title">中南财经政法大学定制班</view>
        <view class="fee">¥<text>200.00</text> </view>
        <view class="list-item-tuition">有效期：截止2021年10月01日</view>
      </view>
        <view class="sign-up">立即使用</view>

    </view> -->
  </view>
</template>

<script>
import { computed, ref } from "vue";
import "./index.styl";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
export default {
  props: {
    initData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useStore();
    return {};
  },
};
</script>
