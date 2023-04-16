<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="aside">
        <homeMenu :isCollapse="isCollapse"></homeMenu
      ></el-aside>
      <el-container>
        <el-header class="header" height="50px">
          <homeHeader @foldchange="handleFoldChange"></homeHeader>
        </el-header>
        <el-main class="main"> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import homeMenu from "../home-menu/home-menu.vue";
import homeHeader from "../home-header/home-header.vue";
import homeMain from "../home-main/home-main.vue";
import { ref } from "vue";

const isCollapse = ref(false);
function handleFoldChange(isfold: boolean) {
  console.log(isfold);
  isCollapse.value = isfold;
}
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
}
.aside {
  background-color: #02142d;
  height: 100%;
  transition: width 0.3s ease;
}
.header {
  width: 100%;
  background-color: #c6e2ff;
}
.main {
  background-color: #ecf5ff;
}
</style>
