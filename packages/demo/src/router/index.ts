import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "@/views/Home/index.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home,
    },
    {
      name: "User",
      path: "/user",
      redirect: "/user/basic",
      component: () => import("views/User/index.vue"),
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
      component: () => import("views/algorithm/index.vue"),
    },
  ],
});
