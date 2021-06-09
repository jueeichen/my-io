<template>
  <view class="detail-index">
    <navbar :parameter="parameter" />
    <c-swiper
      v-if="banner.length>0"
      :initData="banner"
      width="750rpx"
      height="420rpx"
    />
    <!-- <view class=""> </view> -->
    <view
      class="detail-center"
      v-if="true"
    >
      <view class="detail-center-top">
        <view class="">学费</view>
        <text class="">（含报名费）</text>
      </view>
      <view class="detail-center-center">
        <view class="money-left">
          <view class="">¥</view>
          <text class="">7500.00</text>
        </view>
        <view class="money-right">
          <view class="">券后¥</view>
          <text class="">6500.00</text>
        </view>
      </view>
      <view class="school-name">{{initData.schoolName}} </view>
      <view class="school-detail">{{initData.productName}}
      </view>
    </view>

    <view class="detail-menu">
      <view class="detail-menu-items">
        <view class="itme-title">报名费</view>
        <text class="item-right"> ¥{{initData.signupNum}}</text>
      </view>
      <view class="detail-menu-items">
        <view class="itme-title">优惠券</view>
        <view class="item-right-btn">
          <text class=""> 领券</text>
          <van-icon
            name="arrow"
            class="iconfont"
          />
        </view>
      </view>
      <view class="detail-menu-items">
        <view class="itme-title">专业</view>
        <view class="detail-menu-item-content">
          <text
            :class="{'active-detail-menu':index==1}"
            v-for="(item,index) in 6 "
            :key="index"
          > 领券</text>
        </view>
      </view>
      <view class="detail-menu-items no-line">
        <view class="itme-title">保障</view>
        <view class="detail-menu-item-content">
          <view
            class=""
            v-for="(item,index) in 6 "
            :key="index"
          >
            <image />
            <text class="">
              就近考试
            </text>
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
  </view>
</template>

<script>
import cSwiper from "@/components/swiper/index.vue";
import navbar from "@/components/navbar/index.vue";

import { ref, getCurrentInstance, onMounted, useRouter, reactive } from "vue";
import "./index.styl";
import store from '@/store';
// import { useRouter } from '_@tarojs_taro@3.2.1@@tarojs/taro';
// import { useRouter } from '_@tarojs_taro@3.2.1@@tarojs/taro';
export default {
  name: "Index",
  components: {
    cSwiper, navbar

  },
  setup(props) {
    const ctx = getCurrentInstance()
    const id = ref(0)
    const initData = ref({})
    const banner = ref([])



    id.value = props.tid.match(/(?<=(=)).*/g, "")[0]

    onMounted(async () => {
      const res = await store.dispatch('global/getProductDetailById', { id: id.value })
      initData.value = res.productInfo
      banner.value = res.productInfo.bannerList
    console.log("initData1=>", initData)

    })
    return {
      id,
      initData,
      banner,
      parameter: {
        title: "首页",
        return: 1,

      },
    };
  },
};
</script>
