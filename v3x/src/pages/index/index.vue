<template>
  <view class="active-page">
    <navbar :parameter="parameter" />
    <view class="active">
      <!-- <login /> -->
      <image
        class="rules-img"
        src="../../static/images/tabs/activity_rules.png"
        mode="widthFix"
        @tap="onShowPop"
      ></image>
      <template v-if="toFreeNum !== null && toFreeNum > 0">
        <image
          class="main-img"
          @tap="jump('/pages/poster/index')"
          :src="
            poster ||
            'https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/activity.png'
          "
        ></image>
        <!-- <template v-if="toFreeNum !== null"> -->
        <view class="position-content" v-if="toFreeNum > 0">
          <view>距离获取免费上学资格</view>
          <view
            ><text> {{ toFreeNum }}</text
            >人</view
          >
        </view>
        <!-- <view class="position-content" v-else>
            <view>已获取免费上学资格</view>
            <view> </view>
          </view>
        </template> -->
      </template>
      <template v-if="toFreeNum !== null && toFreeNum == 0">
        <image
          class="main-img"
          @tap="jump('/pages/poster/index')"
          :src="'../../static/images/tabs/activity-2.jpg'"
        ></image>
      </template>

      <view class="active-title">
        <text> </text>
        <view>升学优惠</view>
        <text> </text>
      </view>

      <!-- <scroll-view class="scroll-view"> -->
      <view class="active-list-ul" v-if="list.length > 0">
        <view
          class="active-list-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- <view class="list-item-title">{{ item.couponName }}</view> -->
          <view class="list-item-content">
            <image :src="item.showImgUrl" mode="widthFix" />
            <view class="list-item-right">
              <view class="list-item-right-top">{{ item.couponName }}</view>
              <view class="list-item-right-center">
                <text>¥</text>
                <text>{{ item.couponDenomination }}</text>
              </view>
              <view class="list-item-right-bottom"
                >有效期：截止{{
                  timestampToStr(item.validEndTime, "Y年M月D日")
                }}</view
              >
            </view>
          </view>
          <view class="sign-right">
            <view
              @tap="getCoupon(item.couponId)"
              class="list-item-right-btn"
              v-if="item.receiveStatus == 0"
              >立即领取</view
            >
            <view
              @tap="navDetail(item)"
              class="list-item-right-btn list-item-right-btn-else"
              v-else
              >立即使用</view
            >
          </view>
        </view>
      </view>
      <!-- </scroll-view> -->
    </view>
    <view class="integral-mask" v-if="isShowPop">
      <view>
        <view> 活动规则 </view>
        <text>
          1、推荐一个用户注册成功获得{{
            global.commonConf.extendRegisterPoint
          }}积分 ，报名成功获得{{
            global.commonConf.extendRegisterPoint
          }}积分，缴学费成功获得{{ global.commonConf.extendSignupPoint }}积分
        </text>
        <text>
          2、推荐{{ global.commonConf.toFreeNum }}名人报名成功，享受免费入学机会
        </text>
        <text> 3、积分与优惠券进行兑换，在“积分商城”中进行兑换。 </text>
        <text> 4、只能在本平台使用，最终解释权归平台所有 </text>
      </view>
      <van-icon
        color="#ffffff"
        name="close"
        @tap="isShowPop = false"
        custom-style="margin-top:100rpx;font-size:54rpx"
      />
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
import { ref, onMounted, toRaw } from "vue";

export default {
  name: "Index",
  components: {
    // NumberDisplay,
    // NumberSubmit,
    // eslint-disable-next-line vue/no-unused-components
    login,
    navbar,
    // eslint-disable-next-line vue/no-unused-components
    cSwiper,
    // eslint-disable-next-line vue/no-unused-components
    listItem,
  },
  setup(props) {
    const store = useStore();

    const isShowPop = ref(false);
    const global = ref("");
    global.value = toRaw(store.state.global);

    const list = ref([]);
    const poster = ref([]);
    const toFreeNum = ref(null);
    const test = () => {
      console.log("test");
    };
    const navDetail = (item) => {
      wx.setStorageSync("indexCouponId", item.couponId);
      wx.navigateTo({
        url: item.jumpUrl,
      });
    };
    const onShowPop = async () => {
      isShowPop.value = true;
      await store.dispatch("global/getProfile");
    };
    const onLoad = async () => {
      await store.dispatch("global/getProfile");
      let res = await store.dispatch("global/getCommonConfImage", "1");
      list.value = res.confImages;
      console.log("list===>", res);
      let res1 = await store.dispatch("global/getCommonConfImage", "101");

      poster.value = res1.confImages[0].showImgUrl;

      console.log("poster===>", res1);
      toFreeNum.value = wx.getStorageSync("commonConf").toFreeNum;
      wx.stopPullDownRefresh();
    };
    onMounted(async () => {
      onLoad();
    });
    const getCoupon = async (id) => {
      console.log(id);
      let res = await store.dispatch("global/receiveCoupon", {
        couponId: id,
      });

      if (res == 10001) {
        return;
      }
      let res1 = await store.dispatch("global/getCommonConfImage", "1");
      list.value = res1.confImages;
    };
    return {
      global,
      isShowPop,
      onShowPop,
      navDetail,
      toFreeNum,
      onLoad,
      splitStr,
      poster,
      list,
      tabsHeight: store.state.global.tabsHeight,
      test,
      getCoupon,
      parameter: {
        title: "活动中心",
      },
      switchProduct: () => {
        wx.switchTab({
          url: "/pages/product/index",
        });
      },
    };
  },
  onShow() {
    // this.getTabBar().setData({
    //   selected: 0,
    // });
    console.log(this.a);
    console.log(this);
  },
  //  onShareAppMessage(options) {
  //   // 设置菜单中的转发按钮触发转发事件时的转发内容
  //   var shareObj = {
  //     title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
  //     path: '/pages/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
  //     imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
  //   }
  //   // 来自页面内的按钮的转发
  //   if (options.from == 'button') {

  //   }
  //   // 返回shareObj
  //   return shareObj;
  // },
  onPullDownRefresh() {
    console.log("用户触发下拉");
    this.onLoad();
  },
  onReachBottom() {
    console.log("用户触发上拉加载更多");
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
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


