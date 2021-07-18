<template>
  <view class="my-order-items" v-if="initData.orderNo">
    <!-- <view class="my-order-li-title" @tap="cancel(initData.orderNo)"> -->
    <view class="my-order-li-title" @tap="navDetail">
      <view> 订单号{{ initData.orderNo }} </view>
      <!-- <view>
        {{
          active == 1 ? "报名费待支付" : active == 2 ? "学费待支付" : "已完成"
        }}
      </view> -->
    </view>
    <view class="my-order-li-img" @tap="navDetail">
      <image :src="initData.showImgUrl" mode="aspectFill"></image>
      <view>
        <view> {{ initData.schoolName }} </view>
        <view> {{ initData.productName }} </view>
      </view>
    </view>
    <view class="my-order-items-li" @tap="navDetail">
      <view> 学费(含报名费) </view>
      <view> ¥{{ initData.productPrice }} </view>
    </view>
    <view class="my-order-items-li" @tap="navDetail">
      <view> 报名费 </view>
      <view> ¥{{ initData.signupPrice }} </view>
    </view>
    <view class="my-order-items-li" @tap="navDetail">
      <view> 优惠券 </view>
      <view v-if="active == 1" style="color: #ff5000">
        -¥
        {{
          !initData.signupCouponAmount
            ? 0
            : filterNumber(initData.signupCouponAmount)
        }}
      </view>
      <view v-else-if="active == 2" style="color: #ff5000">
        -¥
        {{
          !initData.tuitionCouponAmount
            ? 0
            : filterNumber(initData.tuitionCouponAmount)
        }}
      </view>
      <view v-else style="color: #ff5000">
        -¥
        {{
          (+initData.signupCouponAmount || 0) +
            (initData.tuitionCouponAmount || 0) ===
          0
            ? 0
            : filterNumber(
                (+initData.signupCouponAmount || 0) +
                  (initData.tuitionCouponAmount || 0)
              )
        }}
      </view>
    </view>
    <view class="my-order-items-total" @tap="navDetail">
      <view>
        {{ active == 1 ? "报名费应付" : active == 2 ? "学费应付" : "实付金额" }}
        : ¥
      </view>
      <view>
        {{
          filterNumber(
            active == 1
              ? initData.signupPayAmount
              : active == 2
              ? initData.productPrice -
                (initData.signupPrice || 0) -
                (initData.tuitionCouponAmount || 0)
              : initData.productPrice -
                (initData.signupCouponAmount || 0) -
                (initData.tuitionCouponAmount || 0)
          )
        }}
      </view>
    </view>
    <view class="my-order-items-btn">
      <view
        >{{
          active == 1
            ? "订单将于23小时59分自动取消"
            : active == 2
            ? "恭喜您已报名成功，请加班主任微信号！（在“我的”-“班主任微信”）"
            : "报名完成加老师微信号，「我的」-「班主任微信号」"
        }}
      </view>

      <view
        class="blue-btn"
        @tap="goPaySign(initData.orderNo)"
        v-if="active == 1"
        >去支付
      </view>
      <view class="blue-btn" @tap="navConfirm" v-else-if="active == 2"
        >学费待支付
      </view>
      <view v-else @tap="navDetail(initData.orderNo)"> 查看详情 </view>
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
    active: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const goPaySign = (orderNo) => {
      store
        .dispatch("global/payOrder", {
          orderNo,
        })
        .then((res) => {
          console.log("res=>", res);
          //支付成功跳转
          ctx.attrs.onChangeActive(1);
        })
        .catch((err) => {
          console.log("err=>", err);
          // 原地不动
        });
    };
    const navConfirm = () => {
      const params = {
        pageType: 1,
        productId: props.initData.productId,
        orderNo: props.initData.orderNo,
        initData: props.initData,
      };
      // debugger
      store.dispatch("global/setConfirmData", params);
      wx.navigateTo({
        url: "/pages/confirm/index",
      });
    };
    const navDetail = (id) => {
      store.dispatch("global/setOrderDetail", {
        ...props.initData,
        active: props.active,
      });
      wx.navigateTo({
        url: "/pages/orderDetail/index?id=" + id,
      });
    };
    const cancel = async (orderNo) => {
      const res = await store.dispatch("global/cancelLorder", {
        orderNo,
      });
    };
    return {
      navDetail,
      goPaySign,
      navConfirm,
      cancel,
    };
  },
};
</script>
