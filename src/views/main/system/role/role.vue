<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="role">
    <pageSearch :searchconfig="searchConfig" />
    <pagecontent
      :content-config="contentConfig"
      :page="'role'"
      :title="'角色'"
    ></pagecontent>
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from "@/components/common/pagesearch/pageSearch.vue";
import pagecontent from "@/components/common/pagecontent/pagecontent.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
</script>

<style scoped>
.role {
}
</style>
