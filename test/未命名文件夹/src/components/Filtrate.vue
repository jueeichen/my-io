<template>
  <div>
    <div class="mark" @click="changeFalse" v-show="isShowFiltrate"></div>
    <transition name="move">
      <ul v-show="isShowFiltrate">
        <li>
          <p>券后价区间（元）</p>
          <input type="text">

          <input type="text">
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "filtrate",
    props: {
      changeFalse: Function,
      isShowFiltrate: Boolean
    },

  }
</script>

<style scoped>
  ul {
    transform: translateX(0rem);
    position: fixed;
    z-index: 9999;
    right: 0;
    top: 0;
    width: 7rem;
    height: 100%;
    background-color: #fff;
  }

  .mark {
    z-index: 99;
    position: fixed;
    left: 0;
    top: -50vh;
    width: 100vw;
    height: 200vh;
    background-color: rgba(111, 111, 111, 0.5);
    color: red
  }

  .move-enter-active, .move-leave-active {
    transition: all 0.5s;
  }

  .move-enter {
    transform: translateX(7rem)
  }

  .move-leave-to {
    transform: translateX(7rem);
  }


</style>