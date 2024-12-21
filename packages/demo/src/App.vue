<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import type { RouteMeta, RouteLocationRaw } from "vue-router";
import { computed, ref } from "vue";
import { routes } from "./router/index";
import { getUserInfo } from "./api/use";

const $route = useRoute();
const $router = useRouter();
const getRouteData = computed(() => {
  const { name, path } = $route;
  return { name, path };
});

const getShowMenu = computed(() => {
  return getRouteData.value?.name && getRouteData.value.name !== "UserLogin";
});

const curPathRef = ref<RouteLocationRaw>(location.hash.replace(/^#/, ""));

const routerList = computed(() => {
  const curPath = curPathRef.value as string;
  return routes.map((route) => {
    const { path } = route;
    const meta = route.meta as RouteMeta;
    const active =
      curPath === "/" ? curPath === path : curPath.startsWith?.(path);
    return {
      path,
      title: meta.title,
      active,
    };
  });
});

const menuActiveClick = async (path: RouteLocationRaw) => {
  curPathRef.value = path;
  await $router.push(path);
};

// getUserInfo()
//   .then((data) => {
//     console.log("getUserInfo", data);
//   })
//   .catch(() => {
//     $router.replace({
//       name: "UserLogin",
//     });
//   });
</script>

<template>
  <div id="app">
    <div class="menu-wrapper" v-if="getShowMenu">
      <div
        v-for="(item, index) in routerList"
        :key="index"
        class="menu-item"
        :class="{
          'menu-item-active': item.active,
        }"
        @click="
          () => {
            menuActiveClick(item.path);
          }
        "
      >
        {{ item.title }}
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
#app {
  display: flex;

  .menu-wrapper {
    width: 200px;
    .menu-item {
      line-height: 42px;
      border-bottom: 1px solid #639ef4;
      text-align: center;
      padding: 0 20px;
      cursor: pointer;
      &-active {
        background-color: #639ef4;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
