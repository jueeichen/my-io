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
              />
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
            </view>
          </van-tab>
        </van-tabs>
      </view>
    </view>
    <no-data v-if="list.length<1"/>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import noData from "@/components/noData/index.vue";

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
  },
  setup(props) {
    const store = useStore();
    const list = ref([]);
    const active = ref(0);
    // active.value = +props.tid.match(/(?<=(=)).*/g, "")[0];
    active.value = +props.tid.split("=")[1];

    const test = () => {
      console.log("test");
    };
    onMounted(async () => {
      const res = await store.dispatch("global/getOrderList", {
        status: active.value + 1,
      });
      console.log(res);
      list.value = res.orderList;
    });
    const onChange = async (e) => {
      console.log(e);
      const res = await store.dispatch("global/getOrderList", {
        status: e.detail.index + 1,
      });
      console.log(res);
      list.value = res.orderList;
    };
    return {
      active,
      tabsHeight: store.state.global.tabsHeight,
      test,
      list,
      onChange,
      parameter: {
        title: "我的订单",
        return: 1,
      },
    };
  },
};
</script>


