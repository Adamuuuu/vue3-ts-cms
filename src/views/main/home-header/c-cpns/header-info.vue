<template>
  <div class="contaner">
    <div class="icon">
      <div class="message">
        <el-icon><ChatDotRound /></el-icon>
      </div>
      <div class="bell">
        <el-icon><Bell /></el-icon>
      </div>
      <div class="search">
        <el-icon><Search /></el-icon>
      </div>
    </div>
    <div class="info">
      <el-dropdown>
        <el-button type="primary">
          Adam<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
            <el-dropdown-item>个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { localCache } from "@/utils/cache";

function exit() {
  //删除token
  localCache.removeCache("token");
  //跳转到登陆页面
  router.push("/login");
}
</script>

<style scoped lang="less">
.contaner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    margin-left: 10px;
  }
}
.info {
  margin-left: 20px;
}
</style>
