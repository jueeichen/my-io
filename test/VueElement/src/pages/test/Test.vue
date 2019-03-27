<template>
  <!--<baidu-map id="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">-->
  <!--<bm-marker :position="{lng: longitude, lat: latitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">-->
  <!--<bm-label content="123" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>-->
  <!--</bm-marker>-->
  <!--</baidu-map>-->
  <div id="baidumap"></div>
</template>

<style>
  /* 地图容器必须设置宽和高属性 */
  #baidumap {
    width: 400px;
    height: 300px;
  }
</style>

<script>
  export default {
    data() {
      return {
        latitude: '',
        longitude: '',


      }
    },
    // 创建地图对象，在mounted生命周期调用；
    mounted() {
      this.addressDetail(() => {
        this.$nextTick(() => {
          console.log(this.latitude, this.longitude);
        })
      })
    },
    methods: {
      addressDetail(cb) { //获取地理位置
        let _this = this
        var map = new BMap.Map("baidumap");
        var opts = {
          width: 250,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title: "Hello"  // 信息窗口标题
        }

        // var point = new BMap.Point(22.54605356, 114.02597367);
        // map.centerAndZoom(point, 15);
        // var marker = new BMap.Marker(point);        // 创建标注
        // map.addOverlay(marker);
        // map.addControl(new BMap.NavigationControl());
        // map.addControl(new BMap.ScaleControl());
        // map.addControl(new BMap.OverviewMapControl());
        // map.addControl(new BMap.MapTypeControl());
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            _this.latitude = r.point.lat
            _this.longitude = r.point.lng
            cb && cb()
            var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, r.point);
          }
          else {
            alert('failed' + this.getStatus());
          }
        });
        map.addEventListener("click", function () {
            alert("您点击了地图。");
            _this.openHeatmap(map)

          }
        );
      },
      openHeatmap(map) {
        var points = [
          {"lng": 116.418261, "lat": 39.921984, "count": 50},
          {"lng": 114.02597366, "lat": 22.54605355, "count": 150},
        ]
        let heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data: points, max: 100});
        heatmapOverlay.show();
      },
      closeHeatmap() {
        heatmapOverlay.hide();
      },

      setGradient() {
        /*格式如下所示:
     {
         0:'rgb(102, 255, 0)',
         .5:'rgb(255, 170, 0)',
         1:'rgb(255, 0, 0)'
     }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function (ele) {
          gradient[ele.getAttribute("data-key")] = ele.value;
        });
        heatmapOverlay.setOptions({"gradient": gradient});
      },
      //判断浏览区是否支持canvas
      isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
      },
    }

  }
</script>

