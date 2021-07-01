<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="order">
      <view class="order-top">
        <view class="order-status">
          <text>{{ filterStatus(initData.active).status }}</text>
          <text v-if="initData.active != '2'">{{
            filterStatus(initData.active).content
          }}</text>
          <text v-else>{{
            filterStatus(initData.active).content1 +
            timestampToStr(initData.signupPayTime, "Y.M.D h:m:s") +
            filterStatus(initData.active).content2
          }}</text>
        </view>
        <view class="order-top-btn"  v-if="initData.active != '3'">
          <view
            v-if="initData.active == '1'"
            @tap="goPaySign(initData.orderNo)"
          >
            <image src="../../static/images/payment@2x.png" />
            <text class="active">立即支付</text>
          </view>
          <view v-else @tap="navConfirm">
            <image src="../../static/images/payment@2x.png" />

            <text class="active">立即支付</text>
          </view>
          <view @tap="cancel(initData.orderNo)" v-if="initData.active == '1'">
            <image src="../../static/images/cancel_order@2x.png" />

            <text>取消订单 </text>
          </view>
        </view>
      </view>
      <view class="order-detail">
        <view class="order-detail-top">
          <image :src="initData.showImgUrl" />
          <view>
            <text>{{ initData.schoolName }}</text>
            <text>{{ initData.specialitiesName }}</text>
          </view>
        </view>
        <view class="order-detail-items">
          <text>学费(含报名费)</text>
          <text>¥{{ initData.productPrice }} </text>
        </view>
        <view class="order-detail-items">
          <text>报名费</text>
          <text>¥{{ initData.signupPrice }}</text>
        </view>
        <view class="order-detail-items">
          <text>优惠券</text>
          <text style="color: #ff5000"
            >-¥
            {{
              initData.active == 1
                ? initData.signupCouponAmount || 0
                : initData.active == 2
                ? initData.tuitionCouponAmount || 0
                : (+initData.signupCouponAmount || 0) +
                  (initData.tuitionCouponAmount || 0)
            }}</text
          >
        </view>
        <view class="order-detail-items-bottom-right">
          <text>报名费应付: </text>
          <text>¥</text>
          <text>
            {{
              filterNumber(
                initData.active == 1
                  ? initData.signupPayAmount
                  : initData.active == 2
                  ? initData.productPrice -
                    (initData.signupPrice || 0) -
                    (initData.tuitionCouponAmount || 0)
                  : initData.productPrice -
                    (initData.signupCouponAmount || 0) -
                    (initData.tuitionCouponAmount || 0)
              )
            }}</text
          >
        </view>
      </view>
      <view class="order-no">
        <view>
          <text>订单编号</text>
          <text>{{ initData.orderNo }}</text>
        </view>
        <view>
          <text>下单时间</text>
          <text>{{ timestampToStr(initData.createDate, "Y.M.D h:m:s") }}</text>
        </view>
        <view v-if="initData.active == '3'">
          <text>支付时间</text>
          <text>{{
            timestampToStr(initData.signupPayTime, "Y.M.D h:m:s")
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import "./index.styl";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "orderDetail",
  components: {
    navbar,
  },
  setup(props) {
    const store = useStore();
    const initData = ref({});
    initData.value = store.state.global.orderDetail;
    console.log("orderDetail=>", initData.value);

    const test = () => {
      console.log(store);
    };
    const cancel = async (orderNo) => {
      const res = await store.dispatch("global/cancelLorder", {
        orderNo,
      });
      wx.redirectTo({
        url: "/pages/myOrder/index",
      });
    };
    const goPaySign = (orderNo) => {
      store
        .dispatch("global/payOrder", {
          orderNo,
        })
        .then((res) => {
          console.log("res=>", res);
          //支付成功跳转
          wx.navigateTo({
            url: "/pages/myOrder/index?id=0",
          });
        })
        .catch((err) => {
          console.log("err=>", err);
          // 原地不动
        });
    };
    const navConfirm = () => {
      const params = {
        pageType: 1,
        productId: initData.value.productId,
        orderNo: initData.value.orderNo,
        initData: initData.value,
      };

      // debugger
      store.dispatch("global/setConfirmData", params);
      wx.navigateTo({
        url: "/pages/confirm/index",
      });
    };
    return {
      goPaySign,
      navConfirm,
      tabsHeight: store.state.global.tabsHeight,
      test,
      cancel,
      initData,
      parameter: {
        title: "订单详情",
        return: 1,
      },
      filterStatus: (type) => {
        let obj = {
          status: "报名待支付",
          content: "为了不影响入学, 请尽快完成支付",
        };
        if (type == "2") {
          obj = {
            status: "学费待支付",
            content: " ",
            content1: "订单将于",
            content2: "自动取消",
          };
        }
        if (type == "3") {
          obj = {
            status: "已完成",
            content: "报名完成加老师微信号，「我的」-「班主任微信号」",
          };
        }
        return obj;
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


