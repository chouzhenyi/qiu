<template>
  <div>生命周期1111</div>
</template>
<script lang="ts">
export default {
  name: "LifeCycle",
};
</script>
<script lang="ts" setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} from "vue";
const startTime = performance.now();
const getEndTime = () => {
  const endTime = performance.now() - startTime;
  return `${Math.round(endTime * 1e3)}ms`;
};

console.log(`init => 组件初始时间:${getEndTime()}`);
onBeforeMount(() => {
  console.log(`onBeforeMount => 挂载完成前执行的钩子,到达时间:${getEndTime()}`);
});
onMounted(() => {
  console.log(`onMounted => 挂载完成后执行的钩子,到达时间:${getEndTime()}`);
});
onBeforeUpdate(() => {
  console.log(
    `onBeforeUpdate => 组件更新前执行的钩子,到达时间:${getEndTime()}`
  );
});
onUpdated(() => {
  console.log(`onMounted => 组件更新后执行的钩子,到达时间:${getEndTime()}`);
});
onBeforeUnmount(() => {
  console.log(`onMounted => 组件卸载前执行的钩子,到达时间:${getEndTime()}`);
});
onUnmounted(() => {
  console.log(`onMounted => 组件卸载后执行的钩子,到达时间:${getEndTime()}`);
});

onErrorCaptured(() => {
  console.log(`onErrorCaptured => 组件错误捕获的钩子,到达时间:${getEndTime()}`);
});
</script>
