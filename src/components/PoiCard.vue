<template>
    <div class="relative rrounded-3xl h-36 w-44 p-4" :style="backgroundStyle" @click="detailVisible = !detailVisible">
        <div class="font-normal absolute text-white right-1.5 top-1.5 bg-green-600 rounded p-1">
            <p>{{ rating }}</p>
        </div>
        <div class="flex justify-center">
            <div class="font-normal absolute text-white bottom-1">
                <p>{{ poiName }}</p>
            </div>
        </div>
    </div>
    
    <a-drawer v-model:visible="detailVisible" class="custom-class" style="padding: 0%;">
        <a-carousel arrows :autoplay="true" class="rounded-md">
            <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                    <left-circle-outlined />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                    <right-circle-outlined />
                </div>
            </template>
            <div v-for="photo in photos" :key="photo.url">
                <img :src="photo.url" alt="Image">
            </div>
        </a-carousel>
        <div class="flex flex-col justify-center">
            <div class="flex justify-center gap-10">
                <div class="text-lg p-3">{{ poiName }}</div>
            </div>
            <div class="flex justify-center pb-3">
                <div class="flex justify-center align-center bg-green-300 w-16 h-8 p-1.5 gap-1 rounded-md">
                    <svg color="rgb(35, 140, 70)" width="1em" height="1em" font-size="1.5rem" fill="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="StarFilledIcon"
                        class="text-success-500 text-lg" style="user-select: none; display: inline-block;">
                        <path fill-rule="evenodd"
                            d="M10.7506 3.9473c.3932-1.263 2.1056-1.263 2.4988 0l1.519 4.8784h4.9154c1.2726 0 1.8017 1.6994.7721 2.4801l-3.9766 3.015 1.519 4.8784c.3932 1.2631-.9921 2.3134-2.0217 1.5328L12 17.7169 8.0234 20.732c-1.0296.7806-2.415-.2697-2.0217-1.5328l1.519-4.8784-3.9766-3.015c-1.0296-.7807-.5005-2.48.7721-2.48h4.9154l1.519-4.8785Z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <p>{{ rating }}</p>
                </div>
            </div>
            <div v-if="typeof address === 'string'">
                <svg width="1em" height="1em" font-size="1.5rem" fill="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" data-testid="LocationOnIcon" class="flex items-center"
                    style="user-select: none; display: inline-block;">
                    <path fill-rule="evenodd"
                        d="M9.024 5.4962c1.7843-1.3319 4.2408-1.3235 6.0092.0246 1.7879 1.363 2.4429 3.7546 1.5993 5.8391l-.1479.3654a24.2743 24.2743 0 0 1-3.0624 5.4319l-1.3802 1.8453-1.4296-1.8697a23.9336 23.9336 0 0 1-3.1112-5.4071l-.1203-.2914c-.874-2.1174-.1946-4.5664 1.643-5.938Zm-.8985-1.205c2.3194-1.7314 5.5142-1.7229 7.8184.0337 2.3268 1.7738 3.1793 4.8864 2.0813 7.5993l-.1478.3654a25.7767 25.7767 0 0 1-3.2522 5.7685l-1.975 2.6406a.7513.7513 0 0 1-1.1982.0064l-2.033-2.6587a25.4377 25.4377 0 0 1-3.3067-5.7468l-.1203-.2914c-1.1374-2.7557-.2524-5.9361 2.1335-7.717Zm4.9295 4.8376c0 .5968-.4835 1.0806-1.08 1.0806s-1.08-.4838-1.08-1.0806.4835-1.0806 1.08-1.0806 1.08.4838 1.08 1.0806Zm1.5026 0c0 1.4272-1.1563 2.5841-2.5826 2.5841-1.4264 0-2.5827-1.1569-2.5827-2.584 0-1.4272 1.1563-2.5842 2.5827-2.5842 1.4263 0 2.5826 1.157 2.5826 2.5841Z"
                        clip-rule="evenodd"></path>
                </svg>
               {{address}}
            </div>
            <div v-if="typeof telephone === 'string'" class="flex items-center gap-2">
                <phone-outlined />
                <p>{{telephone}}</p>
            </div>
            <div class="flex items-center gap-2">
                <div v-if="typeof price === 'string'">
                    <p >¥  {{price}} / 人</p>
                </div>
            </div>
        </div>
        <map-container v-if="detailVisible" :x="cordX" :y="cordY" :location="poiName"></map-container>
    </a-drawer>
</template>

<script>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { PhoneOutlined } from '@ant-design/icons-vue';
import MapContainer from './MapContainer.vue';


export default {
    name: "PoiCard",
    components: {
        LeftCircleOutlined,
        RightCircleOutlined,
        PhoneOutlined,
        MapContainer
    },
    props: {
        poiName: {
            type: String,
            default: '成都' // 默认天气参数
        },
        rating: {
            type: Number,
            default: 4.7
        },
        photos: {
            type: Array,
            default: function () {
                // 返回一个新数组，以确保每个组件实例都有其独立的默认值
                return [
                    {
                        url: "http://store.is.autonavi.com/showpic/57cd78b893462e8923dcd1e1c1e37e81",
                    },
                    {
                        url: "http://store.is.autonavi.com/showpic/57cd78b893462e8923dcd1e1c1e37e81",
                    }
                ];
            }
        },
        telephone: {
            type: String,
            default: "010-xxxx"    
        },
        address: {
            type: String,
            default: "xxxx"
        },
        price: {
            type: String,
            default: "xxx"
        },
        cordX: {
            type: Number,
            default: 116.397428
        },
        cordY: {
            type: Number,
            default: 39.90923
        }
    },
    data() {
        return {
            detailVisible: false,
            customClass: 'my-custom-drawer'
        }
    },
    computed: {
        backgroundStyle() {
            return {
                'background-image': `url('${this.photos[0].url}')`,
                'background-size': 'cover',
                'background-position': 'center',
                'border-radius': '15px', // 根据需要设置圆角
            };
        }
    },
    methods: {
    },
    mounted() {
        console.log("price:", this.price)
    }
}



</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: auto;
    line-height: auto;
    background: #364d79;
    overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}

.ant-drawer-body {
    flex-grow: 1;
    padding-left:  0px !important;;
    padding-right: 0px !important;;
    overflow: auto;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
}

.my-custom-drawer :deep(.ant-drawer-body) {
    padding: 0;
}


</style>