<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="search">
    <el-form :model="searchFrom" ref="formRef" label-wdith="80px" class="from">
      <el-row :gutter="20">
        <template v-for="item in searchconfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                  size="large"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                  style="width: 100%"
                ></el-date-picker>
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchFrom[item.prop]"
                  :placeholder="item.placeholder"
                  size="large"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import type { ElForm } from "element-plus";
import { reactive, ref } from "vue";
//为从父组件接收的参数定义类型
interface IProp {
  searchconfig: {
    formItems: any[];
  };
}
//从父组件获取参数
const prop = defineProps<IProp>();
//创建一个对象 获取表单中的数据类型 用于定义表单的响应式
const initiaForm: any = {};
for (const item of prop.searchconfig.formItems) {
  initiaForm[item.prop] = item.initiaValue ?? "";
}
const searchFrom = reactive(initiaForm);

const emit = defineEmits(["queryClick", "resetClick"]);
const formRef = ref<InstanceType<typeof ElForm>>();

//点击重置按钮将输入框的内容清空  并将这个事件传递给父组件
function hendleResetClick() {
  if (!formRef.value) return;
  formRef.value.resetFields();
  emit("resetClick");
}
//点击搜索按钮，将表单中的数据和这个事件传给父组件
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
