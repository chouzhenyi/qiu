<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/about">关于</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
}

nav a.router-link-exact-active {
  color: #fff;
  background-color: #639ef4;
  border: 1px solid #639ef4;
}

nav a.router-link-exact-active:hover {
}

nav a {
  display: inline-block;
  padding: 0 16px;
  line-height: 32px;
  font-weight: 500;
  border-radius: 2px;
  background-color: #fff;
  color: #639ef4;
  text-decoration: none;
  border: 1px solid #639ef4;
}
</style>
