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
        <template v-for="item in modelConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                size="large"
                style="width: 100%"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
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
        </template>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createPage()"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useMainDataStore } from "@/stores/main/main";
import { storeToRefs } from "pinia";
import pageListStore from "@/stores/page/page";
import type { IUserData } from "@/interface";
//默认该版块未显示
interface IProp {
  modelConfig: {
    formItems: any[];
  };
  page: string;
}

const prop = defineProps<IProp>();
const initiaForm: any = {};
for (const item of prop.modelConfig.formItems) {
  initiaForm[item.prop] = item.initiaValue ?? "";
}
const formData: any = reactive(initiaForm);

//model模块默认隐藏
const centerDialogVisible = ref(false);
//判断是新建数据还是修改数据
const isNewRef = ref(true);
const exitData = ref();

//取出store里面创建数据和编辑数据的函数
const { fetchCreatePage, fetchExitPage } = pageListStore();

//当点击提交按钮的时候调用此函数  这个时候需要判断此时是要新建函数还是要编辑函数
function createPage() {
  if (isNewRef.value) {
    fetchCreatePage(prop.page, formData);
  } else {
    fetchExitPage(prop.page, exitData.value.id, formData);
  }
  centerDialogVisible.value = false;
}

//此函数用于当我们点击编辑按钮时，将对应行的数据回显到输入框中
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
defineExpose({ setDialogVisible });
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.form {
  padding: 0 20px;
}
</style>
