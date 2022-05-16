import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import i18n from './i18n'
import store from "./state/store";

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3"
import VueApexCharts from "vue3-apexcharts";
import Maska from 'maska';

import VueFeather from 'vue-feather';
import Particles from "particles.vue3";

import '@/assets/scss/config/material/app.scss';
import '@vueform/slider/themes/default.css';

AOS.init({
    easing: 'ease-out-back',
    duration: 1000
})

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.timeout = 3000;

createApp(App)
    .use(store)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .use(Maska)
    .use(Particles)
    .use(VueAxios, axios)
    .use(i18n)
    .use(vClickOutside).mount('#app');
