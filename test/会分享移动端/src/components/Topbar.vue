<template>
  <div>
    <div class="mark" @click="changeFalse" v-show="isShowTopbar"></div>
    <transition name="move">
      <ul v-show="isShowTopbar">
        <li>
          fsdfasdfadsfas
        </li>
        <li>
          fsdfasdfadsfas
        </li>
        <li>
          fsdfasdfadsfas
        </li>
        <li>
          fsdfasdfadsfas
        </li>
        <li>
          fsdfasdfadsfas
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
      isShowTopbar: Boolean
    },

  }
</script>

<style scoped>
  ul {
    position: relative;
    width: 100%;
    height: 5rem;
    background-color: #fff;
    opacity: 1;
  }

  .mark {
    z-index: 99;
    position: fixed;
    left: 0;
    top: 5rem;
    width: 100vw;
    height: 200vh;
    background-color: rgba(111, 111, 111, 0.5);
    color: red
  }

  .move-enter-active, .move-leave-active {
    transition: all 0.5s;
  }

  .move-enter {
    opacity: 0;
  }

  .move-leave-to {
    opacity: 0
  }


</style>