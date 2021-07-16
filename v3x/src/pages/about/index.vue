<template>
  <navbar :parameter="parameter" />
  <view class="about ">
    <c-swiper v-if="initData.length>1" :initData="initData" width="750rpx" height="420rpx" />
    <image class="about-main-img" v-else :src="initData[0].showImgUrl" mode="widthFix"/>
    <view>
      <view class="about-title"> 关于我们 </view>
      <view class="about-content">
        “我要上学123”是隶属于科畅教育的子品牌，专注于国内高等院校本科与研究生辅导咨询，为学员提供备考、报考、考试、面试、调剂等全方位服务。在强大的资源与高水平教学辅导基础加上高水平的服务，目前已经帮助5000多名同学顺利毕业。
      </view>
      <view class="about-title"> 选择我们 </view>
      <view class="about-content">
        科畅教育目前与各大财经类院校保持密切合作，针对MBA/MPA招生与人才培养的需求，根据每个学员的特点，提供个性化、有针对性的辅导。
      </view>
      <view class="about-content">
        迄今为止，科畅教育已成功为企业运营管理人员、专本院校毕业学生、社会精英人士，提供了更为便捷、优质的课程项目解决方案，已有专家顾问团队，和完善的教育培训课程体系和咨询体系。选择科畅，让您的升学之路轻松简单。
      </view>
      <view class="about-title"> 公司地址 </view>
      <image src="../../static/images/map.png" />
      <view class="about-content">
        广东省深圳市南山区粤兴三道九号南京大学产学研基地B区2楼
      </view>
    </view>
  </view>
</template>

<script>
import navbar from "@/components/navbar/index.vue";
import cSwiper from "@/components/swiper/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "about",
  components: {
    navbar,
    cSwiper,
  },
  setup(props) {
    const store = useStore();
    const test = () => {
      console.log("test");
    };
    return {
      tabsHeight: store.state.global.tabsHeight,
      test,
      initData: [
        {
          createBy: "admin",
          createDate: 1624611249397,
          id: 10306,
          jumpUrl: "290174020@qq.com",
          params: {},
          showImgUrl:
            "../../static/images/tabs/about_us1.jpg",
          sortNo: 11,
          type: "2",
        },
        {
          createBy: "admin",
          createDate: 1624611249397,
          id: 10306,
          jumpUrl: "290174020@qq.com",
          params: {},
          showImgUrl:
            "../../static/images/tabs/about_us2.jpg",
          sortNo: 11,
          type: "2",
        },
      ],
      parameter: {
        title: "关于我们",
        return: 1,
      },
    };
  },
  onShareAppMessage(options) {
    return this.onShareAppMessage(options);
  },
};
</script>


