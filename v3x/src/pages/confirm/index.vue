<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="confirm-index">
      <view class="confirm-top">
        <image src="" mode="" />
        <view>
          <text>中南财经政法大学</text>
          <text>专业: 科学信息与技术(预报)</text>
        </view>
      </view>
      <view class="confirm-center">
        <view>
          <view>
            <text>学费</text>
            <text> (含报名费)</text>
          </view>
          <text>7500元</text>
        </view>
        <view>
          <view>
            <text>报名费</text>
          </view>
          <text>300元</text>
        </view>
      </view>
      <view class="confirm-bottom">
        <view>
          <view>
            *
            <text> 姓名</text>
          </view>
          <input placeholder="请输入报名人的姓名" v-model="username" />
        </view>
        <view>
          <view>
            *
            <text> 手机号</text>
          </view>
          <input v-model="phone" placeholder="请输入报名人的手机号" />
        </view>
        <view class="confirm-bottom-blue">
          注: 报名完成加老师微信号「我的」-「班主任微信号」
        </view>
      </view>
    </view>
    <view class="confirm-btn">
      <view class="confirm-btn-left">
        <text>报名费:</text>
        <text>100.00</text>
      </view>
      <view class="confirm-btn-right" @tap="sumitOrder"> 提交订单 </view>
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
import "./index.styl";
import navbar from "@/components/navbar/index.vue";
import store from "@/store";

export default {
  components: {
    navbar,
  },
  setup() {
    
    const pay = async (orderNo) => {
      const res = await store.dispatch("global/payOrder", {
        orderNo,
      });
      console.log("res=>", res);
    };
    const sumitOrder = async () => {
      const res = await store.dispatch("global/createOrder", {
        productId: "10001",
        specialitiesName: "10001",
        signuperName: "邓杰",
        signuperMobile: "18077016310",
        signupCouponDetailId: "",
      });
      console.log("res=>", res);
      pay(res.orderNo)
    };
    return {
      parameter: {
        title: "确认订单",
        return: 1,
      },
      sumitOrder,
      pay,
      username: ref(null),
      phone: ref(null),
    };
  },
};
</script>
