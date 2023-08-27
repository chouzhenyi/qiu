<template>
  <PageMenu :items="items" />
</template>
<script lang="ts">
export default {
  name: "BasicLearning",
};
</script>
<script lang="ts" setup>
import { h } from "vue";
import { routerMenuType } from "@qiu/components/pageMenu";
import PageMenu from "@qiu/components/pageMenu/index.vue";
import { ApiOutlined, FormOutlined } from "@ant-design/icons-vue";

const items: routerMenuType[] = [
  {
    path: "/basicLearning/lifeCycle",
    name: "LifeCycle",
    label: "生命周期",
    title: "生命周期",
    key: 0,
    icon: () => h(ApiOutlined),
  },
  {
    path: "/basicLearning/customVModel",
    name: "CustomVModel",
    label: "自定义组件",
    title: "自定义组件",
    key: 1,
    icon: () => h(FormOutlined),
  },
];
</script>
