<template>
  <list v-if="!list[0]"
        ref="pageNoDate"
        :style="ScrollerHeight"
        class="scroller"
        :showRefresh="true"
        :showLoadMore="false"
        @refresh="refreshHandler">
    <!-- <my-refresh :refreshFun="refreshHandler" :isLoading="isLoading"></my-refresh> -->
    <cell class="scroller" v-if="!first">
      <am-image class="img-noDate" :image-style="{height: '200px'}" auto-width :src="noDataImage"></am-image>
      <text style="color: #44a13f;margin-top: 50px;">{{noDataMsg}}</text>
    </cell>
    <cell class="scroller" v-if="first">
      <slot name="first"></slot>
    </cell>
    <!-- <loading class="loading" @loading="loadingHandler"></loading> -->
  </list>
  <list v-else
        :style="ScrollerHeight"
        ref="pageList"
        class="scroller"
        :showRefresh="true"
        @refresh="refreshHandler"
        :showLoadMore="true"
        @loadMore="loadingHandler">
    <!-- <my-refresh></my-refresh> -->
    <cell v-for="(item, index) in list" :key="index">
      <slot v-bind:item="item"></slot>
      <div class="list-bottom-container" v-if="index===list.length-1&&!hasData">
        <text class="list-bottom-label">---</text>
        <text class="list-bottom-label">我是有底线的</text>
        <text class="list-bottom-label">---</text>
      </div>
    </cell>
    <!--<cell v-if='!hasData'>-->
    <!--<div class="list-bottom-container">-->
    <!--<text class="list-bottom-label">-&#45;&#45;</text>-->
    <!--<text class="list-bottom-label">我是有底线的</text>-->
    <!--<text class="list-bottom-label">-&#45;&#45;</text>-->
    <!--</div>-->
    <!--</cell>-->
    <!--<loading @loading="loadingHandler"></loading>-->
  </list>
</template>

<script>
  import { AmImage } from 'weex-amui'
  // import myRefresh from './myRefresh'
  import { ScrollerHeight } from './compStyleConfig.js'

  export default {
    data () {
      return {
        ScrollerHeight: {...ScrollerHeight, backgroundColor: '#fff', width: '750px'},
        list: [],
        hasData: true,  //有数据(表示服务器中无数据)
        isLoading: false,   //正在加载
        isRefresh: false,   //下拉
        isReloadData: false,     //上拉
        pageNo: 1,      //当前请求页面数
        totalPage: null,    //服务器中总页面数
        first: true
      }
    },
    components: {
      AmImage,
      // myRefresh,
    },
    props: {
      noDataMsg: {
        default: '暂无数据'
      },
      upDataFun: {
        //发送请求
        type: Function
      },
      upDataList: {
        //将请求回来的数据存放到父组件中
        type: Function,
        default: () => {}
      },
      isAutoUpDate: {
        //进来是否更新
        type: Boolean,
        default: false
      },
      pageSize: {
        default: 10
      },
      noDataImage: {
        default: 'bmlocal://assets/images/icon/wu.png'
      }
    },
    created () {
      if(this.isAutoUpDate){
        this.refreshHandler()
      }
    },
    eros: {
      beforeAppear () {
        this.frist = true;
        console.log('111111111111AAAAAAAAAAAAA');
      }
    },
    methods: {
      //下拉重新加载
      refreshHandler () {
        console.log('99999---9999')
        this.isLoading = true;
        this.isRefresh = true;
        this.hasData = true;
        let params = {
          pageNo: 1,
          pageSize: this.pageSize
        };
        this._dataHandler(params)

      },
      //上拉加载更多
      loadingHandler () {
        this.pageNo++;
        if (this.pageNo >= +this.totalPage) {

          this.$refs['pageList'] && this.$refs['pageList'].loadMoreEnd();
          this.hasData = false;
          return
        }
        this.isLoading = true;
        this.isReloadData = true;
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        };
        this._dataHandler(params)
      },
      delItemFun (orderId) {
        this.list.forEach((item, index) => {
          if (item.orderId === orderId) {
            this.list.splice(index, 1)
          }
        })
      },
      delItemFun2 (orderId) {
        console.log(orderId, 'aaaaaaaaaaaa1222');
        this.list.forEach((list, index) => {
          list.orderList.forEach((item, i) => {
            console.log(item, 'aaaaaaaaaaaa12223333');
            if (item.orderId === orderId) {
              this.list[index].orderList.splice(i, 1);
              if (this.list[index].orderList.length === 0) {
                this.list.splice(index, 1)
              }
            }
          })
        })
      },
      _dataHandler (params) {
        this.upDataFun(params).then((page) => {
          //将服务器中最新的总页数存起来
          this.totalPage = page.totalPage;
          //下拉刷新结束

          if (this.isRefresh) {
            //如果是下拉
            this.list = page.list;
            this.upDataList && this.upDataList(false);
            console.log(page,'下拉刷新结束111')
            this.$refs['pageNoDate'] && this.$refs['pageNoDate'].refreshEnd();
            //下拉刷新结束
            console.log('下拉刷新结束2222')
            this.$refs['pageList'] && this.$refs['pageList'].refreshEnd();
            console.log( typeof page.list, '如果是下拉')
          } else if (this.isReloadData) {
            //如果是上拉
            this.list = [...this.list, ...page.list];
            this.$refs['pageList'] && this.$refs['pageList'].loadMoreEnd();
            console.log('如果是上拉')
          }

          this.isLoading = false;
          this.isRefresh = false;
          this.isReloadData = false;
          this.first = false
          console.log('结束')
        }).catch((err) => {
          console.log('错误')
          this.$refs['pageNoDate'] && this.$refs['pageNoDate'].refreshEnd();
          this.$refs['pageList'] && this.$refs['pageList'].refreshEnd();
          this.isLoading = false;
          this.isRefresh = false;
          this.isReloadData = false;
          this.first = false
        })
      }

    }
  }
</script>

<style scoped>
  .list-bottom-container {
    width: 750px;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
  }
  .list-bottom-label {
    color: #44a13f;
    padding-left: 10px;
    padding-right: 10px;
  }
  .scroller{
    align-items: center;
  }
  .img-noDate{
    margin-top: 160px;
  }
</style>
