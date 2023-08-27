<template>
  <Input :value="$props.value" @change="onChange">
    <template #prefix>
      <AimOutlined />
    </template>
    <template #suffix>
      <RedEnvelopeOutlined />
    </template>
  </Input>
</template>
<script lang="ts">
export default {
  name: "CustomInput",
};
</script>
<script lang="ts" setup>
import { Input } from "ant-design-vue";
import { AimOutlined, RedEnvelopeOutlined } from "@ant-design/icons-vue";

defineProps({
  value: { type: String, default: "" },
});
const emit = defineEmits(["update:value"]);
const onChange = (e) => {
  emit("update:value", e.target.value);
};
</script>
