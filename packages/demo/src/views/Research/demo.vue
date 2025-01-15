<template>
  <div>
    <h1>myPromise</h1>
    <Button type="primary" @click="checkPromise">点击演示手写promise</Button>
  </div>
</template>
<script lang="ts">
export default {
  name: "Demo",
};
</script>
<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { myPromise } from "@qiu/components/promise/index";
const checkPromise = () => {
  const p1 = new myPromise((resolve, reject) => {
    setTimeout(() => {
      0 && resolve("成功");
    }, 1e3);
    if (1 === 1) {
      reject("失败");
    }
  });
  p1.then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
};
</script>
