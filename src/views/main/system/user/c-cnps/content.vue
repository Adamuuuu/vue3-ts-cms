<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names

<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary">新建数据</el-button>
    </div>
    <div class="main">
      <el-table :data="List" stripe border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column label="用户名" prop="name" align="center" />
        <el-table-column label="真实名" prop="realname" align="center" />
        <el-table-column label="手机号码" prop="cellphone" align="center" />
        <el-table-column label="状态" prop="enable" align="center" />
        <el-table-column label="创建时间" prop="createAt" align="center" />
        <el-table-column label="更新时间" prop="updateAt" align="center" />
        <el-table-column label="操作" prop="operator" align="center">
          <el-button key="primary" type="primary" text icon="Edit"
            >编辑</el-button
          >
          <el-button key="danger" type="danger" text icon="Delete"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import usersListStore from "@/stores/users/users-list";
import { storeToRefs } from "pinia";
const store = usersListStore();
const { List } = storeToRefs(usersListStore());

store.postUsersListActions();
console.log(List.value);
</script>

<style scoped lang="less">
.content {
  display: flex;
  margin: 10px 10px;
  flex-direction: column;
}
.header {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & h3 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.main {
  display: flex;
  margin-top: 20px;
}
</style>
