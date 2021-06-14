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
      <view class="school-name">{{ initData.schoolName }} </view>
      <view class="school-detail">{{ initData.productName }} </view>
    </view>

    <view class="detail-menu">
      <view class="detail-menu-items">
        <view class="itme-title">报名费</view>
        <text class="item-right"> ¥{{ initData.signupNum }}</text>
      </view>
      <view class="detail-menu-items">
        <view class="itme-title">优惠券</view>
        <view class="item-right-btn">
          <text class="" @tap="isShowCoupon = true"> 领券</text>
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
            >{{ item.specialitiesName }}</text
          >
        </view>
      </view>
      <view class="detail-menu-items no-line">
        <view class="itme-title">保障</view>
        <view class="detail-menu-item-content">
          <view class="" v-for="(item, index) in 6" :key="index">
            <image />
            <text class=""> 就近考试 </text>
          </view>
        </view>
      </view>
    </view>
    <view class="detail-rich">
      <view class="detail-rich-title">详情</view>
      <image />
    </view>
    <view class="detail-bottom-btn">
      <view>立即报名</view>
    </view>
    <template v-if="isShowCoupon">
      <view class="coupon-pop-mark"></view>
      <view class="coupon-pop">
        <view>
          <view>优惠券明细</view>
          <image src="" @tap="isShowCoupon = false" />
        </view>
        <view>
          <view>优惠券 1张, 共抵扣</view>
          <view>¥300.00</view>
        </view>
        <view class="coupon-pop-list">
          <coupon-item
            :initData="item"
            :active="1"
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
    const id = ref(0);
    const initData = ref({});
    const banner = ref([]);
    const specialIndex = ref(0);
    const isShowCoupon = ref(false);
    const couponList = ref([])
    id.value = props.tid.match(/(?<=(=)).*/g, "")[0];
    const onChangeSpecial = (e) => {
      specialIndex.value = e;
    };
    onMounted(async () => {
      const res = await store.dispatch("global/getProductDetailById", {
        id: id.value,
      });
      initData.value = res.productInfo;
      banner.value = res.productInfo.bannerList;
      console.log("initData1=>", initData);
      const data = await store.dispatch("global/getCouponList", {
        status: 101,
        couponType: null,
        pageNum: 1,
        pageSize: 10,
      });
      couponList.value = data.couponInfos;
      console.log("couponList=>", couponList);
    });
    return {
      couponList,
      id,
      initData,
      banner,
      parameter: {
        title: "首页",
        return: 1,
      },
      onChangeSpecial,
      specialIndex,
      isShowCoupon,
    };
  },
};
</script>
