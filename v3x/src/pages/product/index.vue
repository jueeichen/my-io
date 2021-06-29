<template>
  <view>
    <navbar :parameter="parameter" />
    <login />

    <view class="product-index">
      <c-swiper v-if="true" :initData="banner.confImages"  width="690rpx"
      height="250rpx" />
      <view class="index-tabs" v-if="true">
        <van-tabs
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :offset-top="tabsHeight"
          :active="active"
          @change="onChange"
        >
          <van-tab title="推荐">
            <view class="tab-item" v-if="list">
              <list-item
                v-for="(item, index) in list"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list.length < 1" />
              <no-more v-if="showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="本科教育">
            <view class="tab-item">
            <list-item
                v-for="(item, index) in list"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list.length < 1" />
              <no-more v-if="showBottomLine" />
            </view>
          </van-tab>
          <van-tab title="研究生">
            <view class="tab-item">
            <list-item
                v-for="(item, index) in list"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list.length < 1" />
              <no-more v-if="showBottomLine" />
            </view>
          </van-tab>
        </van-tabs>
      </view>
      <button
        v-if="false"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        获取手机号
      </button>
    </view>
  </view>
</template>

<script>
import noData from "@/components/noData/index.vue";
import noMore from "@/components/noMore/index.vue";

import login from "@/components/login/index.vue";
import navbar from "@/components/navbar/index.vue";
import cSwiper from "@/components/swiper/index.vue";
import ListItem from "@/components/listItem/index.vue";
import $api from "@/api/index.ts";

import "./index.styl";
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";

// const store = useStore();

// console.log($api);
export default {
  name: "Index",
  components: {
    // NumberDisplay,
    // NumberSubmit,
    noData,
    login,
    navbar,
    cSwiper,
    ListItem,
    noMore,
  },
  setup(props) {
    const page = ref(1);
    const pageSize = ref(10);
    const store = useStore();
    const _code = ref(0);
    const banner = ref([]);
    const list = ref([]);
    const active = ref(0);
    const showBottomLine = ref(false);
    const getList = async () => {
      const res = await store.dispatch("product/getList", {
        page: page.value,
        pageSize: pageSize.value,
      });
      list.value =
        page.value == 1
          ? res.productInfos
          : [...list.value, ...res.productInfos];
      if (res.productInfos.length == pageSize.value) {
        page.value++;
      } else {
        console.log("到底了");
        showBottomLine.value = true;
      }
      wx.stopPullDownRefresh();
    };
    const getListByType = async () => {
      const res = await store.dispatch("product/getListByType", {
        page: page.value,
        pageSize: pageSize.value,
        type: active.value,
      });
      
      list.value =
        page.value == 1
          ? res.productInfos
          : [...list.value, ...res.productInfos];
      if (res.productInfos.length == pageSize.value) {
        page.value++;
      } else {
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
      banner.value = await store.dispatch("global/getCommonConfImage", "2");
      getList();
    };
    const onChange = (e) => {
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      console.log(e.detail.index);
      active.value = e.detail.index;
      if (active.value == 0) {
        getList();
        return;
      }
      getListByType();
    };
    onMounted(async () => {
      onLoad();
      console.log(banner.value);
      list.value = store.state.product.list;
      console.log(list);
    });
    return {
      showBottomLine,
      onChange,
      getList,
      onLoad,
      page,
      pageSize,
      splitStr,
      active,
      banner,
      tabsHeight: store.state.global.tabsHeight,
      list,
      list_1: store.state.product.list_1,
      list_2: store.state.product.list_2,
      code: _code,
      parameter: {
        title: "产品",
        return: 1,
      },
      getPhoneNumber: async (e) => {
        let data = await $api(
          "DECRYPTPHONE",
          {
            // code:_code.value,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
          },
          {},
          {}
        );
        console.log(data);
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
  onShow() {
    // console.log(this);
    // this.getTabBar().setData({
    //   selected: 1,
    // });
  },
  onPullDownRefresh() {
    if (this.acitve == 0) {
      this.onLoad();
      return;
    }
    this.acitve = 0;
  },
  onReachBottom() {
    if (this.showBottomLine) return;
    console.log("用户触发上拉加载更多");
    if (this.acitve == 0 || this.acitve == undefined) {
      this.acitve = 0;
      this.getList();
      return;
    }
    this.getListByType();
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