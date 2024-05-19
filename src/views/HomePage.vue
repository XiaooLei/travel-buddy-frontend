<template>
    <div class="flex flex-col justify-center mt-36 gap-4">
        <div class="upblank"></div>
        <div class="logo flex flex-col justify-center gap-10">
            <div class="flex justify-center">
                <div class="flex flex-col justify-center gap-4">
                    <img width="203" height="48" src="../../public/flight2.jpeg">
                    <h1 style="font-size: 250%;">旅伴AI</h1>
                    <div class="flex justify-center">
                        <vuetyped :strings="['出去玩不想做攻略？', '旅伴AI帮你']" :loop="true" :smart-backspace="true">
                            <div class="typing" />
                        </vuetyped>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col input-content rounded-2x px-4 py-4 rounded-lg shadow-2xl">
                <textarea v-model="planGoal" placeholder="成都，3天的旅行计划，预算3000左右" style="height: 100px; width:728px; border:none"
                    class="rounded-none px-2 py-2 resize-none" :bordered="false" @keypress="handleEnterKeyPress"/>
                <div class="flex justify-end">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="36" height="36" rx="12" fill="#EAEAEA"></rect>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M17.9996 10.25C18.8281 10.25 19.4996 10.9216 19.4996 11.75V24.25C19.4996 25.0784 18.8281 25.75 17.9996 25.75C17.1712 25.75 16.4996 25.0784 16.4996 24.25V11.75C16.4996 10.9216 17.1712 10.25 17.9996 10.25Z"
                            fill="white"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M19.152 10.7898C19.6823 11.4262 19.5963 12.372 18.9599 12.9024L13.5599 17.4024C12.9235 17.9327 11.9777 17.8467 11.4473 17.2103C10.917 16.5739 11.003 15.6281 11.6394 15.0977L17.0394 10.5977C17.6758 10.0674 18.6216 10.1533 19.152 10.7898Z"
                            fill="white"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M16.8475 10.7898C16.3172 11.4262 16.4031 12.372 17.0396 12.9024L22.4396 17.4024C23.076 17.9327 24.0218 17.8467 24.5522 17.2103C25.0825 16.5739 24.9965 15.6281 24.3601 15.0977L18.9601 10.5977C18.3237 10.0674 17.3779 10.1533 16.8475 10.7898Z"
                            fill="white"></path>
                    </svg>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
export default {
    name: "HomePage",
    data() {
        return {
            planGoal: "",
        }
    },

    methods: {
        handleEnterKeyPress(event) {
            if (event.keyCode === 13 || event.key === 'Enter') {
                console.log(this.planGoal);
                // const { v4: uuidv4 } = require('uuid');
                // const shareKey = uuidv4();
                this.$router.push({ path: '/travelPlan', query: { planGoal: this.planGoal } });
            }
        }
    },

    mounted() {


    }
}



</script>


<style>
.outside-wrapper {
    height: 800px;
    background-color: white;
    display: flex;
    flex-direction: column;

    .upblank {
        height: 150px;
    }

    .logo {
        height: 150px;

    }

    .input-content {
        display: flex;
        justify-content: center;
        padding: 40px;
    }
}

/* 移除文本框获得焦点时的边框高亮 */
input[type="text"]:focus,
textarea:focus {
    outline: none;
}

/* 如果你还想改变文本框的正常状态下的边框样式，可以添加如下代码 */
input[type="text"],
textarea {
    border: 1px solid #ccc;
    /* 举例的边框样式 */
    padding: 4px;
    /* 添加一些内边距 */
}

/* 你也可以为文本框添加一些悬浮状态（hover）的样式 */
input[type="text"]:hover,
textarea:hover {
    border-color: #999;
    /* 悬浮时边框颜色变深 */
}
</style>