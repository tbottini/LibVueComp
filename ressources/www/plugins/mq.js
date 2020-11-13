import Vue from 'vue';
import VueMq from 'vue-mq';

console.log("vue mq initialized");

Vue.use(VueMq, {
    breakpoints: {
        mobile: 650,
        desktop: Infinity
    }
})