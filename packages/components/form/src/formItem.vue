<template>
  <FormItem v-bind="getFormItemProps">
    <component
      :is="componentMap[getCompProps.component]"
      v-bind="getCompProps.componentProps"
    />
  </FormItem>
</template>
<script lang="ts">
export default {
  name: "FormItem",
};
</script>
<script lang="ts" setup>
import { FormItem, Input } from "ant-design-vue";
import { computed, PropType } from "vue";
import { omit, pick } from "lodash-es";
import type { FormSchema } from "./type.d";
import { Select } from "./components/index";

const props = defineProps({
  schema: {
    type: Object as PropType<FormSchema>,
    default: () => ({}),
  },
});

const getFormItemProps = computed(() => {
  const itemProps = omit(props.schema, ["component", "componentProps"]);
  return itemProps;
});
const getCompProps = computed(() => {
  const compProps = pick(props.schema, ["component", "componentProps"]);
  return compProps;
});
const componentMap = {
  Input: Input,
  Select: Select,
};
</script>
