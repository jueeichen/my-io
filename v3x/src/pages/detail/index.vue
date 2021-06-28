<template>
  <view class="detail-index">
    <navbar :parameter="parameter" />
    <c-swiper
      v-if="banner.length > 0"
      :initData="banner"
      width="750rpx"
      height="420rpx"
    />
    <!-- <view class=""> </view> -->
    <view class="detail-center" v-if="true">
      <view class="detail-center-top">
        <view class="">学费</view>
        <text class="">（含报名费）</text>
      </view>
      <view class="detail-center-center">
        <view class="money-left">
          <view class="">¥</view>
          <text class="">{{ initData.productPrice }} </text>
        </view>
        <view class="money-right">
          <view class="">券后¥</view>
          <text class="">{{ initData.useCouponPrice }}</text>
        </view>
      </view>
      <view class="school-name">{{ initData.productName }} </view>
      <view class="school-detail">{{ initData.productTitle }} </view>
    </view>

    <view class="detail-menu">
      <view class="detail-menu-items">
        <view class="itme-title">报名费</view>
        <text class="item-right"> ¥{{ initData.signupPrice }}</text>
      </view>
      <view class="detail-menu-items" @tap="isShowCoupon = true">
        <view class="itme-title">优惠券</view>
        <view class="item-right-btn">
          <text class="">
            {{
              couponIndex === null
                ? "领券"
                : "¥" + couponList[couponIndex].couponDenomination
            }}</text
          >
          <van-icon name="arrow" class="iconfont" />
        </view>
      </view>
      <view class="detail-menu-items">
        <view class="itme-title">专业</view>
        <view class="detail-menu-item-content">
          <text
            @tap="onChangeSpecial(index)"
            :class="{ 'active-detail-menu': index == specialIndex }"
            v-for="(item, index) in initData.specialitiesList"
            :key="index"
            >{{ splitStr(item.specialitiesName, 4) }}</text
          >
        </view>
      </view>
      <view class="detail-menu-items no-line">
        <view class="itme-title">保障</view>
        <view class="detail-menu-item-content">
          <view class="" v-for="(item, index) in initData.serviceTagsList" :key="index">
            <image src="../../static/images/label.png"/>
            <text class=""> {{item.tagName}} </text>
          </view>
        </view>
      </view>
    </view>
    <view class="detail-rich">
      <view class="detail-rich-title">详情</view>

      <view class="rich-text" v-html="initData.detail" />
    </view>
    <view class="detail-bottom-btn" @tap="navConfirm">
      <view>立即报名</view>
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
import cSwiper from "@/components/swiper/index.vue";
import navbar from "@/components/navbar/index.vue";
import CouponItem from "@/components/couponItem/index.vue";

import { ref, getCurrentInstance, onMounted, useRouter, reactive } from "vue";
import "./index.styl";
import store from "@/store";
// import { useRouter } from '_@tarojs_taro@3.2.1@@tarojs/taro';
// import { useRouter } from '_@tarojs_taro@3.2.1@@tarojs/taro';
export default {
  name: "Index",
  components: {
    cSwiper,
    navbar,
    CouponItem,
  },
  setup(props) {
    const ctx = getCurrentInstance();
    const initData = ref({});
    const banner = ref([]);
    const specialIndex = ref(0);
    const isShowCoupon = ref(false);
    const couponList = ref([]);
    const id = ref(0);
    // id.value = props.tid.match(/(?<=(=)).*/g, "")[0];
    id.value = props.tid.split("=")[1];
    const onChangeSpecial = (e) => {
      specialIndex.value = e;
    };
    const couponIndex = ref(null);
    const goUse = (index) => {
      console.log("use", index);
      couponIndex.value = index;
    };
    const initList = async () => {
      console.log("initList");
      const data = await store.dispatch("global/getCouponList", {
        status: 103,
        couponType: 1,
        pageNum: 1,
        pageSize: 10,
      });
      couponList.value = data.couponInfos;
      console.log("couponList=>", couponList);
    };
    onMounted(async () => {
      const res = await store.dispatch("global/getProductDetailById", {
        id: id.value,
      });
      initData.value = res.productInfo;
      console.log("banner=>", banner);
      banner.value = res.productInfo.bannerList;
      console.log("initData1=>", initData);
      initList();
    });
    const navConfirm = () => {
      const params = {
        pageType: 0,
        productId: id.value,
        orderNo: id.value,
        useCounponId: "",
        couponIndex: couponIndex.value,
        specialitiesName:
          initData.value.specialitiesList.length > 0
            ? initData.value.specialitiesList[specialIndex.value]
                .specialitiesName || ""
            : "",
        initData: initData.value,
        couponValue: 0,
      };
      store.dispatch("global/setConfirmData", params);
      wx.navigateTo({
        url: "/pages/confirm/index?id=" + id.value,
      });
    };

    return {
      goUse,
      initList,
      splitStr,
      navConfirm,
      couponIndex,
      couponList,
      id,
      initData,
      banner,
      parameter: {
        title: "详情",
        return: 1,
      },
      onChangeSpecial,
      specialIndex,
      isShowCoupon,
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage({
      ...options,
      path: "/pages/detail/index?id=" + this.id,
    });
  },
};
function splitStr(str, length) {
  if (typeof str === "string") {
    if (typeof length === "number") {
      return str.length > length ? str.substr(0, length) + "..." : str;
    } else {
      return str.length > 6 ? str.substr(0, 6) + "..." : str;
    }
  } else {
    return str;
  }
}
</script>
