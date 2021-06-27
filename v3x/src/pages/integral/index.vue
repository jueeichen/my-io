<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="integral">
      <view class="integral-top">
        <image src="../../static/images/integral-bg.png" />
        <view>
          <view class="integral-top-contet">
            <view
              class="integral-top-contet-top"
              @tap="jump('/pages/integralDetail/index')"
            >
              <image
                src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/integral.png"
              />
              <view class="integral-coin">{{ accountPoint }}</view>
              <view class="integral-symbol">积分</view>
              <van-icon
                name="arrow"
                class="iconfont integral-arrow"
                color="#fff"
              />
            </view>
            <view class="integral-top-contet-bottom"
              >分享好友赚积分, 享免升学资格喔</view
            >
            <view
              class="integral-top-contet-btn"
              @tap="jump('/pages/poster/index')"
              >赚积分</view
            >
          </view>
        </view>
      </view>
      <view class="integral-list">
        <view
          class="integral-list-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <image
            class=""
            src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/school-logo.png"
          ></image>
          <view class="integral-list-item-title">{{ item.couponName }}</view>
          <view class="integral-list-item-bottom">
            <view class="">
              <text class="">{{ item.couponDenomination }}</text>
              <text class="">积分</text>
            </view>
            <view class="" @tap="exchangeCoupon(item.couponId)">去兑换</view>
          </view>
        </view>
      </view>
    </view>
    <view class="integral-mask"> </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "integral",
  components: {
    navbar,
  },
  setup(props) {
    const store = useStore();
    const test = () => {
      console.log("test");
    };
    const accountPoint = ref(0);
    const list = ref([]);
    const exchangeCoupon = async (couponId) => {
      let res = await store.dispatch("global/exchangeCoupon", {
        couponId,
        exchangeNum: 1,
      });
      // if(res.res.code==10000){
      wx.showModal({
        title: "提示",
        content: res.res.message,
      });
      // }
      console.log(res);
    };
    onMounted(async () => {
      let res = await store.dispatch("global/getAccountPoint");
      // list.value = res.confImages;
      console.log("res===>", res);
      accountPoint.value = res.accountPoint;

      const res1 = await store.dispatch("global/getCouponList", {
        status: 102,
        couponType: null,
        pageNum: 1,
        pageSize: 10,
      });
      list.value = res1.couponInfos;
      console.log("couponList=>", list);
    });

    return {
      list,
      tabsHeight: store.state.global.tabsHeight,
      test,
      exchangeCoupon,
      accountPoint,
      parameter: {
        title: "积分商城",
        return: 1,
      },
      jump: (url) => {
        wx.navigateTo({
          url,
        });
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


