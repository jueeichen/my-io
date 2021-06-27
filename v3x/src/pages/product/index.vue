<template>
  <view>
    <navbar :parameter="parameter" />
    <login />

    <view class="index">
      <c-swiper
        v-if="true"
        :initData="banner.confImages"
      />
      <view
        class="index-tabs"
        v-if="true"
      >
        <van-tabs
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :offset-top="tabsHeight"
          :active="active"
          @change="onChange"
        >
          <van-tab title="推荐">
            <view
              class="tab-item"
              v-if="list"
            >
              <list-item
                v-for="(item, index) in list"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list.length<1" />

            </view>
          </van-tab>
          <van-tab title="本科教育">
            <view class="tab-item">
              <list-item
                v-for="(item, index) in list_1"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list_1.length<1" />

            </view>
          </van-tab>
          <van-tab title="研究生">
            <view class="tab-item">
              <list-item
                v-for="(item, index) in list_2"
                :initData="item"
                :key="index"
              />
              <no-data v-if="list_2.length<1" />

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
  },
  setup(props) {
    const store = useStore();
    const _code = ref(0);
    const banner = ref([]);
    const list = ref(null);
    const active = ref(0);

    onMounted(async () => {
      await store.dispatch("product/getList", { page: 1, showBottom: false });
      banner.value = await store.dispatch("global/getCommonConfImage", "2");
      console.log(banner.value);
      list.value = store.state.product.list;
      console.log(list);
    });
    return {
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
      onChange: (e) => {
        console.log(e.detail.index);
        if (e.detail.index == 0) {
        }
        if (e.detail.index == 1 && store.state.product.list_1.length == 0) {
          store.dispatch("product/getListByType", {
            page: 1,
            type: e.detail.index,
            showBottom: false,
          });
          // setTimeout(() => {
          //   console.log("list_1=>",store.state.product.list_1)

          // },2000)
        }
        if (e.detail.index == 2 && store.state.product.list_2.length == 0) {
          store.dispatch("product/getListByType", {
            page: 1,
            type: e.detail.index,
            showBottom: false,
          });
        }
      },
    };
  },
  onShow() {
    // console.log(this);
    // this.getTabBar().setData({
    //   selected: 1,
    // });
  },
  onPullDownRefresh() {
    this.$store.dispatch("product/getList", { page: 1, showBottom: false });
  },
  onReachBottom() {
    console.log("用户触发上拉加载更多");
    this.$store.dispatch("product/getList");
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