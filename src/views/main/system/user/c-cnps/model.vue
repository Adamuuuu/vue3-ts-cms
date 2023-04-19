<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isNewRef ? '新建用户' : '修改用户'"
    width="25%"
    center
  >
    <div class="form">
      <el-form :model="formData">
        <el-form-item label="用户名" prop="name" label-width="80px">
          <el-input
            v-model="formData.name"
            placeholder="请输入用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname" label-width="80px">
          <el-input
            v-model="formData.realname"
            placeholder="请输入真实姓名"
            size="large"
          />
        </el-form-item>
        <el-form-item
          v-if="isNewRef"
          label="密码"
          prop="password"
          label-width="80px"
        >
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            size="large"
          />
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone" label-width="80px">
          <el-input
            v-model="formData.cellphone"
            placeholder="请输入电话号码"
            size="large"
          />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId" label-width="80px">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            size="large"
            style="width: 100%"
          >
            <template v-for="item in userRoleInfoList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId" label-width="80px">
          <el-select
            v-model="formData.departmentId"
            placeholder="请选择部门"
            size="large"
            style="width: 100%"
          >
            <template v-for="item in userDepartmentInfoList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser()"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useMainDataStore } from "@/stores/main/main";
import { storeToRefs } from "pinia";
import usersListStore from "@/stores/users/users-list";
import type { IUserData } from "@/interface";
const centerDialogVisible = ref(false);
const isNewRef = ref(true);
const exitData = ref();
defineExpose({ setDialogVisible });

const formData: IUserData = reactive({
  name: "",
  realname: "",
  password: "",
  cellphone: 0,
  roleId: 1,
  departmentId: 1,
});

const { userRoleInfoList, userDepartmentInfoList } = storeToRefs(
  useMainDataStore()
);
const { fetchCreateUser, fetchExitUser } = usersListStore();

function createUser() {
  if (isNewRef.value) {
    fetchCreateUser(formData);
  } else {
    fetchExitUser(exitData.value.id, formData);
  }
  centerDialogVisible.value = false;
}
function setDialogVisible(isnew: boolean = true, itemData?: IUserData) {
  centerDialogVisible.value = true;
  isNewRef.value = isnew;
  if (!isnew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    exitData.value = itemData;
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
    exitData.value = null;
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.form {
  padding: 0 20px;
}
</style>
