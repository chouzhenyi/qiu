<template>
  <view class="content">
    <view v-for="(page, index) in getPages" :key="index">
      <button type="button" @click="goAppPages(page)" class="button">
        <text>{{ page.title }}</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import pagesJson from "@/pages.json";
type pageItemType = { path: string; title: string };
const getPages = computed((): pageItemType[] => {
  const { pages } = pagesJson;
  return pages
    .filter((page) => {
      return !page.path.endsWith("/index/index");
    })
    .map(({ path, style }) => {
      const { navigationBarTitleText: title } = style;
      return {
        path: `/${path}`,
        title,
      };
    });
});
const goAppPages = (page: pageItemType) => {
  const { path } = page;
  uni.navigateTo({ url: path });
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  padding: 20px 0;
}
</style>
