<template>
  <div class="research-wraper">
    <div class="route-wrapper">
      <RouterLink
        v-for="(route, index) in routerList"
        :to="route.path"
        :key="index"
      >
        {{ route.meta?.title }}
      </RouterLink>
    </div>
    <router-view class="container"></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: "Research",
};
</script>
<script lang="ts" setup>
import { h, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { routes } from "../../router/index";

const routerList = routes.find((route) => route.name === "Research")?.children;
const selectedKeys = ref<number[]>([0]);
const { replace } = useRouter();
const handleRouterItemClick = ({ item }: Record<string, any>) => {
  const { path } = item;
  replace(path);
};
</script>
<style lang="less">
.research-wraper {
  height: 100%;
  padding: 10px;
  .route-wrapper {
    padding: 10px 0;
    a {
      line-height: 30px;
      padding-left: 10px;
      border-left: 1px solid #eee;
    }
  }
}
</style>
