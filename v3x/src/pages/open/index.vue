<template>
  <view class="oepn-index">
    <van-tabs
      color="#479CFE"
      :swipeable="true"
      :animated="true"
      :active="active"
      :sticky="true"
      @change="onChange"
      @tap="next"
    >
      <van-tab title="" v-for="(item, index) in list" :key="index">
        <view class="tab-item">
          <image class="open-image" :src="item.showImgUrl" mode="aspectFill" />
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import { ref, getCurrentInstance, onMounted, useRouter, reactive } from "vue";
import "./index.styl";
import store from "@/store";
export default {
  name: "Index",
  components: {},
  setup(props) {
    const active = ref(0);
    const list = ref([]);
    const onChange = (e) => {
      console.log(e.detail.index);
      active.value = e.detail.index;
    };
    const next = () => {
      if (active.value == list.value.length) {
        wx.switchTab({ url: "/pages/index/index" });
        wx.setStorageSync("aleadyOpen", true);
        return;
      }
      active.value++;
    };
    onMounted(async () => {
      let res = await store.dispatch("global/getCommonConfImage", "3");
      list.value = res.confImages;
      console.log("list===>", list);
    });

    return {
      list,
      active,
      next,
      onChange,
    };
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
