<template>
  <div>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    <slotSon @showuser="getUserName">
      <div>这是父组件写的东西</div>
    </slotSon>
    <button @click="goTo('/home')"> 点我跳转 </button>
  </div>
</template>


<script>
  import slotSon from '../../components/slotSon'

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.drawLine();  // 初始化
      console.log(this.$route.query);
    },
    beforeRouteLeave (to, from , next) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '在Vue中使用echarts'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      getUserName(data) {
        alert('我是父组件的自定义事件,子组件传来了:' + data)
        // this.goTo('/home')
      },
      goTo(path) {
        this.$router.replace(path)
      }
    },
    components: {
      slotSon
    }
  }

</script>

<style scoped>

</style>