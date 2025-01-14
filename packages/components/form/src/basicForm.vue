<template>
  <Form v-bind="$attrs">
    <FormItem
      v-for="(schema, index) in $props.schemas"
      :key="index"
      :schema="schema"
    />
  </Form>
</template>
<script lang="ts">
export default {
  name: "BasicForm",
};
</script>
<script lang="ts" setup>
import { Form, Input } from "ant-design-vue";
import { PropType } from "vue";
import type { FormSchema, ActionBtnGroupType } from "./type.d";
import FormItem from "./formItem.vue";

defineProps({
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => {},
  },
  actionBtnGroup: {
    type: Object as PropType<ActionBtnGroupType>,
    default: () => ({}),
  },
  showActionBtnGroup: {
    type: Boolean,
    default: true,
  },
});
</script>
