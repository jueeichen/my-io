<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="confirm-index">
      <view class="confirm-top">
        <image :src="confirmData.initData.showImgUrl" mode="" />
        <view>
          <text>{{ confirmData.initData.schoolName }}</text>
          <text>专业:{{ confirmData.specialitiesName }}</text>
        </view>
      </view>
      <view class="confirm-center">
        <view>
          <view>
            <text>学费</text>
            <text> (含报名费)</text>
          </view>
          <text>{{ confirmData.initData.productPrice }}元</text>
        </view>
        <view>
          <view>
            <text>报名费</text>
          </view>
          <text>{{ confirmData.initData.signupPrice }}元</text>
        </view>
        <view @tap="isShowCoupon = true">
          <view>
            <text>优惠券</text>
          </view>
          <text>
            {{
              couponIndex === null
                ? "领券"
                : "¥" +
                  (couponList.length > 0
                    ? couponList[couponIndex].couponDenomination
                    : 0)
            }}</text
          >
        </view>
      </view>

      <view class="confirm-bottom">
        <view>
          <view>
            *
            <text> 姓名</text>
          </view>
          <input
            placeholder="请输入报名人的姓名"
            v-model="username"
            :disabled="pageType == 1"
          />
        </view>
        <view>
          <view>
            *
            <text> 手机号</text>
          </view>
          <input
            v-model="phone"
            type="number"
            placeholder="请输入报名人的手机号"
            :disabled="pageType == 1"
          />
        </view>
        <view class="confirm-bottom-blue">
          注: 报名完成加老师微信号「我的」-「班主任微信号」
        </view>
      </view>
    </view>
    <view class="confirm-btn">
      <view class="confirm-btn-left">
        <text>{{ pageType == 1 ? "学费" : "报名费" }}:</text>
        <text v-if="pageType == 0">{{
          confirmData.initData.signupPrice -
          (couponList.length > 0
            ? couponList[couponIndex].couponDenomination
            : 0)
        }}</text>
        <text v-else>{{
          confirmData.initData.productPrice -
          confirmData.initData.signupPrice -
          (couponList.length > 0
            ? couponList[couponIndex].couponDenomination
            : 0)
        }}</text>
      </view>
      <view class="confirm-btn-right" @tap="sumitOrder"> 提交订单 </view>
    </view>
    <template v-if="isShowCoupon">
      <view class="coupon-pop-mark"></view>
      <view class="coupon-pop">
        <view>
          <view>优惠券明细</view>
          <!-- <image src="" @tap="isShowCoupon = false" /> -->
          <van-icon name="cross" @tap="isShowCoupon = false" />
        </view>
        <view>
          <view>优惠券 {{ couponIndex === null ? "0" : "1" }}张, 共抵扣</view>
          <view
            >¥{{
              couponIndex === null
                ? "0"
                : couponList[couponIndex].couponDenomination
            }}</view
          >
        </view>
        <view class="coupon-pop-list">
          <coupon-item
            :initData="item"
            :active="item.receiveStatus == 1 ? 2 : 1"
            :index="index"
            :isUse="couponIndex === index"
            @use="goUse"
            @initList="initList"
            v-for="(item, index) in couponList"
            :key="index"
          />
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { ref, onMounted } from "vue";
import CouponItem from "@/components/couponItem/index.vue";

import "./index.styl";
import navbar from "@/components/navbar/index.vue";
import store from "@/store";

export default {
  components: {
    navbar,
    CouponItem,
  },
  setup(props) {
    const isShowCoupon = ref(false);

    const username = ref(null);
    const phone = ref(null);
    const pageType = ref(0); // 0-报名确认页 1-学费确认页
    const couponList = ref([]);
    const couponIndex = ref(0);

    const id = ref(0);
    // id.value = props.tid.match(/(?<=(=)).*/g, "")[0];
    console.log(store.state.global.confirmData);
    const confirmData = store.state.global.confirmData;
    pageType.value = confirmData.pageType;
    if (pageType.value == 1) {
      phone.value = confirmData.initData.signuperMobile;
      username.value = confirmData.initData.signuperName;
    }
    if (pageType.value == 0) {
      couponIndex.value = confirmData.couponIndex || 0;
    }
    const pay = async (orderNo) => {
      const res = await store.dispatch("global/payOrder", {
        orderNo,
      });
      console.log("res=>", JSON.parse(res.orderStr));
      const params = JSON.parse(res.orderStr);
      delete params.appId;
      const data = await store.dispatch("global/wxPay", params);
      console.log("data=>", data);
    };
    const sumitOrder = async () => {
      if (pageType.value == 1) {
        if (couponList.value.length > 0) {
          await store.dispatch("global/selectCounpon", {
            orderNo: confirmData.orderNo,
            tuitionCouponDetailId:
              couponList.value[couponIndex.value].receiveId,
          });
        }

        pay(confirmData.orderNo);
        return;
      }
      const res = await store.dispatch("global/createOrder", {
        productId: confirmData.productId,
        specialitiesName: confirmData.specialitiesName,
        signuperName: username.value,
        signuperMobile: phone.value,
        signupCouponDetailId: couponList.value[couponIndex.value].receiveId,
      });

      pay(res.orderNo);
    };
    const goUse = (index) => {
      console.log("use", index);
      couponIndex.value = index;
    };
    const initList = async () => {
      const data = await store.dispatch("global/getCouponList", {
        status: 103,
        couponType: pageType.value == 1 ? "2" : "1", // 1-报名费抵扣优惠券 2-学费抵扣优惠券
        pageNum: 1,
        pageSize: 10,
      });
      couponList.value = data.couponInfos;
      console.log("couponList=>", couponList);
    };
    onMounted(async () => {
      initList();
    });
    return {
      initList,
      goUse,
      parameter: {
        title: pageType.value == 1 ? "确认学费" : "确认报名",
        return: 1,
      },
      pageType,
      couponList,
      couponIndex,
      sumitOrder,
      pay,
      confirmData,
      username,
      phone,
      isShowCoupon,
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>
