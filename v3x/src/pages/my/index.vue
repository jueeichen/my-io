<template>
  <view>
    <navbar :parameter="parameter" />
    <login ref="login" @cancel="cancel" />

    <view class="my">
      <!-- <view class=""> </view> -->
      <view class="my-top">
        <view class="my-top-left">
          <view class="my-open-data">
            <view>
              <open-data type="userAvatarUrl"></open-data>
            </view>
            <view class="">
              <open-data type="groupName" open-gid="xxxxxx"></open-data>
              <open-data type="userNickName"></open-data>
            </view>
          </view>
          <view v-if="userInfo.productId" class="my-top-btn" @tap="jump('/pages/myOrder/index?id=1')">
            去缴学费
          </view>
        </view>
        <view class="my-top-bottom">
          <view class="" @tap="jumpByLogin('/pages/coupon/index')">
            <view class="my-top-detail"
              >{{ userInfo.unuseCount || 0 }}
              <text>{{ userInfo.receiveCount || 0 }}张可领</text>
            </view>
            <view class="my-top-menu"
              >优惠券
              <van-icon name="arrow" class="iconfont icon-back" />
            </view>
          </view>
          <view class="" @tap="jumpByLogin('/pages/integral/index')">
            <view class="my-top-detail">{{ accountPoint || 0 }} </view>
            <view class="my-top-menu"
              >积分商城
              <van-icon name="arrow" class="iconfont icon-back" />
            </view>
          </view>
          <view class="" @tap="jumpByLogin('/pages/poster/index')">
            <view class="">
              <image
                src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/poster_icon@2x.png"
                class=""
              />
            </view>
            <view class="my-top-menu">推广海报 </view>
          </view>
        </view>
      </view>
      <view class="my-center">
        <view class="" @tap="jump('/pages/myOrder/index?id=0')">
          <image
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/payment_sign_icon@2x.png"
            class=""
          >
          </image>
          <view class="">报名待支付 </view>
        </view>
        <view class="" @tap="jump('/pages/myOrder/index?id=1')">
          <image
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/payment_tuition_icon@2x.png"
            class=""
          >
          </image>
          <view class="">学费待支付 </view>
        </view>
        <view class="" @tap="jump('/pages/myOrder/index?id=2')">
          <image
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/payment_succes_icon@2x.png"
            class=""
          >
          </image>

          <view class="">已完成 </view>
        </view>
        <view class="" @tap="jump('/pages/myOrder/index?id=0')">
          <image
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/all_order_icon@2x.png"
            class=""
          >
          </image>
          <view class="">全部订单 </view>
        </view>
      </view>
      <image
        src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/mine_activity@2x.png"
        class="my-main-img"
        v-if="false"
      />
      <view class="my-bottom">
        <view class="my-bottom-item" @tap="jump('/pages/service/index')">
          <view class="my-bottom-item_left">
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/teacher_icon@2x.png"
            />
            <view class="">班主任微信 </view>
          </view>
          <van-icon name="arrow" class="iconfont icon-back" />
        </view>
        <view class="my-bottom-item" @tap="jumpByLogin('/pages/process/index')">
          <view class="my-bottom-item_left">
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/procss_icon@2x.png"
            />
            <view class="">拿证流程 </view>
          </view>
          <van-icon name="arrow" class="iconfont icon-back" />
        </view>
        <view class="my-bottom-item" @tap="jump('/pages/about/index')">
          <view class="my-bottom-item_left">
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/my/about_us@2x.png"
            />
            <view class="">关于我们 </view>
          </view>
          <van-icon name="arrow" class="iconfont icon-back" />
        </view>
      </view>
      <!-- userId: {{ userInfo.userId }} -->
    </view>
  </view>
</template>

<script>
// import NumberDisplay from "@/components/NumberDisplay.vue";
// import NumberSubmit from "@/components/NumberSubmit.vue";
import login from "@/components/login/index.vue";
import navbar from "@/components/navbar/index.vue";
import cSwiper from "@/components/swiper/index.vue";
import listItem from "@/components/listItem/index.vue";
import "./index.styl";
import { useStore } from "vuex";
import Taro from "@tarojs/taro";
import { onMounted, ref } from "vue";

export default {
  name: "Index",
  components: {
    // NumberDisplay,
    // NumberSubmit,
    login,
    navbar,
    cSwiper,
    listItem,
  },
  setup(prop) {
    const store = useStore();
    const userInfo = ref({});
    const accountPoint = ref(0);

    const navTarget = (e) => {
      wx.navigateTo({
        url: e,
      });
    };
    const onLoad = async () => {
      let res = await store.dispatch("global/getAccountPoint");
      accountPoint.value = res.accountPoint;
      await store.dispatch("global/getUserInfo");
      userInfo.value = store.state.global.userInfo;
      console.log(userInfo);
    };
    onMounted(async () => {
      onLoad();
    });
    const isLogin = () => {
      return new Promise((resolve) => {
        const userInfo = wx.getStorageSync("userInfo");
        if (userInfo && !userInfo.mobile) {
          //需要登录
          this.$refs.login.open();
        } else {
          resolve();
        }
      });
    };
    const jump = (url) => {
      wx.navigateTo({
        url,
      });
    };
    const jumpByLogin = async (url) => {
      await isLogin();
      jump(url);
    };
    return {
      accountPoint,
      userInfo,
      tabsHeight: store.state.global.tabsHeight,
      navTarget,
      onLoad,
      cancel: () => {
        wx.switchTab({ url: "/pages/index/index" });
      },
      parameter: {
        title: "我的",
      },
      isLogin,
      jump,jumpByLogin
    };
  },

  onShow() {
    console.log(Taro.getApp());

    // this.$refs.login.open()

    // this.getTabBar().setData({
    //   selected: 0,
    // });
  },
  onPullDownRefresh() {
    console.log("用户触发下拉");
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    console.log("用户触发上拉加载更多");
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


