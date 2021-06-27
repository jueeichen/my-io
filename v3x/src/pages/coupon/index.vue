<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="coupon">
      <view class="coupon-index">
        <van-tabs
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :offset-top="tabsHeight"
          @change="onchange"
        >
          <van-tab title="待领取">
            <view class="tab-item" v-if="list.length > 0">
              <coupon-item
                :initData="item"
                @initList="initList"
                :active="1"
                v-for="(item, index) in list"
                :key="index"
              />
            </view>
          </van-tab>
          <van-tab title="待使用">
            <view class="tab-item" v-if="list.length > 0">
              <coupon-item
                :active="2"
                :initData="item"
                v-for="(item, index) in list"
                :key="index"
              />
            </view>
          </van-tab>
          <van-tab title="已使用">
            <view class="tab-item" v-if="list.length > 0">
              <coupon-item
                :active="3"
                :initData="item"
                v-for="(item, index) in list"
                :key="index"
              />
            </view>
          </van-tab>
          <van-tab title="已失效">
            <view class="tab-item" v-if="list.length > 0">
              <coupon-item
                :initData="item"
                :active="4"
                v-for="(item, index) in list"
                :key="index"
              />
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

import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "coupon",
  components: {
    navbar,
    CouponItem,
  },
  setup(props) {
    const store = useStore();
    const test = () => {
      console.log("test");
    };
    const list = ref([]);
    const initList = async (status) => {
      const res = await store.dispatch("global/getCouponList", {
        status,
        couponType: null,
        pageNum: 1,
        pageSize: 10,
      });
      list.value = res.couponInfos;
      console.log("couponList=>", list);
    };
    onMounted(async () => {
      initList(101);
    });
    const onchange = async (e) => {
      console.log(e);
      list.value = [];
      let type = e.detail.index;
      e.detail.index === 0 && (type = 101);

      initList(type);
    };
    return {
      tabsHeight: store.state.global.tabsHeight,
      test,
      list,
      initList,
      onchange,
      parameter: {
        title: "我的优惠券",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


