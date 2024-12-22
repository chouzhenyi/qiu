<template>
  <Card class="card" title="下载视频">
    <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <FormItem label="视频m3u8地址">
        <Input v-model:value="formState.url" />
      </FormItem>
      <FormItem label="视频名称">
        <Input v-model:value="formState.name" />
      </FormItem>
      <FormItem :wrapper-col="{ span: 14, offset: 8 }">
        <Button type="primary" @click="onSubmit">开始下载</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script lang="ts">
export default {
  name: "DownloadView",
};
</script>
<script lang="ts" setup>
import { Card, Form, FormItem, Input, Button } from "ant-design-vue";
import { reactive, ref } from "vue";
import { downloadVideo } from "../../api/download.video";
const formState = reactive({
  url: "",
  name: "",
});
const labelCol = ref({ span: 8 });
const wrapperCol = ref({ span: 14 });
const onSubmit = () => {
  const { url, name } = formState;
  console.log("url, name", url, name);
  downloadVideo({
    url,
    name,
  });
};
</script>
<style lang="less" scoped>
.card {
  margin: 10px auto;
}
</style>
