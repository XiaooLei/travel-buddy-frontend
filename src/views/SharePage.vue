<template>
    <div class="share-page-wrap" :style="backgroundStyle">
        <div v-if="showWeather" class="flex flex-col justify-center mt-3 gap-3 text-white">
            <div class="flex justify-center text-lg gap-3 items-center">
                <div>{{weather.data.wendu}}°C</div>
                <WeatherIcon :weather="weather.data.forecast[0].type" />
                <div>｜</div>
                <div class="flex justify-center gap-3">
                    <div class="rounded-lg px-0.5 bg-green-500"
                    :class="{ 'bg-green-500': weather.data.forecast[0].aqi <= 100, 
                    'bg-yellow-500': weather.data.forecast[0].aqi > 100 && weather.data.forecast[0].aqi <= 200, 
                    'bg-red-500': weather.data.forecast[0].aqi > 200 }">
                      AQI {{weather.data.forecast[0].aqi}}
                    </div>
                    {{weather.data.quality}}
                  </div>
            </div>
            <div class="flex justify-center">
                <div class="text-container text-3xl" style="width: 100px; text-align: justify; padding: 0 10px;">
                    {{city}}
                </div>
            </div>
        </div>

        <div class="flex flex-col search-res-container gap-y-3 mt-5 mb-5">
            <div class="flex justify-center">
                <div class="w-1/2 bg-slate-100 rounded-2xl p-6">
                    <p style="text-align: left" v-html="renderMarkdown(travelPlanRes)"></p>
                </div>
            </div>
        </div>

        <a-space direction="vertical" class="flex flex-col justify-center gap-3">
            <div class="flex justify-center">
                <div class="relative grid grid-flow-col justify-start overflow-x-auto rounded-xl gap-3"
                    style="width: 800px;">
                    <div v-for="poi in pois" :key="poi.name">
                        <div @click="visible=!visible">
                            <PoiCard :poiName="poi.name" :rating="poi.biz_ext.rating" :photos="poi.photos" 
                            :cordX="poi.cord_x" :cordY="poi.cord_y" :address="poi.address" :telephone="poi.tel"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center ">
                <div class="bg-white w-1/2 rounded-2xl p-3">
                    <h2>饮食推荐</h2>
                    <div class="overflow-y-auto" style="height: 350px;">
                        <a-table :dataSource="foodRecommentds" :columns="foodRecommendsCols" :pagination="false" />
                    </div>
                </div>
            </div>
            <div class="flex justify-center mb-10">
                <div v-if="showWeather" style="width: 800px;" >
                    <h2 class="text-white text-lg">未来15天天气</h2>
                    <div class="flex justify-center" >
                        <CityWeather :futureForecast="weather.data.forecast" />
                    </div>
                </div>
            </div>
            <!-- <div>
                    酒店推荐
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false"/>
                </div> -->
        </a-space>
    </div>
</template>


<script>

import { API_BASE_URL } from '../config.js'
import MarkdownIt from 'markdown-it';
import CityWeather from '@/components/CityWeather.vue'
import PoiCard from '@/components/PoiCard.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';
const md = new MarkdownIt({
    html: true,
    linkify: true,
    // 其他配置...
});

export default {
    name: 'SharePage',
    props: {
        id: { type: String, required: true }
    },
    components: {
        CityWeather,
        PoiCard,
        WeatherIcon,
    },
    data() {
        return {
            visible: false,
            maskStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.15)', // 设置遮罩层的透明度为30%
            },
            city: "",
            travelPlanRes: "",
            spotsRecommends: [],
            foodRecommentds: [],
            pois: [],
            spotsRecommendsCols: [
                {
                    title: '景点名称',
                    dataIndex: '景点名称',
                    key: '景点名称',
                },
                {
                    title: '推荐理由',
                    dataIndex: '推荐理由',
                    key: '推荐理由',
                },
                {
                    title: '门票价格',
                    dataIndex: '门票价格',
                    key: '门票价格',
                },
                {
                    title: '推荐指数',
                    dataIndex: '推荐指数',
                    key: '推荐指数',
                }
            ],
            foodRecommendsCols: [
                {
                    title: '美食名称',
                    dataIndex: '美食名称',
                    key: '美食名称',
                },
                {
                    title: '推荐店铺',
                    dataIndex: '推荐店铺',
                    key: '推荐店铺',
                },
                {
                    title: '价格',
                    dataIndex: '价格',
                    key: '价格',
                },
                {
                    title: '推荐指数',
                    dataIndex: '推荐指数',
                    key: '推荐指数',
                }
            ],
            weather: {},
            showWeather: false
        }
    },

    methods: {
        async loadShareAnswer(shareKey) {
            const response = await fetch(`${API_BASE_URL}/getSharedAnswer?shareKey=${shareKey}`);
            const responseData = await response.json()
            console.log("shareAnswer:", responseData)
            this.travelPlanRes = responseData.data.sharedAnswer.travelPlan
            this.spotsRecommends = responseData.data.sharedAnswer.spotsRecommends
            this.foodRecommentds = responseData.data.sharedAnswer.foodRecommends
            this.pois = responseData.data.pois
            this.weather = responseData.data.weather
            this.city = responseData.data.city
            this.showWeather = true
            console.log("weather:", this.weather)
            console.log("pois_2:", this.pois)
        },
        renderMarkdown(content) {
            const res = md.render(content);
            return res;
        },
    },

    computed: {
        backgroundStyle() {
            console.log("pois:", this.pois)
            console.log("pois length:", this.pois.length, this.pois.length > 0)
            if (this.pois.length > 0) {
                console.log("photo:", this.pois[0].photos[0])
                return {
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover',
                    'background-image': `url('${this.pois[0].photos[0].url}')`,
                };
            } else {
                return {
                    'background-image': 'https://images.ixigo.com/node_image/f_auto/imageURL?url=https%3A%2F%2Fplan-cf.ixigo.com%2Fimages%2Fchengdu',
                };
            }
        }
    },

    mounted() {
        this.loadShareAnswer(this.id);
    }
}

</script>

<style>
.share-page-wrap {
    display: flex;
    flex-direction: column;
    /*background-image: url('https://images.ixigo.com/node_image/f_auto/imageURL?url=https%3A%2F%2Fplan-cf.ixigo.com%2Fimages%2Fchengdu'); */
}
</style>