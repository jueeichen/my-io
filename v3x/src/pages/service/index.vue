<template>
  <view class="hide-100vh">
    <navbar :parameter="parameter" />
    <view class="service">
      <!-- <view > </view> -->
      <view class="service-container">
        <view
          class="service-container-top"
          v-if="false"
        >
          <image src=""></image>
          <view>
            <view>静音 </view>
            <view>广东 深圳</view>
          </view>
        </view>
        <image
          class="qr-code"
          :src="initData.showImgUrl"
        ></image>
        <view class="service-content-1"> 班主任微信</view>
        <view class="service-content-2"> 扫一扫上面的二维码, 加我微信</view>
      </view>
<<<<<<< HEAD

      <view class="service-content-3"
        >请保存到相册后，微信扫一扫加老师微信号
      </view>
    </view>
    <view class="service-btn">
      <image src="" />
      <view> 保存图片</view>
=======
      <view class="service-content-3">请保存到相册后，微信扫一扫加老师微信号
      </view>
      <view
        class="service-btn"
        @tap="copyImg(initData.showImgUrl)"
      >
        <image src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/save.png" />
        <view> 保存图片</view>
      </view>
>>>>>>> 5b23e7d995dc69064efbbfac46389133d0e5025d
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "about",
  components: {
    navbar,
  },
  setup(props) {
    const store = useStore();
    const initData = ref({})
    onMounted(async () => {
      let res = await store.dispatch("global/getCommonConfImage", "104");
      initData.value = res.confImages[0]
      console.log(initData.value)
    });
    const copyImg = (url) => {
      wx.getImageInfo({
        src: url,
        success: (res) => {
          console.log(res)
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success: (e) => {
              this.$utils.toast('保存成功！', 1500)
              this.close()
            },
            fail: res => {
              wx.getSetting({
                success(res) {
                  if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.showModal({
                      title: '警告',
                      content: '请打开相册权限，否则无法保存图片到相册',
                      success(res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success(res) {
                              console.log(res)
                            }
                          })
                        } else if (res.cancel) {
                          wx.showToast({
                            title: '取消授权',
                            icon: "none",
                            duration: 2000
                          })
                        }
                      }
                    })
                  }
                },

              })

            }
          })
        },
        fail(res) { }
      })

    }

    return {
      copyImg,
      initData,
      tabsHeight: store.state.global.tabsHeight,
      parameter: {
        title: "班主任微信",
        return: 1,
      },
      imgUrl: 'https://img0.baidu.com/it/u=2487554976,3641386267&fm=26&fmt=auto&gp=0.jpg'
    };
  },
};
</script>


