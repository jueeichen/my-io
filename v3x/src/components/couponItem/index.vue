<template>
  <view class="counpon-items">
    <!-- <view class="counpon-item-title">{{ initData.couponName }}</view> -->
    <view class="counpon-items-index">
      <image
        src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/coupon_miller.png"
        mode="aspectFill"
      ></image>
      <view>
        <view class="list-item-title">{{ initData.couponName }}</view>
        <view class="fee"
          >¥<text>{{ initData.couponDenomination }}</text>
        </view>
        <view class="list-item-tuition"
          >有效期：截止{{timestampToStr(initData.validEndTime,"Y年M月D日")  }}</view
        >
      </view>
      <view v-if="!isUse" :class="'sign-up '+(active==3||active==4||active==0?' sign-up-gray':'')" @tap="onClick">{{ statusStr }}</view>
      <view v-else class="sign-up">已选择</view>
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
      default: () => {},
    },
    active: {
      type: String,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
    isUse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    console.log("1234", props, ctx);
    const state = ref(0);
    const statusStr = computed(() => {
      let str = "";
      props.active == 0 && ((str = "待使用"), (state.value = ""));
      props.active == 1 && ((str = "立即领取"), (state.value = 101));
      props.active == 2 && ((str = "立即使用"), (state.value = 1));
      props.active == 3 && ((str = "立即使用"), (state.value = 2));
      props.active == 4 && ((str = "立即使用"), (state.value = 3));
      return str;
    });
    const onClick = async () => {
      if (props.active == 1) {
        let res = await store.dispatch("global/receiveCoupon", {
          couponId: props.initData.couponId,
        });
        // console.log(res);
        if (res == 10001) {
        return;
      }
        ctx.attrs.onInitList(state.value,props.active);
      }
      if (props.active == 2) {
        if (ctx.attrs.onUse) {
          ctx.attrs.onUse(props.index);
          return;
        }
        wx.switchTab({ url: "/pages/product/index" });
      }
      if (props.active == 0) {
        if (ctx.attrs.onUse) {
          ctx.attrs.onUse(props.index);
        }
      }
    };
    return { statusStr, onClick };
  },
};
</script>
