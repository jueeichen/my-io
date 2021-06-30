<template>
  <view class="list-item">
    <image
      :src="initData.showImgUrl"
      mode="aspectFill"
    ></image>
    <view>
      <view class="list-item-title" v-if="initData.productName">{{splitStr(initData.productName,7)}}</view>
      <view class="list-item-tag">
        <view
          v-for="(item,index) in initData.serviceTagsList"
          :key="index" v-show="item.isShow=='1'"
          >{{splitStr(item.tagName,4)}}</view>
      </view>
      <view class="list-item-tuition">学费¥{{initData.productPrice}}</view>
      <view class="list-item-application">
        <view class="fee">报名费¥<text>{{initData.signupPrice}}</text> </view>
        <view
          class="sign-up"
          @tap="signUp(initData.id)"
        >立即报名</view>
      </view>
    </view>
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
      default: () => { }
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
