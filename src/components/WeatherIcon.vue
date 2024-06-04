<template>
  <div class="weather-icon-container">
    <!-- 根据天气参数动态选择SVG图标 -->
    <img v-if="weather === 'sunny' || weather === '晴'" src="../assets/whether/animated/day.svg" alt="Sunny" />
    <img v-else-if="weather === 'rainy' || weather === '小雨'" src="../assets/whether/animated/rainy-4.svg" alt="Rainy" />
    <img v-else-if="weather === 'rainy' || weather === '中雨'" src="../assets/whether/animated/rainy-5.svg" alt="Rainy" />
    <img v-else-if="weather === 'rainy' || weather === '大雨'" src="../assets/whether/animated/rainy-6.svg" alt="Rainy" />
    <img v-else-if="weather === 'rainy' || weather === '暴雨'" src="../assets/whether/animated/rainy-7.svg" alt="Rainy" />
    <img v-else-if="weather === 'rainy' || weather === '雨'" src="../assets/whether/animated/rainy-1.svg" alt="Rainy" />
    <img v-else-if="weather === 'cloudy' || weather === '多云'" src="../assets/whether/animated/cloudy-day-1.svg"
      alt="Rainy" />
    <img v-else-if="weather === 'cloudy' || weather === '阴'" src="../assets/whether/animated/cloudy.svg" alt="Rainy" />
    <img v-else-if="weather === 'snowy' || weather === '雪'" src="../assets/whether/animated/snowy-1.svg" alt="Snowy" />
    <!-- 默认图标 -->
    <img v-else src="../assets/whether/animated/snowy-1.svg" alt="Default" />
  </div>
</template>

<script>
export default {
  name: 'WeatherIcon',
  props: {
    weather: {
      type: String,
      default: 'sunny' // 默认天气参数
    }
  }
}
</script>

<style>
.weather-icon-container img {
  width: 50px;
  /* 根据需要调整图标大小 */
  height: auto;
}
</style>