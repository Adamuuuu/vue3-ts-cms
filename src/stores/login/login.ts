import { defineStore } from "pinia";
import {
  accountLogin,
  getUserInfo,
  getUserMenuTree,
} from "@/service/login/login";
import { localCache } from "@/utils/cache";

import type { RouteRecordRaw } from "vue-router";
import router from "@/router";
import { mapMenuToRouter } from "@/utils/map-menu";
import type { IUserMenu } from "@/interface";
import { useMainDataStore } from "../main/main";
const useLoginStore = defineStore("login", {
  state: () => ({
    token: "",
    userInfo: {},
    userMenu: <IUserMenu[]>{},
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLogin(account);

      const id = loginResult.data.id;
      this.token = loginResult.data.token;
      const name = loginResult.data.name;
      localCache.setCache("token", this.token);
      //获取用户的详细信息
      const userInfoResult = await getUserInfo(id);
      this.userInfo = userInfoResult.data;
      localCache.setCache("userinfo", this.userInfo);
      //获取用户的菜单树
      const userMenuTree = await getUserMenuTree(id);
      const userMenu = userMenuTree.data;
      localCache.setCache("menutree", userMenu);

      // const routes = mapMenuToRouter(userMenu);

      // routes.forEach((route) => router.addRoute("main", route));
      router.push("/main");
    },
    loadLocalCacheAction() {
      const token = localCache.getCache("token");
      const userInfo = localCache.getCache("userinfo");
      const userMenu = localCache.getCache("menutree");
      if (token && userInfo && userMenu) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenu = userMenu;
        const mainStore = useMainDataStore();
        mainStore.fetchData();
        //动态添加路由
        const routes = mapMenuToRouter(userMenu);
        routes.forEach((route) => router.addRoute("main", route));
      }
    },
  },
});

export default useLoginStore;
