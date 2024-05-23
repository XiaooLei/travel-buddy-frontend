<template>
    <div class="share-page-wrap">
        <div class="flex flex-col search-res-container gap-y-3 mt-5">
            <div class="flex justify-center">
                <div class="w-1/2 bg-slate-100 rounded-2xl p-6">
                    <p style="text-align: left" v-html="renderMarkdown(travelPlanRes)"></p>
                </div>
            </div>
        </div>

        <a-space direction="vertical" class="flex flex-col justify-center ">
            <div v-if="showWeather" style="padding: 20px;">
                <h2 class="text-white text-lg">未来15天天气</h2>
                <div class="flex justify-center">
                    <CityWeather :futureForecast="weather.data.forecast"/>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="relative grid grid-flow-col justify-start overflow-x-auto rounded-xl gap-3" style="width: 700px;">
                    <div v-for="poi in pois" :key="poi.name">
                        <PoiCard :poiName="poi.name" :rating="poi.biz_ext.rating" :photos="poi.photos"/>
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
    },
    data() {
        return {
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
            city: "",
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
            this.showWeather = true
            console.log("weather:",  this.weather)
        },
        renderMarkdown(content) {
            const res = md.render(content);
            return res;
        },
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
    background-image: url('https://images.ixigo.com/node_image/f_auto/imageURL?url=https%3A%2F%2Fplan-cf.ixigo.com%2Fimages%2Fchengdu');
}
</style>