<template>
  <view class="my-order-items">

    <view class="my-order-li-title">
      <view>
        订单号20210409115618
      </view>
      <view>
        已完成
      </view>
    </view>
    <view class="my-order-li-img">
      <image
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg"
        mode="aspectFill"
      ></image>
      <view>
        <view>
          中南财经政法大学定制班
        </view>
        <view>
          信息与科学技术专业
        </view>
      </view>
    </view>
    <view class="my-order-items-li">
      <view>
        学费(含报名费)
      </view>
      <view>
        ¥7500.00
      </view>
    </view>
    <view class="my-order-items-li">
      <view>
        报名费
      </view>
      <view>
        ¥300.00
      </view>
    </view>
    <view class="my-order-items-li">
      <view>
        优惠券
      </view>
      <view style="color:#FF5000">
        -¥600.00
      </view>
    </view>
    <view class="my-order-items-total">
      <view>
        实付金额: ¥
      </view>
      <view>
        6900.00
      </view>
    </view>
    <view class="my-order-items-btn">
      <view>
        报名完成加老师微信号，「我的」-「班主任微信号」
      </view>
      <view>
        查看详情
      </view>
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
  props: {},
  setup(props) {
    const store = useStore();
    return {};
  },
};
</script>
