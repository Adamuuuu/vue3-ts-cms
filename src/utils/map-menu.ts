import type { RouteRecordRaw } from "vue-router";

function localRoutesResult() {
  const localRoutes: RouteRecordRaw[] = [];
  //注意路径
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true,
    }
  );
  console.log(files);

  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
    console.log("这是数据", module.default);
  }
  return localRoutes;
}
export let firstMenu: any = null;
export function mapMenuToRouter(userMenuTree: any[]) {
  const localRoutes = localRoutesResult();
  const routes: RouteRecordRaw[] = [];

  //根据菜单匹配正确的路由
  for (const menu of userMenuTree)
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);

      if (route) routes.push(route);
      if (!firstMenu && route) firstMenu = submenu;
    }
  return routes;
}

export function mapPathToMenu(path: string, userMenu: any[]) {
  for (const menu of userMenu)
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
}
