<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="integral">
      <view class="integral-top">
        <image
          src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/integral-bg.png"
        />
        <view>
          <view class="integral-top-contet">
            <view
              class="integral-top-contet-top"
              @tap="jump('/pages/integralDetail/index')"
            >
              <image
                src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/integral.png"
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
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/coupon_miller.png"
          ></image>
          <view class="integral-list-item-title">{{ item.couponName }}</view>
          <view class="integral-list-item-bottom">
            <view class="">
              <text class="">{{ item.exchangePoint }}</text>
              <text class="">积分</text>
            </view>
            <view class="" @tap="exchangeCoupon(item.couponId)">去兑换</view>
          </view>
        </view>
        <no-data v-if="page > 1 && list.length < 1" />
        <no-more v-if="list.length > 0 && showBottomLine" />
      </view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { onMounted, ref, toRaw } from "vue";
import noData from "@/components/noData/index.vue";
import noMore from "@/components/noMore/index.vue";
export default {
  name: "integral",
  components: {
    navbar,
    noData,
    noMore,
  },
  setup(props) {
    const store = useStore();

    const accountPoint = ref(0);
    const getAccountPoint = async () => {
      let res = await store.dispatch("global/getAccountPoint");
      console.log("accountPoint===>", res);
      accountPoint.value = res.accountPoint;
    };
    const exchangeCoupon = (couponId) => {
      wx.showModal({
        title: "提示",
        content: "确认兑换？",
        success: async (e) => {
          if (e.cancel) {
            // 用户点击了取消
          } else if (e.confirm) {
            let res = await store.dispatch("global/exchangeCoupon", {
              couponId,
              exchangeNum: 1,
            });
            if (res.res.code == 10000) {
              wx.showModal({
                title: "提示",
                content: res.res.message,
                showCancel: false,
                success: () => {
                  getAccountPoint();
                },
              });
            }
            console.log(res);
          }
        },
      });
    };
    const page = ref(1);
    const pageSize = ref(10);
    const list = ref([]);
    const showBottomLine = ref(false);
    const getList = async () => {
      const res = await store.dispatch("global/getCouponList", {
        status: 102,
        couponType: null,
        page: page.value,
        pageSize: pageSize.value,
      });
      // list.value = res.couponInfos;
      // console.log("couponList=>", list);
      list.value =
        res.pageNum == 1
          ? res.couponInfos
          : [...list.value, ...res.couponInfos];
      if (res.couponInfos.length == pageSize.value) {
        page.value++;
      } else {
        page.value++;

        console.log("到底了");
        showBottomLine.value = true;
      }
      wx.stopPullDownRefresh();
    };
    const onLoad = async () => {
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      getList();
      getAccountPoint();
    };
    onMounted(async () => {
      onLoad();
    });

    return {
      showBottomLine,
      page,
      pageSize,
      list,
      getList,
      onLoad,
      tabsHeight: store.state.global.tabsHeight,
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
  onPullDownRefresh() {
    console.log("下拉刷新");

    this.onLoad();
  },
  onReachBottom() {
    if (this.showBottomLine) return;
    console.log("用户触发上拉加载更多");
    this.getList();
  },
};
</script>


