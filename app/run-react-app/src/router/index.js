import Home from "../pages/home";
import RefTest from "../pages/refTest";
import DataFlow from "../pages/DataFlow";

export const routes = [
  {
    path: "/",
    component: Home,
    title: "首页",
  },
  {
    path: "/ref-test",
    component: RefTest,
    title: "ref 测试",
  },
  {
    path: "/data-flow",
    component: DataFlow,
    title: "数据流",
  },
];
