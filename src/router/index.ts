import { createRouter, createWebHistory } from "vue-router";
import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/map-menu";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/home-page/home-page.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginFrom.vue"),
    },
  ],
});

router.beforeEach((to) => {
  console.log("执行了路由守卫");
  const token = localCache.getCache("token");
  if (to.path === "/main" && !token) {
    return "/login";
  }
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
