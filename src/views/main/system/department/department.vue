<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="department">
    <pageSearch
      :searchconfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pagecontent
      :contentConfig="contentConfig"
      :page="'department'"
      :title="'部门'"
      ref="pagecontentRef"
      @new-btn-click="handleCreateData"
      @exit-btn-click="handleExitData"
    ></pagecontent>
    <pagemodel
      ref="pagemodelRef"
      :modelConfig="modelConfig"
      :page="'department'"
    ></pagemodel>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from "@/components/common/pagesearch/pageSearch.vue";
import searchConfig from "./config/search.config";
import pagecontent from "@/components/common/pagecontent/pagecontent.vue";
import contentConfig from "./config/content.config";
import pagemodel from "@/components/common/pagemodel/pagemodel.vue";
import modelConfig from "./config/model.config";
import { ref } from "vue";

const pagecontentRef = ref<InstanceType<typeof pagecontent>>(); // 1. 获取内容组件的响应式对象
function handleQueryClick(formData: any) {
  pagecontentRef.value?.fatchPageListDate(formData); //2. 使用内容组件中暴露出来的方法完成搜索的功能
}
function handleResetClick() {
  pagecontentRef.value?.fatchPageListDate(); //3. 使用内容组件中暴露出来的方法完成重置的功能
}

//类似的  我们可以获得pagemodel中的方法完成新建和修改的功能
const pagemodelRef = ref<InstanceType<typeof pagemodel>>();
function handleCreateData() {
  pagemodelRef.value?.setDialogVisible();
}

function handleExitData(itemData: any) {
  pagemodelRef.value?.setDialogVisible(false, itemData);
}
</script>

<style scoped>
.department {
}
</style>
