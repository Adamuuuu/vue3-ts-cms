<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="user">
    <search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></search>
    <content
      ref="contentRef"
      @new-btn-click="handleCreateData"
      @exit-btn-click="handleExitData"
    ></content>
    <model ref="modelRef"></model>
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from "vue";
import search from "./c-cnps/search.vue";
import content from "./c-cnps/content.vue";
import model from "./c-cnps/model.vue";
import type { IUserData } from "@/interface";
const contentRef = ref<InstanceType<typeof content>>();
function handleQueryClick(formData: any[]) {
  contentRef.value?.fatchUsersListDate(formData);

  console.log(formData);
}
function handleResetClick() {
  contentRef.value?.fatchUsersListDate();
}
const modelRef = ref<InstanceType<typeof model>>();
function handleCreateData() {
  modelRef.value?.setDialogVisible();
}

function handleExitData(itemData: IUserData) {
  modelRef.value?.setDialogVisible(false, itemData);
}
</script>

<style scoped>
.user {
}
</style>
