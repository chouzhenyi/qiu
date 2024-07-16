<!-- 物品列表 -->
<template>
  <view>
    <uni-list>
      <uni-list :border="true">
        <uni-list-item
          v-for="(item, index) in storageBoxList"
          :title="item.name"
          clickable
          @click="openStorageBox(item)"
          :key="index"
        />
      </uni-list>
    </uni-list>
  </view>
</template>
<script lang="ts" setup>
const typeDescMap = ["储物箱", "储物平面", "物品"];
type storageType = 0 | 1 | 2;
type storageBoxType = {
  name: string;
  id: string;
  children: storageBoxType[];
  type: storageType;
  typeDesc: string;
};
const storageBoxList: storageBoxType[] = [
  {
    name: "衣柜",
    id: "1001",
    type: 0,
    typeDesc: typeDescMap[0],
    children: [],
  },
];
const openStorageBox = (item: storageBoxType) => {
  console.log(item, "打开储物箱");
};
</script>
