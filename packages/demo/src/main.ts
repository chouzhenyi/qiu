import { createApp } from "vue";
import { router } from "./router";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const application = createApp(App);
application.config.errorHandler = (err, instance, info) => {
  console.log("****** 应用存在错误 START ******");
  console.log(err, instance, info);
  console.log("****** 应用存在错误 END ******");
};
application.use(router).use(Antd).mount("#app");
