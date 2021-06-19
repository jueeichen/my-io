<template>
  <view
    class="login-mask"
    v-if="isShow"
  >
    <view class="login-mask-content">
      <view class="login-mask-title">提示</view>
      <view class="login-mask-desc">进一步操作需要授权您的手机号</view>
      <view class="login-btns">
        <view
          class="login-btn login-btn-cancel flex1"
          v-if="hideCancel !== true"
          @tap="cancelLogin"
        >随便逛逛</view>
        <button
          class="login-btn login-btn-confirm"
          hover-class="none"
          open-type="getPhoneNumber"
          @getphonenumber="loginGetUserInfo"
        >
          授权
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import "./index.styl";
import $api from "@/api/index.ts";

export default {
  props: {
    hideCancel: {
      type: Boolean,
      default: false,
    },
    test1: {
      type: String,
      default: "test1",
    },
  },
  setup(props, options) {
    // data
    const userInfo = reactive({});
    const isShow = ref(false);
    const loginCallBack = ref(null);
    const isRequest = ref(false);
    const code = ref("");
    const isShowGetUserInfo = ref(false);
    const ctx = getCurrentInstance()



    // function
    const cancelLogin = () => {
      isShow.value = false;
      console.log(ctx)
      if (ctx.attrs.onCancel) {
        
        console.log(ctx.attrs.onCancel)

        ctx.attrs.onCancel()
      }

    };
    const open = () => {
      console.log(wx.getStorageSync('userInfo'))
      if (wx.getStorageSync('userInfo').mobile) {

        return
      }
      isShow.value = true;
    };
    // 点击登录按钮
    const loginGetUserInfo = async (e) => {
      if (e.detail.encryptedData) {
        // this.startLogin(e.detail);
        let data = await $api('DECRYPTPHONE', {
          // code:_code.value,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }, {}, {})
        console.log(data)
        if (data.res.code == 10000) {
          cancelLogin()
        }
      } else {
        // this.$toast("请允许授权");
        wx.showToast({ title: '请允许授权', icon: 'none' })
      }
    };
    return {
      /*参数start=> */
      userInfo,
      isShow,
      loginCallBack,
      isRequest,
      code,
      isShowGetUserInfo,
      /*参数<=end */
      /*方法start=> */
      cancelLogin,
      loginGetUserInfo,
      open
      /*方法<=end */
    };
  }
};
</script>
