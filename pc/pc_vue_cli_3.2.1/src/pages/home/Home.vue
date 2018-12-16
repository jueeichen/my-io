<template>
    <div>
        <h1>1212425345</h1>
    </div>
</template>

<script>
  export default {
    name: "home",
    mounted(){
      $('h1').click(
        function () {
           console.log(`123`);
        }
      );
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../assets/stylus/mixins.styl"
    div
        color red
</style>