<template>
  <div>
    <div v-for="(item, index) in routerList" :key="index">
      <Button type="link">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Home",
};
</script>
<script lang="ts" setup>
import { Button } from "ant-design-vue";
const routerList = [
  {
    path: "/user",
    title: "用户界面",
  },
  {
    path: "/algorithm",
    title: "算法练习",
  },
  {
    path: "/user/userInfoEdit",
    title: "用户信息",
  },
  {
    path: "/basicLearning",
    title: "vue3学习展示",
  },
  {
    path: "/research/researchExcel",
    title: "奇技淫巧",
  },
  {
    path: "/myHouse",
    title: "租房物品收纳系统",
  },
];
</script>
<style lang="css"></style>
