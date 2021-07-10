<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="coupon">
      <view class="coupon-index">
        <van-tabs
          color="#479CFE"
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :active="active"
          :offset-top="tabsHeight"
          @change="onChange"
        >
          <van-tab title="待领取">
            <view class="tab-item">
              <coupon-item
                :initData="item"
                @initList="initList"
                :active="1"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data v-if="page > 1 && list.length < 1" />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="待使用">
            <view class="tab-item">
              <coupon-item
                :active="2"
                :initData="item"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data
                :initData="{
                  content: '暂无优惠券~',
                }"
                v-if="page > 1 && list.length < 1"
              />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="已使用">
            <view class="tab-item">
              <coupon-item
                :active="3"
                :initData="item"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data
                :initData="{
                  content: '暂无优惠券~',
                }"
                v-if="page > 1 && list.length < 1"
              />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="已失效">
            <view class="tab-item">
              <coupon-item
                :initData="item"
                :active="4"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data
                :initData="{
                  content: '暂无优惠券~',
                }"
                v-if="page > 1 && list.length < 1"
              />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
        </van-tabs>
      </view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import CouponItem from "@/components/couponItem/index.vue";
import noData from "@/components/noData/index.vue";
import noMore from "@/components/noMore/index.vue";
import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "coupon",
  components: {
    navbar,
    CouponItem,
    noData,
    noMore,
  },
  setup(props) {
    const store = useStore();
    const page = ref(1);
    const pageSize = ref(10);
    const list = ref([]);
    const active = ref(0);
    const showBottomLine = ref(false);
    const getList = async () => {
      let status = active.value;
      active.value === 0 && (status = 101);
      const res = await store.dispatch("global/getCouponList", {
        status,
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
      active.value = 0;
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      getList();
    };
    const onChange = async (e) => {
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      active.value = e.detail.index;
      getList();
    };
    const initList = (status, acitve) => {
      active.value = acitve - 1;
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      getList();
    };
    onMounted(async () => {
      onLoad();
    });

    return {
      tabsHeight: store.state.global.tabsHeight,
      active,
      showBottomLine,
      page,
      pageSize,
      list,
      getList,
      onChange,
      onLoad,
      initList,
      parameter: {
        title: "我的优惠券",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
    if (this.active == 0) {
      this.onLoad();
      return;
    }
    this.active = 0;
  },
  onReachBottom() {
    if (this.showBottomLine) return;
    console.log("用户触发上拉加载更多");
    this.getList();
  },
};
</script>


