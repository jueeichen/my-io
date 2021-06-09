<template>
  <navbar :parameter="parameter" />
  <view class="active">
    <!-- <login /> -->
    <image
      class="main-img"
      src="../../static/images/activity.png"
      mode="widthFix"
    ></image>

    <view class="active-title">
      <text> </text>
      <view>升学优惠</view>
      <text> </text>
    </view>

    <!-- <scroll-view class="scroll-view"> -->
    <view
      class="active-list-ul"
      v-if="list.length>0"
    >
      <view
        class="active-list-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="list-item-title">{{item.couponName}}</view>
        <view class="list-item-content">
          <image
            src="../../static/images/school-logo.png"
            mode="widthFix"
          />
          <view class="list-item-right">
            <view class="list-item-right-top">{{item.couponName}}</view>
            <view class="list-item-right-center">
              <text>¥</text>
              <text>{{item.couponDenomination}}</text>
            </view>
            <view class="list-item-right-bottom">有效期：截止{{item.validEndTime}}</view>
          </view>
        </view>
        <view
          class="list-item-right-btn"
          v-if="item.receiveStatus==0"
        >立即领取</view>
        <view
          class="list-item-right-btn list-item-right-btn-else"
          v-else
        >立即使用</view>
      </view>
    </view>
    <!-- </scroll-view> -->
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
import { ref, onMounted } from "vue";


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
  setup(props) {
    const store = useStore();
    const list = ref([])
    const test = () => {
      console.log("test");
    };
    onMounted(async () => {
      let res = await store.dispatch("global/getCommonConfImage", "1")
      list.value = res.confImages;
      console.log("list===>", list)
    })
    return {
      list,
      tabsHeight: store.state.global.tabsHeight,
      test,
      parameter: {
        title: "活动中心",
      },
    };
  },
  onShow() {
    // this.getTabBar().setData({
    //   selected: 0,
    // });
  },
  onPullDownRefresh() {
    console.log("用户触发下拉");
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    console.log("用户触发上拉加载更多");
  },
};
</script>


