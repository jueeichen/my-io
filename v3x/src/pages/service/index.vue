<template>
  <view class="hide-100vh main-content">
    <navbar :parameter="parameter" />
    <view class="service">
      <!-- <view > </view> -->
      <view class="service-container">
        <view class="service-container-top" v-if="false">
          <image src=""></image>
          <view>
            <view>静音 </view>
            <view>广东 深圳</view>
          </view>
        </view>
        <image class="qr-code" :src="initData.showImgUrl" mode="widthFix"></image>
        <view class="service-content-1"> 班主任微信</view>
        <view class="service-content-2"> 扫一扫上面的二维码, 加我微信</view>
      </view>
      <view class="service-content-3"
        >请保存到相册后，微信扫一扫加老师微信号
      </view>
      <view class="service-btn" @tap="createPoster(initData.showImgUrl)">
        <image
          src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/save.png"
        />
        <view> 保存图片</view>
      </view>
    </view>
    <canvas
      canvas-id="createPoster"
      :style="'width:442rpx;height:448rpx;'"
      class="createPoster"
    ></canvas>
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
    const initData = ref({});
    onMounted(async () => {
      let res = await store.dispatch("global/getCommonConfImage", "104");
      initData.value = res.confImages[0];
      console.log(initData.value);
    });
    // const copyImg = (url) => {
    //   wx.getImageInfo({
    //     src: url,
    //     success: (res) => {
    //       console.log(res);
    //       wx.saveImageToPhotosAlbum({
    //         filePath: res.path,
    //         success: (e) => {
    //           wx.showToast({ title: "保存成功！" });
    //         },
    //         fail: (res) => {
    //           wx.getSetting({
    //             success(res) {
    //               if (!res.authSetting["scope.writePhotosAlbum"]) {
    //                 wx.showModal({
    //                   title: "警告",
    //                   content: "请打开相册权限，否则无法保存图片到相册",
    //                   success(res) {
    //                     if (res.confirm) {
    //                       wx.openSetting({
    //                         success(res) {
    //                           console.log(res);
    //                         },
    //                       });
    //                     } else if (res.cancel) {
    //                       wx.showToast({
    //                         title: "取消授权",
    //                         icon: "none",
    //                         duration: 2000,
    //                       });
    //                     }
    //                   },
    //                 });
    //               }
    //             },
    //           });
    //         },
    //       });
    //     },
    //     fail(res) {},
    //   });
    // };
    const getImg = (src) => {
      // let img = src.replace(/http/, 'https')
      // debugger
      return new Promise((resolve) => {
        wx.getImageInfo({
          src,
          success: (res) => {
            if (/json/.test(res.path)) {
              // console.log(src)
              // console.log(res)
              wx.showToast({
                title: "获取图片失败，请重试！",
                icon: "none",
                mask: true,
              });
              setTimeout(() => {
                this.close();
              }, 2000);
            } else {
              resolve(res);
            }
          },
          fail: (e) => {
            console.log(e);
            wx.showToast({
              title: "获取图片失败，请重试！",
              icon: "none",
              mask: true,
            });
          },
        });
      });
    };
    const rpx2Px = () => {
      let rpx;
      wx.getSystemInfo({
        success: function (res) {
          rpx = res.windowWidth / 375 / 2;
        },
      });
      return rpx;
    };
    // const onChange = (e) => {
    //   swiperIndex.value = e.detail.current;
    //   console.log(swiperIndex);
    // };
    const copyImg = (url) => {
      wx.getImageInfo({
        src: url,
        success: (res) => {
          console.log(res);
          wx.saveImageToPhotosAlbum({
            filePath: res.path,
            success: (e) => {
              wx.showToast({ title: "保存成功" });
            },
            fail: (res) => {
              wx.getSetting({
                success(res) {
                  if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.showModal({
                      title: "警告",
                      content: "请打开相册权限，否则无法保存图片到相册",
                      success(res) {
                        if (res.confirm) {
                          wx.openSetting({
                            success(res) {
                              console.log(res);
                            },
                          });
                        } else if (res.cancel) {
                          wx.showToast({
                            title: "取消授权",
                            icon: "none",
                            duration: 2000,
                          });
                        }
                      },
                    });
                  }
                },
              });
            },
          });
        },
        fail(res) {},
      });
    };
    const createPoster = (img) => {
       wx.showLoading({
        title: "正在保存...",
        mask: true,
      });
      const r2p = (rpx) => parseInt(rpx2Px() * rpx);
      return new Promise(async (resolve) => {
        const ctx = wx.createCanvasContext("createPoster");
        const img0 = await getImg(img);
        ctx.drawImage(img0.path, 0, 0, r2p(442), r2p(448));
        ctx.save();
        ctx.draw(false, (res) => {
          wx.canvasToTempFilePath({
            canvasId: "createPoster",
            success: (contextInfo) => {
              resolve(contextInfo);
              copyImg(contextInfo.tempFilePath);
            },
            fail: function (res) {},
            complete: function () {
              wx.hideLoading();
            },
          });
        });
      });
    };

    return {
      createPoster,
      initData,
      tabsHeight: store.state.global.tabsHeight,
      parameter: {
        title: "班主任微信",
        return: 1,
      },
      imgUrl:
        "https://img0.baidu.com/it/u=2487554976,3641386267&fm=26&fmt=auto&gp=0.jpg",
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


