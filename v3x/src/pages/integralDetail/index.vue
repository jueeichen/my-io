<template>
  <navbar :parameter="parameter" />
  <view class="integral-detail">
    <!-- <view></view> -->
    <view class="integral-detail-top">
      <image
        src="https://jjlmobile.oss-cn-shenzhen.aliyuncs.com/images/miniImgList/test/images/integral-detail.png"
      />
      <view>
        <view>可用积分</view>
        <view>{{ accountPoint }}</view>
        <view>积分规则</view>
      </view>
    </view>

    <view class="index-tabs" v-if="true">
      <van-tabs
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
              <view>贡 献 人：{{ item.createBy }}</view>
              <view>贡 献 ID：{{ item.accountId }}</view>
              <view>贡献时间：{{ item.createDate }}</view>
              <view>入账时间：{{ item.createDate }}</view>
            </view>
          </view>
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
              <view>贡 献 人：{{ item.createBy }}</view>
              <view>贡 献 ID：{{ item.accountId }}</view>
              <view>贡献时间：{{ item.createDate }}</view>
              <view>入账时间：{{ item.createDate }}</view>
            </view>
          </view>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "integralDetail",
  components: {
    navbar,
  },
  setup(props) {
    const store = useStore();
    const list = ref({});
    const accountPoint = ref(0);
    onMounted(async () => {
      let res = await store.dispatch("global/getAccountPoint");
      accountPoint.value = res.accountPoint;
      let data = await store.dispatch("global/getAccountList", { type: 1 });
      console.log("data===>", data);
      list.value = data.details;
    });
    const onChange = async (e) => {
      if (e.detail.index == 0) {
        let data = await store.dispatch("global/getAccountList", { type: 1 });
        console.log("data===>", data);
        list.value = data.details;
      }
      if (e.detail.index == 1) {
        let data = await store.dispatch("global/getAccountList", { type: 2 });
        console.log("data===>", data);
        list.value = data.details;
      }
    };
    return {
      onChange,
      list,
      tabsHeight: store.state.global.tabsHeight,
      accountPoint,
      parameter: {
        title: "积分明细",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


