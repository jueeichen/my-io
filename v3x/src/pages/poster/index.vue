<template>
  <view class="poster">
    <navbar style="position: fixed; top: 0; left: 0" :parameter="parameter" />
    <view class="poster-main">
      <!-- <view v-if="initData.length>0">{{initData[0].showImgUrl}}
        {{initData[1].showImgUrl}}</view> -->
      <!-- <canvas
        v-if="list.length>0"
        canvas-id="createPoster"
        :style="'width:580rpx;height:1030rpx;'"
        class="createPoster"
      ></canvas> -->
      <c-swiper
        v-if="true"
        :initData="list"
        width="580rpx"
        height="1031rpx"
        :auto="false"
        :poster="true"
        @change="onChange"
      />
      <view class="poster-btn">
        <view @tap="createPoster(list[swiperIndex].showImgUrl)">
          <view>
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/save.png"
            />
          </view>
          <view> 保存图片 </view>
        </view>
        <button open-type="share">
          <view>
            <image
              src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/wechat.png"
            />
          </view>
          <view> 分享给好友 </view>
        </button>
      </view>
    </view>
    <canvas
      v-if="list.length > 0"
      canvas-id="createPoster"
      :style="'width:580rpx;height:1030rpx;'"
      class="createPoster"
    ></canvas>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import cSwiper from "@/components/swiper/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted, toRaw } from "vue";

export default {
  name: "about",
  components: {
    navbar,
    cSwiper,
  },
  setup(props) {
    const swiperIndex = ref(0);
    const store = useStore();
    const list = ref([]);
    const initData = ref([]);
    const global = ref("");
    const imgInfo = ref({
      width: 0,
      height: 0,
    });

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
    const onChange = (e) => {
      swiperIndex.value = e.detail.current;
      console.log(swiperIndex);
    };
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
        title: "正在生成海报...",
        mask: true,
      });
      const r2p = (rpx) => parseInt(rpx2Px() * rpx);
      return new Promise(async (resolve) => {
        const ctx = wx.createCanvasContext("createPoster");
        const img0 = await getImg(img);
        ctx.drawImage(img0.path, 0, 0, r2p(580), r2p(1030));

        // ctx.restore();
        ctx.save();
        //二维码
        const img4 = await getImg(global.value.qrcode);
        console.log(img4.path);
        const r = r2p(75);
        const x = r2p(580 - 150 - 30);
        const y = r2p(1030 - 150 - 30);

        ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(img4.path, x, y, 2 * r, 2 * r);
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

    onMounted(async () => {
      let res = await store.dispatch("global/getCommonConfImage", "4");
      list.value = res.confImages;
      let res1 = await store.dispatch("global/getMiniQrcode");
      global.value = toRaw(store.state.global);

      //GETMINIQRCODE

      // let newList = res.confImages
      // console.log("list===>", list);
      // new Promise((resolve) => {
      // newList.map(async (item, index) => {
      //   const data = await createPoster(item.showImgUrl)
      //   console.log("data===>", data.tempFilePath);
      //   debugger
      //   newList[index].showImgUrl = data.tempFilePath
      //   initData.value.push(newList[index])
      // if (index == newList.length - 1) {
      //   // debugger
      //   resolve()
      // }
      // })
      // }).then(() => {
      // setTimeout(() => {
      //   initData.value = newList;
      //   console.log("initData.value=>", initData.value)
      // })
      // })
    });

    return {
      swiperIndex,
      global,
      tabsHeight: store.state.global.tabsHeight,
      list,
      imgInfo,
      initData,
      createPoster,
      onChange,
      parameter: {
        title: "分享海报",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


