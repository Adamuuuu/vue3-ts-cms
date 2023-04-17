<template>
  <div class="brendcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { mapPathToBreadcrumb } from "@/utils/map-menu";
import { useRoute } from "vue-router";
import useLoginStore from "@/stores/login/login";
import { computed } from "vue";
const route = useRoute();
const useMenu = useLoginStore().userMenu;

const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, useMenu);
});
</script>
