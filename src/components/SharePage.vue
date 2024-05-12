<template>
    <!-- <div class="header">
        <div class="left-blank"></div>
        <a-input-search v-model:value="travelSetting.destination" placeholder="输入你想去的目的地"
            @search="handleSearch(destination)" />
        <div class="right-blank">
            <button class="share" @click="copyCurrentUrlToClipboard">
                <IconShare />分享
            </button>
        </div>
    </div> -->
    <div class="wrap">
        <div class="left-side-bar">
            <a-space direction="vertical">
                <!-- <a-space>
                    <p>起点</p>
                    <a-input v-model:value="travelSetting.departureArea" placeholder="输入您的出发地" style="width: 150px" />
                </a-space>
                <a-space>
                    <p>预算</p>
                    <a-input prefix="￥" suffix="RMB" v-model:value="travelSetting.budget" style="width: 150px" />
                </a-space>
                <a-space>
                    <p>天数</p>
                    <a-input-number id="inputNumber" v-model:value="travelSetting.dayCount" :min="1" :max="10"
                        style="width: 150px" />
                </a-space>
                <a-space>
                    <p>风格</p>
                    <a-select v-model:value="travelSetting.style" show-search placeholder="旅行风格" style="width: 150px"
                        :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                        @change="handleChange"></a-select>
                </a-space> -->
            </a-space>
        </div>
        <div class="search-res-container">
            <p style="text-align: left" v-html="renderMarkdown(travelPlanRes)"></p>
        </div>
        <div class="right-side-bar">
            <a-space direction="vertical">
                <div>
                    <h2>必去景点</h2>
                    <a-table :dataSource="spotsRecommends" :columns="spotsRecommendsCols" :pagination="false" />
                </div>
                <div>
                    <h2>饮食推荐</h2>
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