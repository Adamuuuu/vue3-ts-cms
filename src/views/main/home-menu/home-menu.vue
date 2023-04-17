<template>
  <div class="menu">
    <div class="logo">
      <img src="@/assets/imges/logo.svg" alt="" />
      <span v-show="!isCollapse">锦鲤后台管理</span>
    </div>
    <div class="main">
      <!-- <h5 class="mb-2">Custom colors</h5> -->
      <el-menu
        :default-active="defineActive"
        active-background-color="#0b5cbf"
        background-color="#02142d"
        class="el-menu-vertical"
        :collapse="isCollapse"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <template v-for="item in menutree" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import useLoginStore from "@/stores/login/login";
import { localCache } from "@/utils/cache";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { mapPathToMenu } from "@/utils/map-menu";
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
// console.log("iscollapse是",isCollapse)
// const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const useInfo = localCache.getCache("userinfo");
const menutree = localCache.getCache("menutree");

const localStore = useLoginStore();
const useMenu = localStore.userMenu;
function handleItemClick(item: any) {
  const url = item.url;
  router.push(url);
}

//获取动态菜单

//监听item的点击
const route = useRoute();

const defineActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, useMenu);
  return pathMenu.id + "";
});
</script>

<style scoped lang="less">
.logo {
  margin-top: 10px;
  display: flex;
  & img {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
  }
  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    color: aliceblue;
  }
}

.el-menu-vertical {
  margin-top: 20px;
}
.el-menu-item {
  background-color: #0d1e37;
}
.el-menu-item.is-active {
  background-color: #0b5cbf;
}
// .tac {
//   background-color: #545c64;
// }
</style>
