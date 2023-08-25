<template>
  <div>当前路由：{{ getRouteName }}</div>
  <router-view></router-view>
</template>
<script lang="ts">
export default {
  name: "BasicLearning",
};
</script>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const getRouteName = computed(() => {
  return route.name;
});
</script>
