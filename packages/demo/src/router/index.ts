import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "@/views/Home/index.vue";

export const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    name: "User",
    path: "/user",
    redirect: "/user/basic",
    component: () => import("views/User/index.vue"),
    meta: {
      title: "用户界面",
    },
    children: [
      {
        name: "UserBasicInfo",
        path: "/user/basic",
        component: () => import("views/User/Basic/index.vue"),
        meta: {
          parent: "User",
          title: "用户基本信息",
        },
      },
      {
        name: "UserLogin",
        path: "/user/login",
        component: () => import("views/User/Basic/login.vue"),
        meta: {
          parent: "User",
          title: "用户登录",
        },
      },
      {
        name: "UserInfoEdit",
        path: "/user/userInfoEdit",
        component: () => import("views/User/Basic/userInfoEdit.vue"),
        meta: {
          parent: "User",
          title: "用户信息编辑",
        },
      },
    ],
  },
  {
    name: "Algorithm",
    path: "/algorithm",
    component: () => import("@/views/Algorithm/index.vue"),
    meta: {
      title: "算法练习",
    },
  },
  {
    name: "BasicLearning",
    path: "/basicLearning",
    redirect: "/basicLearning/lifeCycle",
    component: () => import("views/basicLearning/index.vue"),
    meta: {
      title: "vue3 学习展示",
    },
    children: [
      {
        name: "LifeCycle",
        path: "/basicLearning/lifeCycle",
        component: () => import("views/basicLearning/Knowledge/lifeCycle.vue"),
        meta: {
          parent: "BasicLearning",
          title: "生命周期",
        },
      },
      {
        name: "CustomVModel",
        path: "/basicLearning/customVModel",
        component: () =>
          import("views/basicLearning/Knowledge/customVModel/index.vue"),
        meta: {
          parent: "BasicLearning",
          title: "自定义VModel",
        },
      },
    ],
  },
  {
    name: "Research",
    path: "/research",
    component: () => import("views/Research/index.vue"),
    redirect: "/research/researchExcel",
    meta: {
      title: "奇技淫巧",
    },
    children: [
      {
        name: "ResearchExcel",
        path: "/research/researchExcel",
        component: () => import("views/Research/excel.vue"),
        meta: {
          parent: "Research",
          title: "搜索excel",
        },
      },
      {
        name: "ResearchTesseract",
        path: "/research/researchTesseract",
        component: () => import("views/Research/tesseract.vue"),
        meta: {
          parent: "Research",
          title: "数字识别",
        },
      },
      {
        name: "downloadVideo",
        path: "/research/downloadVideo",
        component: () => import("views/Research/downloadVideo.vue"),
        meta: {
          parent: "Research",
          title: "下载视频",
        },
      },
      {
        name: "demo",
        path: "/research/demo",
        component: () => import("views/Research/demo.vue"),
        meta: {
          parent: "Research",
          title: "手写代码练习",
        },
      },
    ],
  },
  {
    name: "MyHouse",
    path: "/myHouse",
    component: () => import("views/MyHouse/index.vue"),
    redirect: "/myHouse/myHouseManagement",
    meta: {
      title: "物品收纳",
    },
    children: [
      {
        name: "MyHouseManagement",
        path: "/myHouse/myHouseManagement",
        component: () => import("views/MyHouse/myHouseManagement.vue"),
        meta: {
          parent: "MyHouse",
          title: "房间管理",
        },
      },
    ],
  },
  {
    name: "MonitorSystem",
    path: "/monitorSystem",
    component: () => import("views/MonitorSystem/index.vue"),
    meta: {
      title: "监控系统",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
