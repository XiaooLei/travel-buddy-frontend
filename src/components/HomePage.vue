<template>
    <div class="header">
        <div class="left-blank"></div>
        <a-input-search v-model:value="travelSetting.destination" placeholder="输入你想去的目的地"
            @search="handleSearch(destination)" />
        <div class="right-blank">
            <button class="share" @click="copyCurrentUrlToClipboard">
                <IconShare />分享
            </button>
        </div>
    </div>
    <div class="wrap">
        <div class="left-side-bar">
            <a-space direction="vertical">
                <a-space>
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
                </a-space>
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
import MarkdownIt from 'markdown-it';
import { API_BASE_URL } from '../config.js'
import { IconShare } from './icons/index'
import { message } from 'ant-design-vue'
const md = new MarkdownIt({
    html: true,
    linkify: true,
    // 其他配置...
});


const getSpotsRecommends = async (destination, shareKey) => {
    try {
        console.log("enter getSpotsRecommends");
        const response = await fetch(`${API_BASE_URL}/getSpotsRecommends?destination=${destination}&shareKey=${shareKey}`);
        
        if (!response.ok) {
            // throw new Error(`Network error: ${response.status}`);
            console.log("getSpotsRecommends call fail");
            return
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(
            "Error fetching article with id ${ id }", error); throw error;
    }
}


const getFoodRecommends = async (destination, shareKey) => {
    try {
        console.log("enter getFoodRecommends");
        const response = await fetch(`${API_BASE_URL}/getFoodRecommends?destination=${destination}&shareKey=${shareKey}`);
        if (!response.ok) {
            // throw new Error(`Network error: ${response.status}`);
            console.log("getFoodRecommends call fail");
            return
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(
            "Error fetching article with id ${ id }", error); throw error;
    }
}

const copyText = async (val) => {
  if (navigator.clipboard && navigator.permissions) {
    await navigator.clipboard.writeText(val)
  } else {
    const textArea = document.createElement('textArea')
    textArea.value = val
    textArea.style.width = 0
    textArea.style.position = 'fixed'
    textArea.style.left = '-999px'
    textArea.style.top = '10px'
    textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(textArea)

    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}




export default {
    name: 'HomePage',
    props: {
        msg: String
    },
    components: { IconShare },
    data() {
        return {
            travelSetting: {
                departureArea: "",
                destination: "",
                dayCount: 0,
                budget: 0,
                style: "",
            },
            travelPlanRes: "",
            printing: false,
            options: [{
                value: '特种兵',
                label: '特种兵',
            }, {
                value: '休闲',
                label: '休闲',
            }, {
                value: '文化',
                label: '文化',
            }, {
                value: '自然',
                label: '自然',
            }
            ],
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
            shareKey: 1
        }
    },
    methods: {
        async handleSearch() {
            console.log("url:", `${API_BASE_URL}/getTravelPlan`)
            // 创建一个 SSE 连接
            this.travelPlanRes = "搜索中..."
            this.printing = false

            const { v4: uuidv4 } = require('uuid');

            this.shareKey = uuidv4();

            const sse = new EventSource(`${API_BASE_URL}/getTravelPlan?travelSetting=${JSON.stringify(this.travelSetting)}&shareKey=${this.shareKey}`);
            sse.onmessage = (event) => {
                // 处理 SSE 消息
                if (this.printing) {
                    const data = JSON.parse(event.data)
                    if (data['type'] === 'text') {
                        this.travelPlanRes = this.travelPlanRes + data['text']
                    }
                } else {
                    this.printing = true
                    this.travelPlanRes = ""
                }
            };
            // 其他 SSE 事件处理器可以在这里设置...
            // 可选：监听打开事件，当连接打开时触发
            sse.onopen = function (event) {
                console.log("Connection to server opened", event);
            };
            // 可选：监听错误事件，当发生错误时触发
            sse.onerror = function (event) {
                console.log("An error occurred", event);
                // 可以选择重试连接
                sse.close();
            };

            (async () => {
                const data = await getSpotsRecommends(this.travelSetting.destination, this.shareKey)
                console.log("spotsRecommends:", data)
                this.spotsRecommends = data.data
                this.showEvents = true
            })();

            (async () => {
                const data = await getFoodRecommends(this.travelSetting.destination, this.shareKey)
                console.log("foodRecommends:", data)
                this.foodRecommentds = data.data
                this.showEvents = true
            })();
        },

        renderMarkdown(content) {
            const res = md.render(content);
            return res;
        },
        // 复制当前页面URL到剪贴板的函数
        async copyCurrentUrlToClipboard() {
        try {
            // 获取当前页面的URL
            const currentUrl = window.location.origin;
            console.log("currentUrl:", currentUrl)
            const id = this.shareKey
            const shareUrl = `${currentUrl}/share/${id}`
            // 写入剪贴板
            message.info('已复制到剪切板', 2)
            await copyText(shareUrl)
        } catch (err) {
            // 如果有错误发生，打印错误信息
            console.error('无法复制当前页面URL到剪贴板', err)
        }
        }
    }
}
</script>

<style>
.header {
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 100;
    height: 50px;
    border-bottom: solid 1px #f2f4f7;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;

    .search {
        padding-top: 40px;
    }

    .right-blank {
        display: grid;

        .share {
            border: #1570ef 1px solid;
            width: 100px;
            height: 40px;
            background-color: transparent;
            line-height: 40px;
            color: #1570ef;
            border-radius: 2%;
            justify-self: center; /* 水平居中 */
            align-self: center; /* 垂直居中 */
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 20px;
          }
    }
    
}

.wrap {
    display: grid;
    grid-template-columns: 6fr 12fr 7fr;
    height: calc(100% - 100px);
    min-height: 1000px;

    .left-side-bar {
        min-height: 100%;
        height: 100%;
        width: 100%;
        margin-top: 100px;
        margin-right: 20px;
    }

    .right-side-bar {
        background-color: white;
    }

    .search-res-container {
        padding: 10px;
    }
}
</style>