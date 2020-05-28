import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import PerfectScrollbar from "vue2-perfect-scrollbar";
// import WebSocket from '@adonisjs/websocket-client';
import secureLocalStorage from "secure-ls";
import "material-icons/iconfont/material-icons.css";
import "./plugins/ant-design-vue.js";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

const LocalStorage = new secureLocalStorage();

const storage = LocalStorage.get("AdminData");

// const ws = WebSocket("ws://127.0.0.1:3333");

let token = "";

Vue.use(PerfectScrollbar);

// ws.connect();

// ws.on('open', () => {
//   console.log('connected!');
// });

// ws.on('close', () => {
//   console.log('not connected!');
// });

// Vue.prototype.$socket =  ws.subscribe('chat');

if (storage) {
  token = JSON.parse(storage);
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token.token}`;
}

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_END_POINTS;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
