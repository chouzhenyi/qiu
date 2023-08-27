<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }" autocomplete="off">
    <FormItem name="name" label="名称">
      <Input v-model:value="formModel.name" />
    </FormItem>
    <FormItem name="customVal" label="自定义值">
      <CustomInput v-model:value="formModel.customVal" />
    </FormItem>
    <FormItem :wrapper-col="{ offset: 4, span: 12 }">
      <Button type="primary" @click="onSubmit">提交</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
export default {
  name: "CustomVModel",
};
</script>
<script lang="ts" setup>
import { reactive } from "vue";
import { Form, FormItem, Input, Button } from "ant-design-vue";
import CustomInput from "./customInput.vue";

interface formModelProps {
  name: string;
  customVal: string;
}

const formModel = reactive<formModelProps>({
  name: "",
  customVal: "",
});

const onSubmit = () => {
  console.log(formModel);
};
</script>
