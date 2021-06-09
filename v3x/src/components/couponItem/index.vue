<template>
  <view class="counpon-items">
    <view class="counpon-item-title">{{initData.couponName}}</view>
    <view class="counpon-items-index">
      <image
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2367570774,2939782776&fm=11&gp=0.jpg"
        mode="aspectFill"
      ></image>
      <view>
        <view class="list-item-title">{{initData.couponName}}</view>
        <view class="fee">¥<text>{{initData.couponDenomination}}</text> </view>
        <view class="list-item-tuition">有效期：截止{{initData.validEndTime}}</view>
      </view>
      <view
        class="sign-up"
        @tap="onClick"
      >{{statusStr}}</view>

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
    },
    active: {
      type: String,
      default: 0
    }
  },
  setup(props) {
    const store = useStore();
    console.log(props)
    const statusStr = computed(() => {
      let str = ""
      props.active == 1 && (str = "立即领取")
      props.active == 2 && (str = "立即使用")
      props.active == 3 && (str = "使用详情")
      props.active == 4 && (str = "已失效")
      return str
    })
    const onClick = async () => {
      if (props.active == 1) {
        let res = await store.dispatch('global/receiveCoupon', { couponId: props.initData.couponId })
        console.log(res)
      }
       if (props.active == 2) {
        wx.switchTab({url:'/pages/product/index'})
      }
    }
    return { statusStr, onClick };
  },
};
</script>
