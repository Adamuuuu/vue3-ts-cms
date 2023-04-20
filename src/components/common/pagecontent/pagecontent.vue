<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names

<template>
  <div class="content">
    <div class="header">
      <h3>{{ prop.title }}列表</h3>
      <el-button type="primary" @click="handleCreateData()"
        >新建{{ prop.title }}</el-button
      >
    </div>
    <div class="main">
      <el-table :data="List" stripe border style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <template v-for="item in contentConfig.tableItems" :key="item.prop">
          <template v-if="item.prop === 'enable'">
            <el-table-column
              :label="item.label"
              :prop="item.prop"
              align="center"
            >
              <template #default="scoped">
                <el-button
                  :type="scoped.row.enable ? 'primary' : 'danger'"
                  plain
                  >{{ scoped.row.enable ? "启用" : "禁用" }}</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-if="item.prop === 'createAt' || item.prop === 'updateAt'">
            <el-table-column
              :label="item.label"
              :prop="item.prop"
              align="center"
            >
              <template #default="scoped">
                {{ formatUTC(scoped.row.createAt) }}
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column>
              <el-table-column
                :label="item.label"
                :prop="item.prop"
                align="center"
            /></el-table-column>
          </template>
        </template>
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
import pageListStore from "@/stores/page/page";
import { storeToRefs } from "pinia";
import { formatUTC } from "@/utils/format";
import { ref } from "vue";
//通过父组件传过来的参数完成对表格表头内容的封装
interface IProp {
  contentConfig: {
    tableItems: any[];
  };
  page: string;
  title: string;
}

const prop = defineProps<IProp>();

const store = pageListStore();
const { List } = storeToRefs(pageListStore());
const emit = defineEmits(["newBtnClick", "exitBtnClick"]);

const currentPage = ref(1);
const pageSize = ref(10);

fatchPageListDate();
function handleSizeChange() {
  fatchPageListDate();
}
function handleCurrentChange() {
  fatchPageListDate();
}

//这个函数主要完成查询的操作  获取当前分页器每一页以及总共多少页的数据  然后通过这些数据向服务器发送post请求获得表格中的数据
//另外这个函数还可能接受一个参数 当我们搜索的时候也能调用这个函数，从父组件传入搜索的关键字，然后将关键字也放入请求体之中去获取数据
function fatchPageListDate(formData: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const PageInfo = { size, offset };
  const queryInfo = { ...PageInfo, ...formData };
  store.postPageListActions(prop.page, queryInfo);
}
//将这个函数暴露给父组件供父组件完成搜索和重置的功能
defineExpose({ fatchPageListDate });
//删除用户功能
function handleDeleteClick(id: number) {
  store.deletePageActions(prop.page, id);
}

//将新建和编辑的事件发送给父组件，父组件接收到事件后调用model中的函数完成这两项操作
//编辑用户功能
function handleEditClick(formData: any) {
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
