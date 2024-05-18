<template>
    <div class="wrap">
        <div class="left-side-bar">
            <a-space direction="vertical">
            </a-space>
        </div>
        <div class="search-res-container">
            <p style="text-align: left" v-html="renderMarkdown(travelPlanRes)"></p>
        </div>
        
        <div class="right-side-bar">
            <a-space direction="vertical">
                <div style="padding: 20px;">
                    <h2>未来7天天气</h2>
                    <CityWeather />
                </div>
                <h2>必去景点</h2>
                <div class="overflow-y-auto" style="height: 350px;">
                    <a-table :dataSource="spotsRecommends" :columns="spotsRecommendsCols" :pagination="false" />
                </div>
                <h2>饮食推荐</h2>
                <div class="overflow-y-auto" style="height: 350px;">
                    <a-table :dataSource="foodRecommentds" :columns="foodRecommendsCols" :pagination="false" />
                </div>
                <!-- <div>
                    酒店推荐
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false"/>
                </div> -->
            </a-space>
        </div>
    </div>
</template>


<script>

import { API_BASE_URL } from '../config.js'
import MarkdownIt from 'markdown-it';
import CityWeather from '@/components/CityWeather.vue'
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
    },
    data() {
        return {
            travelPlanRes: "",
            spotsRecommends: [],
            foodRecommentds: [],
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
        }
    },

    methods: {
        async loadShareAnswer(shareKey) {
            const response = await fetch(`${API_BASE_URL}/getSharedAnswer?shareKey=${shareKey}`);
            const responseData = await response.json()
            console.log("shareAnswer:", responseData)
            this.travelPlanRes = responseData.data.travelPlan
            this.spotsRecommends = responseData.data.spotsRecommends
            this.foodRecommentds = responseData.data.foodRecommends
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
.wrap {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
}


</style>