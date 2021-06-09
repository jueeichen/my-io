<template>
  <navbar :parameter="parameter" />
  <view class="about">

  </view>
</template>

<script>

import navbar from "@/components/navbar/index.vue";

import "./index.styl";
import { useStore } from "vuex";

export default {
  name: "about",
  components: {
    navbar
  },
  setup(props) {
    const store = useStore();
    const test = () => {
      console.log("test");
    };
    return {
      tabsHeight: store.state.global.tabsHeight,
      test,
      parameter: {
        title: "推广海报",
        return: 1
      },
    };
  }
};
</script>


