<template>
  <div class="relative grid grid-flow-col justify-start overflow-x-auto rounded-xl" style="width: 700px;">
      <div v-for="forecast in futureForcast.slice(0, 15)" :key="forecast.ymd"
        class="relative weather-card rounded-xl h-40 w-28 border border-cyan-400 bg-teal-50	overflow-x-auto p-3">
        <div class="flex flex-col justify-center gap-1">
          {{forecast.ymd}}
          <div class="flex justify-center">
            <WeatherIcon :weather="forecast.type" />
          </div>
          <span class="text-sm">{{ forecast.low.substr(2) }}/{{ forecast.high.substr(2) }} </span>
          <div class="flex justify-center">
            <div class="rounded-lg px-0.5"
              :class="{ 'bg-green-500': forecast.aqi <= 50, 'bg-yellow-500': forecast.aqi > 50 && forecast.aqi <= 100, 'bg-red-500': forecast.aqi > 100}">
              AQI {{ forecast.aqi }}
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import { API_BASE_URL } from '../config.js'
import WeatherIcon from '@/components/WeatherIcon.vue'


export default {
  name: "CityWeather",
  components: {
    WeatherIcon,
  },
  props: {
      destination: {
          type: String,
          default: '' // 默认天气参数
      },
  },
  data() {
    return {
      type: "sunny", // 多云/晴/雨...
      temprature: "28°C",
      aqi: 0,
      futureForcast: []
    }
  },
  methods: {
    async getCityWeather(city) {
      console.log("weather city:", this.destination)
      const response = await fetch(`${API_BASE_URL}/getWeather?destination=${city}`)
      const responseData = await response.json()
      console.log("responseData:", responseData.data.data)
      this.type = responseData.data.data.forecast[0]['type']
      this.temprature = responseData.data.data.forecast[0]['wendu']
      this.aqi = responseData.data.data.forecast[0]['aqi']
      this.futureForcast = responseData.data.data.forecast
    }
  },
  mounted() {
    this.getCityWeather(this.destination)
  }
}

</script>

<style>
.wrap {
  max-height: 5px;
  height: 20px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
}

.weather-card {
  width: min(24rem, 100%);
  /* 确保卡片宽度不会超过100%，但至少有24rem */
}
</style>