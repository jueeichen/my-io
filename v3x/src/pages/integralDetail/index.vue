<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="integral-detail">
      <!-- <view></view> -->
      <view class="integral-detail-top">
        <image src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/integral-detail.png" />
        <view>
          <view>可用积分</view>
          <view>{{ accountPoint }}</view>
          <view @tap="onShowPop">积分规则</view>
        </view>
      </view>

      <view
        class="index-tabs"
        v-if="true"
      >
        <van-tabs
        :active="active"
          @change="onChange"
          :swipeable="true"
          :animated="true"
          :sticky="true"
          :offset-top="tabsHeight"
        >
          <van-tab title="收入">
            <view class="tab-item integral-detail-list">
              <view
                class="integral-detail-item"
                v-for="(item, index) in list"
                :key="index"
              >
                <view>
                  <view>{{ item.businessType }}</view>
                  <view>+{{ item.tradePoint }}</view>
                </view>
                <!-- <view>贡 献 人：{{ item.createBy }}</view> -->
                <view>贡 献 ID：{{ item.userId }}</view>
                <view>贡献时间：{{
                    timestampToStr(item.createDate, "Y年M月D日")
                  }}</view>
                <view>入账时间：{{
                    timestampToStr(item.createDate, "Y年M月D日")
                  }}</view>
              </view>
            </view>
            <no-data v-if="page > 1 && list.length < 1" />
            <no-more v-if="list.length > 0 && showBottomLine" />
          </van-tab>
          <van-tab title="支出">
            <view class="tab-item integral-detail-list">
              <view
                class="integral-detail-item"
                v-for="(item, index) in list"
                :key="index"
              >
                <view>
                  <view>{{ item.businessType }}</view>
                  <view>-{{ item.tradePoint }}</view>
                </view>
                <!-- <view>贡 献 人：{{ item.createBy }}</view> -->
                <view>贡 献 ID：{{ item.userId }}</view>
                <view>贡献时间：{{
                    timestampToStr(item.createDate, "Y年M月D日")
                  }}</view>
                <view>入账时间：{{
                    timestampToStr(item.createDate, "Y年M月D日")
                  }}</view>
              </view>
            </view>    
            <no-data v-if="page > 1 && list.length < 1" />
            <no-more v-if="list.length > 0 && showBottomLine" />
          </van-tab>
        </van-tabs>
      </view>
    </view>
    <view class="integral-mask" v-if="isShowPop" >
      <view>
        <view>
          活动规则
        </view>
        <text>
          1、推荐一个用户报名成功后获得{{global.commonConf.extendRegisterPoint}}积分，缴学费成功获得{{global.commonConf.extendSignupPoint}}积分
        </text>
        <text>
          2、推荐{{global.commonConf.toFreeNum}}名人报名成功，享受免费入学机会
        </text>
        <text>
          3、积分与优惠券进行兑换，在“积分商城”中进行兑换。
        </text>
        <text>
          4、只能在本平台使用，最终解释权归平台所有
        </text>
       
      </view>
      <van-icon color="#ffffff" name="close" @tap="isShowPop=false" custom-style="margin-top:100rpx;font-size:54rpx" />

    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted, toRaw } from "vue";
import noData from "@/components/noData/index.vue";
import noMore from "@/components/noMore/index.vue";
export default {
  name: "integralDetail",
  components: {
    navbar,noData,noMore
  },
  setup(props) {
    const store = useStore();
    const global = ref("");
    const isShowPop = ref(false);

    global.value = toRaw(store.state.global);
    // const list = ref({});
    const accountPoint = ref(0);
    const onShowPop = async ()=>{
      isShowPop.value = true
      await store.dispatch("global/getProfile");
    }

    const active = ref(0);
    const page = ref(1);
    const pageSize = ref(10);
    const list = ref([]);
    const showBottomLine = ref(false);
    const getList = async () => {
      const res = await store.dispatch("global/getAccountList", {
        page: page.value,
        pageSize: pageSize.value,
        type: active.value + 1,
      });
      list.value =
        res.pageNum == 1 ? res.details : [...list.value, ...res.details];
      if (res.details.length == pageSize.value) {
        page.value++;
      } else {
        page.value++;

        console.log("到底了");
        showBottomLine.value = true;
      }
      wx.stopPullDownRefresh();
    };
    const onLoad = async () => {
      let res = await store.dispatch("global/getAccountPoint");
      accountPoint.value = res.accountPoint;
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      getList();
    };
    const onChange = async (e) => {
      page.value = 1;
      list.value = [];
      showBottomLine.value = false;
      active.value = e.detail.index;
      getList();
    };
    onMounted(async () => {
      onLoad()
      // let data = await store.dispatch("global/getAccountList", { type: 1 });
      // console.log("data===>", data);
      // list.value = data.details;
    });
    // const onChange = async (e) => {
    //   if (e.detail.index == 0) {
    //     let data = await store.dispatch("global/getAccountList", { type: 1 });
    //     console.log("data===>", data);
    //     list.value = data.details;
    //   }
    //   if (e.detail.index == 1) {
    //     let data = await store.dispatch("global/getAccountList", { type: 2 });
    //     console.log("data===>", data);
    //     list.value = data.details;
    //   }
    // }; 
    return {
      active,
      showBottomLine,
      page,
      pageSize,
      getList,
      onLoad,
      onShowPop,
      onChange,
      list, global,
      tabsHeight: store.state.global.tabsHeight,
      accountPoint,
      isShowPop,
      parameter: {
        title: "积分明细",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
  onPullDownRefresh() {
    if (this.active == 0) {
      this.onLoad();
      return;
    }
    this.active = 0;
  },
  onReachBottom() {
    if (this.showBottomLine) return;
    console.log("用户触发上拉加载更多");
    this.getList();
  },
};
</script>


