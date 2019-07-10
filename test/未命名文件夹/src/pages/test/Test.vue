<template>
  <div>
    <div class="main">
      <button @click="isShowFiltrate=true">侧边点击</button>
      <button @click="isShowTopbar=true">tobar点击</button>
      <Topbar class="topbar" :changeFalse="changeFalse" :isShowTopbar="isShowTopbar"></Topbar>

      <button @click="isShowBottonBar=true">botton点击</button>
    </div>
    <Filtrate class="filtrate" :changeFalse="changeFalse" :isShowFiltrate="isShowFiltrate"></Filtrate>
  </div>
</template>

<script>
  import Filtrate from "../../components/Filtrate"
  import Topbar from "../../components/Topbar"

  export default {
    data() {
      return {
        isShowFiltrate: false,
        isShowBottonBar: false,
        isShowTopbar: false
      }
    },
    components: {
      Filtrate,
      Topbar
    },
    methods: {
      changeFalse() {
        this.isShowFiltrate = false;
        this.isShowBottonBar = false;
        this.isShowTopbar = false;

      }
    }
  }
</script>

<style scoped>

  .main {

    width: 100vw;
    height: 100vh;
    background-color: pink;
  }

  .filtrate {
    float: right;
  }

  .topbar {
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 200vh;

  }
</style>