<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names

<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary" @click="handleCreateData()">新建数据</el-button>
    </div>
    <div class="main">
      <el-table :data="List" stripe border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column label="用户名" prop="name" align="center" />
        <el-table-column label="真实名" prop="realname" align="center" />
        <el-table-column label="手机号码" prop="cellphone" align="center" />
        <el-table-column label="状态" prop="enable" align="center">
          <template #default="scoped">
            <el-button :type="scoped.row.enable ? 'primary' : 'danger'" plain>{{
              scoped.row.enable ? "启用" : "禁用"
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" align="center">
          <template #default="scoped">
            {{ formatUTC(scoped.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateAt" align="center">
          <template #default="scoped">
            {{ formatUTC(scoped.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" prop="operator" align="center">
          <template #default="scoped">
            <el-button
              key="primary"
              type="primary"
              text
              icon="Edit"
              @click="handleEditClick(scoped.row)"
              >编辑</el-button
            >

            <el-button
              key="danger"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteClick(scoped.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="30"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import usersListStore from "@/stores/users/users-list";
import { storeToRefs } from "pinia";
import { formatUTC } from "@/utils/format";
import type { IUserData } from "@/interface";
import { ref } from "vue";
const store = usersListStore();
const { List } = storeToRefs(usersListStore());
const emit = defineEmits(["newBtnClick", "exitBtnClick"]);

const currentPage = ref(1);
const pageSize = ref(10);
fatchUsersListDate();
function handleSizeChange() {
  fatchUsersListDate();
}
function handleCurrentChange() {
  fatchUsersListDate();
}

function fatchUsersListDate(formData: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const PageInfo = { size, offset };
  const queryInfo = { ...PageInfo, ...formData };
  store.postUsersListActions(queryInfo);
}

defineExpose({ fatchUsersListDate });
//删除用户功能
function handleDeleteClick(id: number) {
  store.deleteUsersActions(id);
}
//编辑用户功能
function handleEditClick(formData: IUserData) {
  console.log(formData);
  emit("exitBtnClick", formData);
}
//新建用户功能
function handleCreateData() {
  emit("newBtnClick");
}
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
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
