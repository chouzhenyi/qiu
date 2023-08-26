<template>
  <div class="file-select-wrapper">
    <Button type="primary" @click="fileButtonClick">
      <FileAddOutlined />
      {{ title || "选择文件" }}
    </Button>
    <input type="file" ref="file" class="hidden" @change="fileSelectChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref, PropType } from "vue";
import { Button, message } from "ant-design-vue";
import { FileAddOutlined } from "@ant-design/icons-vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  extList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emit = defineEmits(["onSelect", "onError"]);
const file = ref(null);
const fileButtonClick = () => {
  const el = file.value as unknown as HTMLInputElement;
  el?.click?.();
};
const fileSelectChange = (event: Event) => {
  const { target } = event;
  const { files } = target as HTMLInputElement;
  const file = (files as FileList)[0];
  const { name } = file;
  const ext = name.split(".").pop() as string;
  if (props.extList.includes(ext)) {
    emit("onSelect", file);
  } else {
    const errMessage = `只能选择“${props.extList.join("、")}”等格式的文件`;
    console.log(errMessage);
    message.error(errMessage);
  }
};
</script>
<style lang="less" scoped>
.file-select-wrapper {
  font-size: 0;
}

.hidden {
  display: none;
}
</style>
