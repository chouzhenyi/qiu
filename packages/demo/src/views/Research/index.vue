<template>
  <div class="research-wraper">
    <Menu
      class="item-menu"
      mode="vertical"
      v-model:selectedKeys="selectedKeys"
      :items="routerList"
      @click="handleRouterItemClick"
    />
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
import { useRouter } from "vue-router";
import { Menu } from "ant-design-vue";
import type { MenuProps, ItemType } from "ant-design-vue";
import { FileExcelOutlined, FileProtectOutlined } from "@ant-design/icons-vue";

type routerMenuType = ItemType & {
  path: string;
  name: string;
};
const routerList: routerMenuType[] = [
  {
    path: "/research/researchExcel",
    name: "ResearchExcel",
    label: "用户界面",
    title: "用户界面",
    key: 0,
    icon: () => h(FileExcelOutlined),
  },
  {
    path: "/research/researchTesseract",
    name: "ResearchTesseract",
    label: "识别身份证号码",
    title: "识别身份证号码",
    key: 1,
    icon: () => h(FileProtectOutlined),
  },
];
const selectedKeys = ref<number[]>([0]);
const { replace } = useRouter();
const handleRouterItemClick = ({ item }: Record<string, any>) => {
  const { path } = item;
  replace(path);
};
</script>
<style lang="less">
.research-wraper {
  display: flex;
  height: 100%;

  .item-menu {
    width: 256px;
  }
  .container {
    flex: 1;
  }
}
</style>
