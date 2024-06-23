<template>
  <view class="content">
    <uni-button class="button" @click="goScan">
      <text>扫码</text>
    </uni-button>
  </view>
  <view>{{ paramsRef }}</view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const paramsRef = ref("");
const goScan = () => {
  console.log("去扫码");
  uni.scanCode({
    // onlyFromCamera: true,
    success: (params) => {
      console.log(params);
      paramsRef.value = JSON.stringify(params);
    },
  });
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 44px);
}
</style>
