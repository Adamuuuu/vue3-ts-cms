<template>
  <div class="header">
    <div class="right">
      <div class="icon" @click="handleMenuClick">
        <el-icon size="28px">
          <component :is="isfolf ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <div class="breadcrumb">面包屑</div>
    </div>

    <div class="info">
      <headerInfo></headerInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import headerInfo from "./c-cpns/header-info.vue";
const emit = defineEmits(["foldchange"]);
const isfolf = ref(false);
//内部改变状态
function handleMenuClick() {
  isfolf.value = !isfolf.value;
  console.log("isfold是", isfolf.value);
  emit("foldchange", isfolf.value);
}
//将事件和状态传递给父组件
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.right {
  display: flex;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
}
.info {
  display: flex;
  align-items: end;
}
</style>
