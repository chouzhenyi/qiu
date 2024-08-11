<template>
  <div>算法练习</div>
</template>
<script lang="ts">
export default {
  name: "Algorithm",
};
</script>
<script lang="ts" setup>
console.log("************************** START **************************");

const majorityElement = (nums: number[]): number => {
  let max = nums[0];
  let count = 1;
  const len = nums.length;
  for (let i = 1; i < len; i++) {
    if (count === 0) {
      max = nums[i];
    }
    if (nums[i] !== max) {
      count--;
    } else {
      count++;
    }
  }
  return max;
};

console.log(majorityElement([6, 5, 5]));

console.log("************************** END **************************");
</script>
<style lang="css"></style>
