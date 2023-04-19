<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="search">
    <el-form :model="searchFrom" ref="formRef" label-wdith="80px" class="from">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="searchFrom.name"
              placeholder="请输入用户名"
              size="large"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchFrom.realname"
              placeholder="请输入真实姓名"
              size="large"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchFrom.cellphone"
              placeholder="请输入手机号码"
              size="large"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchFrom.enable"
              placeholder="请选择你的状态"
              size="large"
            >
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="updateAt">
            <el-date-picker
              v-model="searchFrom.updateAt"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button icon="Refresh" @click="hendleResetClick()">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleSearchClick"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, ElForm } from "element-plus";
import { reactive, ref } from "vue";

const searchFrom = reactive({
  name: "",
  realname: "",
  cellphone: "",
  enable: "",
  updateAt: "",
});
const emit = defineEmits(["queryClick", "resetClick"]);
const formRef = ref<InstanceType<typeof ElForm>>();

function hendleResetClick() {
  console.log("formEl的值为", formRef.value);
  if (!formRef.value) return;
  formRef.value.resetFields();
  emit("resetClick");
}

function handleSearchClick() {
  emit("queryClick", searchFrom);
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
