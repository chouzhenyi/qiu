<template>
  <div>
    <BasicForm :schemas="schemas" layout="inline" />
  </div>
</template>
<script lang="ts">
export default {
  name: "MyHouseManagement",
};
</script>
<script lang="ts" setup>
import { BasicForm } from "@qiu/components/form";
import type { FormSchema } from "@qiu/components/form";
const schemas: FormSchema[] = [
  {
    component: "Input",
    label: "名称",
    componentProps: {
      placeholder: "请输入",
    },
  },
  {
    component: "Input",
    label: "位置",
    componentProps: {
      placeholder: "请输入",
    },
  },
  {
    component: "Input",
    label: "容器",
    componentProps: {
      placeholder: "请输入",
    },
  },
  {
    component: "Input",
    label: "有效期",
    componentProps: {
      placeholder: "请输入",
    },
  },
  {
    component: "Select",
    label: "是否预警",
    componentProps: {
      placeholder: "请输入",
      options: [
        { value: 0, label: "否" },
        { value: 1, label: "是" },
      ],
    },
  },
];
</script>
