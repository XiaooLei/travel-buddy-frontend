import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router';
import vuetyped from 'vue3typed'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import './app.css'

const app = createApp(App);

app.use(vuetyped)
app.use(router);
app.use(ElementPlus)

app.use(Antd).mount('#app');
