<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="my-order">
      <view class="my-order-index">
        <van-tabs
          :active="active"
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :offset-top="tabsHeight"
          @change="onChange"
        >
          <van-tab title="报名待支付">
            <view class="tab-item">
              <my-order-item
                :initData="item"
                active="1"
                v-for="(item, index) in list"
                :key="index"
                @changeActive="changeActive"
              />
              <no-data v-if="page > 1 && list.length < 1" />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="学费待支付">
            <view class="tab-item">
              <my-order-item
                :initData="item"
                active="2"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data v-if="page > 1 && list.length < 1" />
              <no-more v-if="list.length > 0 && showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="已完成">
            <view class="tab-item">
              <my-order-item
                :initData="item"
                active="3"
                v-for="(item, index) in list"
                :key="index"
              />
              <no-data v-if="page > 1 && list.length < 1" />
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
import noData from "@/components/noData/index.vue";
import noMore from "@/components/noMore/index.vue";

import MyOrderItem from "@/components/myOrderItem/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "myOrder",
  components: {
    navbar,
    noData,
    MyOrderItem,
    noMore,
  },
  setup(props) {
    const store = useStore();
    // active.value = +props.tid.match(/(?<=(=)).*/g, "")[0];
    const active = ref(0);
    active.value = +props.tid.split("=")[1];

    const page = ref(1);
    const pageSize = ref(10);
    const list = ref([]);
    const showBottomLine = ref(false);
    const getList = async () => {
      const res = await store.dispatch("global/getOrderList", {
        page: page.value,
        pageSize: pageSize.value,
        status: active.value + 1,
      });
      list.value =
        page.value == 1 ? res.orderList : [...list.value, ...res.orderList];
      if (res.orderList.length == pageSize.value) {
        page.value++;
      } else {
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
    };
    const onChange = async (e) => {
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      active.value = e.detail.index;
      getList();
    };
    const changeActive = (index) => {
      active.value = index;
    };
    onMounted(async () => {
      onLoad();
    });

    return {
      active,
      showBottomLine,
      page,
      pageSize,
      getList,
      onLoad,
      tabsHeight: store.state.global.tabsHeight,
      list,
      onChange,
      changeActive,
      parameter: {
        title: "我的订单",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
  onPullDownRefresh() {
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


