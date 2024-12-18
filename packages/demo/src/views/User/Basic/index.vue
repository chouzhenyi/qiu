<template>
  <div>用户基本信息</div>
  <div>{{ message }}</div>
  <div>
    <router-link to="/user/login">
      <Button type="link">去登录</Button>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref } from "vue";
const eventSource = new EventSource("/api/user/sse");
const message = ref("");
eventSource.onmessage = ({ data }) => {
  //   console.log("data =>", typeof data);
  const { hello } = JSON.parse(data);
  message.value = `${new Date().getSeconds()}:${hello}`;
};
</script>
