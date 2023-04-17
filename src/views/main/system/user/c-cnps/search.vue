<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="search">
    <el-from :model="searchFrom" ref="fromRef" label-wdith="80px" class="from">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="searchFrom.username"
              placeholder="请输入用户名"
              size="large"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="name">
            <el-input
              v-model="searchFrom.name"
              placeholder="请输入真实姓名"
              size="large"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phone">
            <el-input
              v-model="searchFrom.phone"
              placeholder="请输入手机号码"
              size="large"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="searchFrom.status"
              placeholder="请选择你的状态"
              size="large"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="date">
            <el-date-picker
              v-model="searchFrom.date"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn">
        <el-button icon="Refresh" @click="hendleResetClick">重置</el-button>
        <el-button icon="Search" type="primary" @click="handleSearchClick"
          >提交</el-button
        >
      </div>
    </el-from>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus";
import { reactive, ref } from "vue";
const searchFrom = reactive({
  username: "",
  name: "",
  phone: "",
  status: "",
  date: "",
});
const fromRef = ref<InstanceType<typeof ElForm>>();
function hendleResetClick() {
  console.log("执行成功");
  fromRef.value?.resetFields();
}
function handleSearchClick() {
  console.log("搜索成功");
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin: 0;
  }
}
.from {
  display: flex;
  flex-direction: column;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
