<template>
    <div class="relative rrounded-3xl h-36 w-44 p-4" :style="backgroundStyle">
        <div class="font-normal absolute text-white right-1.5 top-1.5 bg-green-600 rounded p-1" >
            <p>{{rating}}</p>
        </div>
        <div class="flex justify-center">
            <div class="font-normal absolute text-white bottom-1" >
                <p>{{poiName}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "PoiCard",
    props: {
        poiName: {
            type: String,
            default: '' // 默认天气参数
        }
    },
    data() {
        return {
            name: "成都",
            rating: 4.5,
            images: ["http://store.is.autonavi.com/showpic/57cd78b893462e8923dcd1e1c1e37e81"],
        }
    },
    computed: {
        backgroundStyle() {
            return {
                'background-image': `url('${this.images[0]}')`,
                'background-size': 'cover',
                'background-position': 'center',
                'border-radius': '15px', // 根据需要设置圆角
            };
        }
    }
}

</script>

<style></style>