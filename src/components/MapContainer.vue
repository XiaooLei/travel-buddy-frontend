<script>
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;
export default {
  props: {
    location: {
      type: String,
      default: "xx"
    },
    x: {
      type: Number,
      default: 116.397428 // 默认天气参数
    },
    y: {
      type: Number,
      default: 39.90923 // 默认天气参数
    },
  },
  components: {
  },
  mounted() {

    window._AMapSecurityConfig = {
      securityJsCode: "56b9708e75d5e27739c4b10a5b6d24aa",
    };
    AMapLoader.load({
      key: "56b9708e75d5e27739c4b10a5b6d24aa", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        try {
          map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 11, // 初始化地图级别
            center: [this.x+"", this.y+""], // 初始化地图中心点位置
          });
          console.log("location:", this.location)
          console.log("cordx:", this.x)
          console.log("cordy:", this.y)

          var marker = new AMap.Marker({
            position: [this.x + "", this.y + ""],
            title: this.location
          });
          map.add(marker);
        } catch (error) {
          // 这里不执行任何操作，或者记录错误到服务器
          // 避免使用 alert() 或其他可能触发弹窗的函数
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  unmouted() {
    map?.destroy();
  }

}
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 300px;
  height: 300px;
}
</style>
