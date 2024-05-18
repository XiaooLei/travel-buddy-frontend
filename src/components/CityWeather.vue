<template>
  <div class="wrap"> 
    <span>{{temprature}}</span>
    <WeatherIcon :weather="type"/>
  </div>
</template>

<script>

import { API_BASE_URL } from '../config.js'
import WeatherIcon from '@/components/WeatherIcon.vue'


export default {
  name: "CityWeather",
  components:{
    WeatherIcon,
  },
  data() {
    return {
      destination: "",
      type: "sunny", // 多云/晴/雨...
      temprature: "28°C",
      aqi: 0,
    }
  },
  methods: {
    async getCityWeather(city) {
      const response = await fetch(`${API_BASE_URL}/getWeather?destination=${city}`)
      const responseData = await response.json()
      this.type = responseData.data.forcast[0]['type']
      this.temprature = responseData.data.forcast[0]['wendu']
      this.aqi = responseData.data.forcast[0]['aqi']
    }
  }

}

</script>

<style>
.wrap {
  max-height: 5px;
  height: 20px;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

</style>