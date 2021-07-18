<template>
  <view class="detail-index">
    <navbar :parameter="parameter" />
    <c-swiper
      v-if="banner.length > 0"
      :initData="banner"
      width="750rpx"
      height="420rpx"
    />

    <view class="aleady-sign">已报名{{ initData.signupNum || 0 }}人</view>
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
      <view class="detail-menu-items" @tap="getCoupon">
        <view class="itme-title">优惠券</view>
        <view class="item-right-btn">
          <text class="">
            {{
              couponIndex === null
                ? "领取"
                : "¥" + couponList[couponIndex].couponDenomination
            }}</text
          >
          <van-icon color="#B4B4B4" name="arrow" class="iconfont" />
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
      <view class="detail-menu-items no-line baozhang">
        <view class="itme-title">保障</view>
        <view class="detail-menu-item-content">
          <view
            class=""
            v-for="(item, index) in initData.serviceTagsList"
            :key="index"
          >
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/label.png"
            />
            <text class=""> {{ item.tagName }} </text>
          </view>
        </view>
      </view>
    </view>
    <view class="detail-rich">
      <van-tabs
        color="#479CFE"
        :active="active"
        :swipeable="true"
        :animated="true"
        :sticky="true"
        :offset-top="tabsHeight"
        @change="onChange"
      >
        <van-tab title="学校简介">
          <view class="tab-item">
            <view
              class="rich-text"
              v-html="filterRichText(initData.schoolIntro)"
            />
          </view>
        </van-tab>
        <van-tab title="优势特点">
          <view class="tab-item">
            <view class="rich-text" v-html="filterRichText(initData.detail)" />

            <!-- <image src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/ys01.png" mode="widthFix" /> -->
            <!-- <image src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/ys02.png" mode="widthFix" /> -->
            <!-- <image src="https://jjlmobile.o/ss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/ys03.png" mode="widthFix" /> -->
          </view>
        </van-tab>
        <van-tab title="拿证流程">
          <view class="tab-item">
            <image src="../../static/images/tabs/process.jpg" mode="widthFix" />
          </view>
        </van-tab>
      </van-tabs>
      <!-- <view class="detail-rich-title">详情</view> -->
    </view>
    <view class="detail-bottom-btn" @tap="navConfirm">
      <view>立即报名</view>
    </view>
    <template v-if="isShowCoupon">
      <view class="coupon-pop-mark"></view>
      <view class="coupon-pop">
        <view>
          <view>优惠券明细</view>
          <image
            src="../../static/images/tabs/close.png"
            @tap="isShowCoupon = false"
          />
          <!-- <van-icon name="cross" @tap="isShowCoupon = false" /> -->
        </view>
        <view v-show="initIndex !== null">
          <view>优惠券 {{ initIndex === null ? "0" : "1" }}张, 共抵扣</view>
          <view
            >¥{{
              initIndex === null
                ? "0"
                : couponList[initIndex].couponDenomination
            }}</view
          >
        </view>
        <view class="coupon-pop-list">
          <coupon-item
            :initData="item"
            :active="item.receiveStatus == 1 ? 0 : 1"
            :index="index"
            :isUse="index == initIndex"
            @use="goUse"
            @initList="initList"
            v-for="(item, index) in couponList"
            :key="index"
          />
        </view>
        <view
          class="detail-bottom-btn"
          @tap="
            () => {
              couponIndex = initIndex;
              isShowCoupon = false;
            }
          "
        >
          <view>确定</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import cSwiper from "@/components/swiper/index.vue";
import navbar from "@/components/navbar/index.vue";
import CouponItem from "@/components/getCoupon/index.vue";

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
    const activeId = wx.getStorageSync("indexCouponId");
    if (activeId) {
      //说明是从活动中心过来的
      console.log("从活动中心过来的");
      wx.setStorageSync("indexCouponId", false);
    }
    // id.value = props.tid.match(/(?<=(=)).*/g, "")[0];
    id.value = props.tid.split("=")[1];
    const onChangeSpecial = (e) => {
      specialIndex.value = e;
    };
    const couponIndex = ref(null);
    const initIndex = ref(null); //未确定的索引
    const goUse = (index) => {
      console.log("use", index);
      if (index < 0) {
        index = null;
      }
      initIndex.value = index;
    };
    const getCoupon = () => {
      if (couponList.value.length < 1) {
        wx.navigateTo({ url: "/pages/coupon/index" });
        return;
      }

      isShowCoupon.value = true;
    };
    const initList = async () => {
      console.log("initList");
      const data = await store.dispatch("global/getCouponList", {
        status: 1,
        couponType: 1,
        page: 1,
        pageSize: 100,
      });
      couponList.value = data.couponInfos;
      console.log("couponList=>", couponList);
      if (activeId) {
        //说明是从活动中心过来的
        console.log("从活动中心过来的122222");
        let newArr = data.couponInfos;
        newArr.map((item, index) => {
          if (item.couponId == activeId) {
            couponIndex.value = index;
            initIndex.value = index;
          }
        });
      }
    };
    onMounted(async () => {
      const res = await store.dispatch("global/getProductDetailById", {
        id: id.value,
      });
      initData.value = res.productInfo;
      console.log("banner=>", banner);
      banner.value = res.productInfo.bannerList;
      console.log("initData1=>", initData);
      // initList();
    });
    const navConfirm = () => {
      let useCounponId = null;
      let couponValue = 0;
      if (couponIndex.value !== null) {
        useCounponId = couponList.value[couponIndex.value].receiveId;
        couponValue = couponList.value[couponIndex.value].couponDenomination;
      }
      const params = {
        pageType: 0,
        productId: id.value,
        orderNo: id.value,
        useCounponId,
        couponValue,
        couponIndex: couponIndex.value,
        specialitiesName:
          initData.value.specialitiesList.length > 0
            ? initData.value.specialitiesList[specialIndex.value]
                .specialitiesName || ""
            : "",
        initData: initData.value,
      };
      store.dispatch("global/setConfirmData", params);
      wx.navigateTo({
        url: "/pages/confirm/index?id=" + id.value,
      });
    };

    return {
      getCoupon,
      goUse,
      initList,
      splitStr,
      navConfirm,
      initIndex,
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
      filterRichText: (text) => {
        if (!text) {
          return "";
        }
        let str = "";
        // text.replace(/<img[^>]*>/gi, function (match) {
        //   str = match.replace(
        //     /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
        //     'style="width:750rpx;" mode="widthFix"'
        //   ); // 替换style
        // });
        text = text.replace(
          /style="width: 750px;"/g,
          'style="width:750rpx;" mode="widthFix"'
        );
        console.log(text);
        // return str;
        return text;
      },
    };
  },
  onShow() {
    this.initList();
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
