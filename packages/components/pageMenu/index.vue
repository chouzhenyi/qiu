<template>
  <div class="wrapper">
    <Menu
      class="item-menu"
      mode="vertical"
      v-model:selectedKeys="selectedKeys"
      :items="$props.items"
      @click="handleRouterItemClick"
    />
    <router-view class="container"></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: "PageMenu",
};
</script>
<script lang="ts" setup>
import { ref, PropType } from "vue";
import { useRouter } from "vue-router";
import { Menu } from "ant-design-vue";
import { routerMenuType } from "type.d";

const props = defineProps({
  items: {
    type: Array as PropType<routerMenuType[]>,
  },
});
const selectedKeys = ref<number[]>([0]);
const { replace } = useRouter();
const handleRouterItemClick = ({ item }: Record<string, any>) => {
  const { path } = item;
  replace(path);
};
</script>
<style lang="less">
.wrapper {
  display: flex;
  height: 100%;

  .item-menu {
    width: 256px;
  }
  .container {
    flex: 1;
  }
}
</style>
