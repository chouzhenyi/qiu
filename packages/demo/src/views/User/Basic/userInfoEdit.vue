<template>
  <Card title="编辑用户信息" style="width: 520px; margin: 20px auto">
    <Upload
      v-model:file="fileRef"
      name="file"
      :multiple="false"
      action="http://192.168.1.103:3000/upload/file"
      @change="handleChange"
    >
      <Button type="primary">
        <UploadOutlined />
        <span>上传</span>
      </Button>
    </Upload>
  </Card>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Card, Upload, Button } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const fileRef = ref();

const handleChange = (params: UploadChangeParam) => {
  const { file, fileList, event } = params;
  if (event) {
    // const { percent, loaded, total } = event;
    // console.log(
    //   `上传：${percent}%;已上传文件大小：${loaded}bit;文件总共大小：${total}bit`
    // );
    console.log(event);
  }
};
</script>
