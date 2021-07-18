<template>
  <view class="no-data-content" >

    <image v-if="initData.img" :src="initData.img||'https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/no-data.png'"  mode="widthFix"/>
    <image v-else src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/tabs/collect_coupons_nodata.png" mode="widthFix"/>
      <!-- default:'https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/tabs/collect_coupons_nodata.png', -->

    <text>{{initData.content||'暂无数据~'}}</text>

  </view>
</template>

<script>
import { computed, ref } from "vue";
import "./index.styl";
import Taro from "@tarojs/taro";
import { useStore } from "vuex";
export default {
  props: {
    initData: {
      type: Object,
      default: () => {
        return {
          img: '',
          content: ''
        }
      }
    }
  },
  setup(props) {
    const store = useStore();
    // console.log(props)
    return {
      signUp: (id) => {
        wx.navigateTo({ url: '/pages/detail/index?id=' + id })
      },
      splitStr
    };
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
