<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="step">
      <view class="step-top">
        <view> 你已完成{{ learnStage }}步, 离拿证更近了 </view>
        <van-progress
          :percentage="filterNumber((learnStage / steps.length) * 100)"
          track-color="rgba(255,255,255,0.3)"
          color="rgba(255,255,255,1)"
          stroke-width="16rpx"
          :show-pivot="false"
        />
        <view>
          <text>当前进度</text>
          <text>{{ parseIntNum((learnStage / steps.length) * 100) }}%</text>
        </view>
      </view>
      <van-steps
        v-if="false"
        :steps="steps"
        :active="learnStage - 1"
        direction="vertical"
        active-color="#479CFE"
        inactive-color="#7E7E7E"
      />
      <view class="steps-content-main">
        <view
          :class="
            'steps-content-item ' +
            (index > learnStage ? 'steps-content-item-border-gray' : '')
          "
          v-for="(item, index) in steps"
          :key="index"
        >
          <image
            v-if="learnStage == index"
            class="steps-content-position"
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/process-1.png"
            mode="widthFix"
          />
          <image
            v-else-if="index < learnStage"
            class="steps-content-position"
            src="https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/process-2.png"
            mode="widthFix"
          />
          <image
            v-else
            class="steps-content-position steps-content-position-gray"
          />
          <view v-if="item.text">{{ item.text }}</view>
          <text v-if="item.desc">{{ item.desc }}</text>
          <image v-if="item.img" :src="item.img" mode="widthFix" />
        </view>
      </view>
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
    const learnStage = ref(0);
    onMounted(async () => {
      let res = await store.dispatch("global/getCertFlow");
      console.log(res);
      learnStage.value = res.learnStage || 0;
    });
    return {
      tabsHeight: store.state.global.tabsHeight,
      learnStage,
      parameter: {
        title: "拿证流程",
        return: 1,
      },
      parseIntNum: (num) => {
        return parseInt(num);
      },
      steps: [
        {
          text: "报名",
          desc: "仅需提供填写报名表格、身份证复印件、学信网学历验证报告",
        },
        {
          text: "4-8月注册登记",
          desc: "",
        },
        {
          text: "9月网上报名",
          desc: "配合班主任进行考试报名",
        },
        {
          text: "10月打印准考证",
          desc: "",
        },
        {
          text: "10月中考试",
          desc: "总分450分只需要考100分, 每门课150分, 25岁以上加20分",
        },
        {
          text: "12月录取通知书发放",
          desc: "会收到教育局短信以及学校发的录取通知书",
          img: "https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/tabs/process-img-1.jpg",
        },
        {
          text: "12月中缴纳学费",
          desc: "缴纳学费，完成学籍注册",
        },

        {
          text: "次年3月份入学典礼",
          desc: "",
        },
        {
          text: "4月中 ",
          desc: "可以登录学信网查询自己的学籍",
          img: "https://wysx-mini.oss-cn-beijing.aliyuncs.com/images/tabs/process-img-2.jpg",
        },
        {
          text: "期末考试",
          desc: "网上考试 可以百度",
        },
        {
          text: "网上教学",
          desc: "登录账号完成学业",
        },
        {
          text: "学位英语考试",
          desc: "不会的请咨询班主任",
        },
        {
          text: "论文答辩",
          desc: "",
        },
        {
          text: "毕业",
          desc: "获取本科毕业证书/学士学位（专科同学直接到此步骤）",
        },
      ],
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


