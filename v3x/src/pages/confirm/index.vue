<template>
  <view>
    <navbar :parameter="parameter" />
    <view class="confirm-index">
      <view class="confirm-top">
        <image src="" mode="" />
        <view>
          <text>中南财经政法大学</text>
          <text>专业: 科学信息与技术(预报)</text>
        </view>
      </view>
      <view class="confirm-center">
        <view>
          <view>
            <text>学费</text>
            <text> (含报名费)</text>
          </view>
          <text>{{ confirmData.initData.productPrice }}元</text>
        </view>
        <view>
          <view>
            <text>报名费</text>
          </view>
          <text>{{ confirmData.initData.signupPrice }}元</text>
        </view>
        <view>
          <view>
            <text>优惠券</text>
          </view>
          <text>{{
            couponList.length > 0
              ? couponList[couponListIndex].couponDenomination
              : 0
          }}</text>
        </view>
      </view>
      <view class="confirm-bottom">
        <view>
          <view>
            *
            <text> 姓名</text>
          </view>
          <input
            placeholder="请输入报名人的姓名"
            v-model="username"
            :disabled="pageType == 1"
          />
        </view>
        <view>
          <view>
            *
            <text> 手机号</text>
          </view>
          <input
            v-model="phone"
            placeholder="请输入报名人的手机号"
            :disabled="pageType == 1"
          />
        </view>
        <view class="confirm-bottom-blue">
          注: 报名完成加老师微信号「我的」-「班主任微信号」
        </view>
      </view>
    </view>
    <view class="confirm-btn">
      <view class="confirm-btn-left">
        <text>{{ pageType == 1 ? "学费" : "报名费" }}:</text>
        <text v-if="pageType == 0">{{
          confirmData.initData.signupPrice -
          (couponList.length > 0
            ? couponList[couponListIndex].couponDenomination
            : 0)
        }}</text>
        <text v-else>{{
          confirmData.initData.productPrice -
          confirmData.initData.signupPrice -
          (couponList.length > 0
            ? couponList[couponListIndex].couponDenomination
            : 0)
        }}</text>
      </view>
      <view class="confirm-btn-right" @tap="sumitOrder"> 提交订单 </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from "vue";
import "./index.styl";
import navbar from "@/components/navbar/index.vue";
import store from "@/store";

export default {
  components: {
    navbar,
  },
  setup(props) {
    const username = ref(null);
    const phone = ref(null);
    const pageType = ref(0); // 0-报名确认页 1-学费确认页
    const couponList = ref([]);
    const couponListIndex = ref(0);
    const id = ref(0);
    // id.value = props.tid.match(/(?<=(=)).*/g, "")[0];
    console.log(store.state.global.confirmData);
    const confirmData = store.state.global.confirmData;
    pageType.value = confirmData.pageType;
    if (pageType.value == 1) {
      phone.value = confirmData.initData.signuperMobile;
      username.value = confirmData.initData.signuperName;
    }
    const pay = async (orderNo) => {
      const res = await store.dispatch("global/payOrder", {
        orderNo,
      });
      console.log("res=>", JSON.parse(res.orderStr));
      const params = JSON.parse(res.orderStr);
      delete params.appId;
      const data = await store.dispatch("global/wxPay", params);
      console.log("data=>", data);
    };
    const sumitOrder = async () => {
      if (pageType.value == 1) {
        if (couponList.value.length > 0) {
          await store.dispatch("global/selectCounpon", {
            orderNo: confirmData.orderNo,
            tuitionCouponDetailId:couponList.value[couponListIndex.value].receiveId
             
          });
        }

        pay(confirmData.orderNo);
        return;
      }
      const res = await store.dispatch("global/createOrder", {
        productId: confirmData.productId,
        specialitiesName: confirmData.specialitiesName,
        signuperName: username.value,
        signuperMobile: phone.value,
        signupCouponDetailId: couponList.value[couponListIndex.value].receiveId,
      });

      pay(res.orderNo);
    };
    onMounted(async () => {
      const data = await store.dispatch("global/getCouponList", {
        status: 1,
        couponType: pageType.value == 1 ? "2" : "1", // 1-报名费抵扣优惠券 2-学费抵扣优惠券
        pageNum: 1,
        pageSize: 10,
      });
      couponList.value = data.couponInfos;
      console.log("couponList=>", couponList);
    });
    return {
      parameter: {
        title: pageType.value == 1 ? "确认学费" : "确认报名",
        return: 1,
      },
      pageType,
      couponList,
      couponListIndex,
      sumitOrder,
      pay,
      confirmData,
      username,
      phone,
    };
  },
};
</script>
