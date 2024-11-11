<script setup lang="ts">
import { RouterView, useRoute , useRouter} from "vue-router";
import {computed, ref} from 'vue'
import {routes} from './router/index'

const $route = useRoute();
const $router = useRouter();
const routeData = computed(() => {
    const {name, path} = $route;
    return {name,path}
})

const curPathRef = ref(location.hash.replace(/^#/, '') );
console.log($route.path)

const routerList = computed(() => {
    const curPath =curPathRef.value
    console.log(curPath)
    return routes.map(r => {
        const {path, meta} = r;
        const active = curPath === '/' ? curPath === path : curPath.startsWith?.(path)
        return {
            path,
            title: meta.title,
            active}
    })
})


const menuActiveClick = async (path) => {
    curPathRef.value = path;
   await  $router.push({
         path,
    })

    
}

</script>

<template>
  <div id="app">
    <div class="menu-wrapper">
      <div v-for="(item, index) in routerList" :key="index" class="menu-item" :class="{
        'menu-item-active':  item.active,
      }" 
      @click="() => {
        menuActiveClick(item.path)
      }"
      >
        {{ item.title }}
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
#app {
    display: flex;

.menu-wrapper {
    min-width: 200px;
    .menu-item {
        line-height: 42px;
        border-bottom: 1px solid #639ef4;
        text-align: center;
        padding: 0 20px;
        cursor: pointer;
        &-active {
            background-color: #639ef4;
            a {
                color: #fff;
            }
        }
    }
}
}
</style>
