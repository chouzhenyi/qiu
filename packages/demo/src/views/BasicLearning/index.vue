<template>
  <div>
    <div class="link-wrapper">
      <RouterLink v-for="(link, index) in items" :to="link.path" :key="index">
        {{ link.label }}
      </RouterLink>
    </div>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts">
export default {
  name: "BasicLearning",
};
</script>
<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";

const items = [
  {
    path: "/basicLearning/lifeCycle",
    name: "LifeCycle",
    label: "生命周期",
    title: "生命周期",
  },
  {
    path: "/basicLearning/customVModel",
    name: "CustomVModel",
    label: "自定义VModel",
    title: "自定义VModel",
  },
];
</script>
<style lang="less">
.link-wrapper {
  a {
    padding: 0 10px;
    color: #639ef4;
  }
}
</style>
