import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw} from "vue-router";

import Home from "@/views/Home/index.vue";

export const routes: RouteRecordRaw []= [
    {
      name: "Home",
      path: "/",
        component: Home,
        meta: {
            title: '首页',
            
        }
    },
    {
      name: "User",
      path: "/user",
      redirect: "/user/basic",
        component: () => import("views/User/index.vue"),
        meta: {
            title: '用户界面'
        },
      children: [
        {
          name: "UserBasicInfo",
          path: "/user/basic",
          component: () => import("views/User/Basic/index.vue"),
        },
        {
          name: "UserLogin",
          path: "/user/login",
          component: () => import("views/User/Basic/login.vue"),
        },
        {
          name: "UserInfoEdit",
          path: "/user/userInfoEdit",
          component: () => import("views/User/Basic/userInfoEdit.vue"),
        },
      ],
    },
    {
      name: "Algorithm",
      path: "/algorithm",
        component: () => import("@/views/Algorithm/index.vue"),
        meta: {
            title: '算法练习'
        }
    },
    {
      name: "BasicLearning",
      path: "/basicLearning",
      redirect: "/basicLearning/lifeCycle",
        component: () => import("views/basicLearning/index.vue"),
        meta: {
            title: 'vue3 学习展示'
        },
      children: [
        {
          name: "LifeCycle",
          path: "/basicLearning/lifeCycle",
          component: () =>
            import("views/basicLearning/Knowledge/lifeCycle.vue"),
        },
        {
          name: "CustomVModel",
          path: "/basicLearning/customVModel",
          component: () =>
            import("views/basicLearning/Knowledge/customVModel/index.vue"),
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
        },
        {
          name: "ResearchTesseract",
          path: "/research/researchTesseract",
          component: () => import("views/Research/tesseract.vue"),
        },
      ],
    },
    {
      name: "MyHouse",
      path: "/myHouse",
      component: () => import("views/MyHouse/index.vue"),
        redirect: "/myHouse/myHouseManagement",
        meta: {
            title: '物品收纳'
        },
      children: [
        {
          name: "MyHouseManagement",
          path: "/myHouse/myHouseManagement",
          component: () => import("views/MyHouse/myHouseManagement.vue"),
        },
      ],
    },
  ]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
