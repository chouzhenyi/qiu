import Home from "../pages/home";
import RefTest from "../pages/refTest";
import TransitionGroup from "../pages/transitionGroup";

export const routes = [
  {
    path: "/",
    component: Home,
    title: "首页",
  },
  {
    path: "/ref-test",
    // component: () => import("../pages/refTest"),
    component: RefTest,
    title: "ref 测试",
  },
  {
    path: "/transition-group",
    // component: () => import("../pages/transitionGroup"),
    component: TransitionGroup,
    title: "动画",
  },
];
