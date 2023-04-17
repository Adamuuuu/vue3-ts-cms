<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="user">
    <search></search>
    <content></content>
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from "vue";
import search from "./c-cnps/search.vue";
import content from "./c-cnps/content.vue";
</script>

<style scoped>
.user {
}
</style>
