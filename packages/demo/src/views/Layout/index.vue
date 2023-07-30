<script lang="ts">
export default {
  name: "Layout",
};
</script>
<script setup lang="ts">
import { RouterView } from "vue-router";
import { Button, Menu, MenuItem, SubMenu } from "ant-design-vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  DollarCircleOutlined,
  IdcardOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const collapsed = ref(false);
/**
 * @description 是否折叠路由菜单
 */
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <div class="wrapper">
    <div class="menu-wrapper">
      <Menu mode="inline" theme="dark" :inline-collapsed="collapsed">
        <MenuItem :key="0">
          <template #icon><HomeOutlined /></template>
          <span>主页</span>
        </MenuItem>
        <SubMenu>
          <template #icon>
            <UserOutlined />
          </template>
          <template #title>用户信息</template>
          <MenuItem :key="1">
            <template #icon>
              <IdcardOutlined />
            </template>
            <span>个人基本信息</span>
          </MenuItem>
          <MenuItem :key="2">
            <template #icon>
              <DollarCircleOutlined />
            </template>
            <span>财务状况</span>
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
    <div class="container">
      <div>
        <Button type="primary" @click="toggleCollapsed">
          <MenuFoldOutlined v-show="!collapsed"></MenuFoldOutlined>
          <MenuUnfoldOutlined v-show="collapsed"></MenuUnfoldOutlined>
        </Button>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.menu-wrapper {
  background-color: #f9fafb;
}

.container {
  flex: 1;
  background-color: #f7f8f9;
}
</style>
