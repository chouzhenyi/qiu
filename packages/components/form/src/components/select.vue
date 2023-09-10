<template>
  <Select>
    <SelectOption
      v-for="(option, index) in $props.options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </SelectOption>
  </Select>
</template>
<script lang="ts">
export default {
  name: "Select",
};
</script>
<script lang="ts" setup>
import {} from "vue";
import { Select, SelectOption } from "ant-design-vue";
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});
</script>
