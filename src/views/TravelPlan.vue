<template>
    <div class="main-page-wrap" :style="backgroundStyle" style="min-height: 1200px;">
        <div class="header">
            <div class="left-blank text-2xl">
                旅伴AI
            </div>
            <!-- <div> </div> -->
            <a-input-search v-model:value="travelSetting.destination" placeholder="输入你想去的目的地"
                @search="handleSearch(destination)" />
            <div class="right-blank">
                <button class="share" @click="copyCurrentUrlToClipboard">
                    <IconShare />分享
                </button>
            </div>
        </div>
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

        <div class="flex flex-col search-res-container gap-y-3 mt-5">
            <div class="text-3xl">
                <h1>{{travelPlanTitle}}</h1>
            </div>
            <div class="flex justify-center">
                <div class="w-1/2 bg-slate-100 rounded-2xl p-6">
                    <p style="text-align: left" v-html="renderMarkdown(travelPlanRes)"></p>
                </div>
            </div>
        </div>
        
        <a-space direction="vertical" class="flex flex-col justify-center ">
            <!-- <div class="flex justify-center ">
                <div class="bg-white w-1/2 rounded-2xl p-3">
                    <h2>必去景点</h2>
                    <div class="overflow-y-auto" style="height: 350px;">
                        <a-table :dataSource="spotsRecommends" :columns="spotsRecommendsCols" :pagination="false" />
                    </div>
                </div>
            </div> -->
            <div v-if="showPoiCards" class="flex justify-center mt-3">
                <div class="relative grid grid-flow-col justify-start overflow-x-auto rounded-xl gap-3" style="width: 700px;">
                    <div v-for="poi in pois" :key="poi.name">
                        <PoiCard :poiName="poi.name" :rating="poi.biz_ext.rating" :photos="poi.photos" 
                        :cordX="poi.cord_x" :cordY="poi.cord_y" :address="poi.address" :telephone="poi.tel"
                        :price="poi.biz_ext.cost"/>
                    </div>
                </div>
            </div>
            <div v-if="showFoodRecommends" class="flex justify-center ">
                <div class="bg-white w-1/2 rounded-2xl p-3">
                    <h2>饮食推荐</h2>
                    <div class="overflow-y-auto" style="height: 350px;">
                        <a-table :dataSource="foodRecommentds" :columns="foodRecommendsCols" :pagination="false" />
                    </div>
                </div>
            </div>
            <div v-if="showWeather" style="padding: 20px;">
                <h2 class="text-white">未来15天天气</h2>
                <div class="flex justify-center">
                    <CityWeather :futureForecast="weather.data.forecast" />
                </div>
            </div>
            <!-- <div>
                    酒店推荐
                    <a-table :dataSource="dataSource" :columns="columns" :pagination="false"/>
                </div> -->
        </a-space>
        <div style="height: 40px;">
        </div>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { API_BASE_URL } from '../config.js'
import { IconShare } from '@/icons/index'
import { message } from 'ant-design-vue'
import CityWeather from '@/components/CityWeather.vue'
import PoiCard from '@/components/PoiCard.vue';
import WeatherIcon from '@/components/WeatherIcon.vue';
const md = new MarkdownIt({
    html: true,
    linkify: true,
    // 其他配置...
});


// const getSpotsRecommends = async (destination, shareKey) => {
//     try {
//         console.log("enter getSpotsRecommends");
//         const response = await fetch(`${API_BASE_URL}/getSpotsRecommends?destination=${destination}&shareKey=${shareKey}`);

//         if (!response.ok) {
//             // throw new Error(`Network error: ${response.status}`);
//             console.log("getSpotsRecommends call fail");
//             return
//         }
//         const data = await response.json();
//         return data
//     } catch (error) {
//         console.error(
//             "Error fetching article with id ${ id }", error); throw error;
//     }
// }


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
            "Error fetching getFoodRecommends", error); throw error;
    }
}

const getWeather = async (destination) => {
    try {
        console.log("enter getWeather")
        const response = await fetch(`${API_BASE_URL}/getWeather?destination=${destination}`);
        if (!response.ok) {
            console.log("getWeather call fail");
            return
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(
            "Error fetching getWeather", error); throw error;
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
    components: {
        IconShare,
        CityWeather,
        PoiCard,
        WeatherIcon
    },
    data() {
        return {
            travelSetting: {
                departureArea: "",
                destination: "",
                dayCount: 0,
                budget: 0,
                style: "",
            },
            city: "",
            showWeather: false,
            showPoiCards: false,
            showFoodRecommends: false,
            pois: [],
            travelPlanTitle: "",
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
            shareKey: 1,
            travelGoal: "",
            weather: []
        }
    },
    methods: {
        async handleSearch() {
            console.log("url:", `${API_BASE_URL}/getTravelPlan`)
            // 创建一个 SSE 连接
            this.travelPlanRes = "搜索中..."
            this.printing = false
            this.showFoodRecommends = false
            this.showWeather = false
            this.showPoiCards = false

            this.pois = []

            const { v4: uuidv4 } = require('uuid');

            this.shareKey = uuidv4();

            const sse = new EventSource(`${API_BASE_URL}/getTravelPlan?travelSetting=${JSON.stringify(this.travelSetting)}&shareKey=${this.shareKey}`);
            sse.onmessage = (event) => {
                // 处理 SSE 消息
                if (this.printing) {
                    const data = JSON.parse(event.data)
                    if (data['type'] === 'text') {
                        this.travelPlanRes = this.travelPlanRes + data['text']
                    } else if (data['type'] === 'poi') {
                        this.showPoiCards = true
                        this.pois.push(data['poi'])
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
                const data = await getFoodRecommends(this.travelSetting.destination, this.shareKey)
                console.log("foodRecommends:", data)
                this.foodRecommentds = data.data
                this.showFoodRecommends = true
            })();
            
            (async () => {
                const data = await getWeather(this.travelSetting.destination)
                if (data.msg == "succ") {
                    console.log("weather:", data)
                    this.weather = data.data.weather
                    this.city = data.data.city
                    this.showWeather = true
                } else if (data.msg === "city_not_found") {
                    this.city = ""
                    this.showWeather = false
                }
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
    },
    created() {
        const planGoal = this.$route.query.planGoal;
        console.log("旅行目标：", planGoal)
        this.travelSetting.destination = planGoal
        this.handleSearch()
    },
    computed: {
        backgroundStyle() {
            console.log("pois:", this.pois)
            console.log("pois length:", this.pois.length, this.pois.length > 0)
            let imgUrl = 'https://images.ixigo.com/node_image/f_auto/imageURL?url=https%3A%2F%2Fplan-cf.ixigo.com%2Fimages%2Fchengdu'
            let found = false
            if (this.pois.length > 0) {
                for (let i = 0; i < this.pois.length; i++) {
                    for (let j = 0; j < this.pois[i].photos.length; j++) {
                        if ('url' in this.pois[i].photos[j]) {
                            imgUrl = this.pois[i].photos[j].url
                            found = true
                            break
                        }
                    }
                    if (found) {
                        break
                    }
                }
                console.log("photo:", this.pois[0].photos[0])
                return {
                    'background-image': `url('${imgUrl}')`,
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover',
                };
            } else {
                return {
                    'background-image': 'https://images.ixigo.com/node_image/f_auto/imageURL?url=https%3A%2F%2Fplan-cf.ixigo.com%2Fimages%2Fchengdu',
                };
            }
        }
    },
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
    margin-top: 20px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);


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
            justify-self: center;
            /* 水平居中 */
            align-self: center;
            /* 垂直居中 */
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 20px;
        }
    }

}
</style>