import Vue from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import EventBus from "@/plugins/EventBus";
import ErrorHandler from "@/plugins/ErrorHandler";
import IconImage from "@/components/IconImage";
import "./filters";
import { version } from "../version.js";
import ScrollLoader from "vue-scroll-loader";
console.log("version", version);

Vue.use(Antd);
Vue.use(EventBus);
Vue.use(ErrorHandler);
Vue.use(ScrollLoader);
Vue.component("IconImage", IconImage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
