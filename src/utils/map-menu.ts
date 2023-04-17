import type { RouteRecordRaw } from "vue-router";
import type { IBreadcrume } from "@/interface/index";
import type { IUserMenu } from "@/interface/index";
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

      if (route) {
        //给顶层菜单增加一个重定向
        if (!routes.find((item) => item.path === menu.path)) {
          routes.push({ path: menu.url, redirect: route.path });
        }
        //将二级菜单注册
        routes.push(route);
      }
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

export function mapPathToBreadcrumb(path: string, userMenu: IUserMenu[]) {
  const breadcrume: IBreadcrume[] = [];
  for (const menu of userMenu) {
    if (menu.children) {
      for (const submenu of menu.children) {
        if (submenu.url === path) {
          breadcrume.push({ name: menu.name, path: menu.url });

          breadcrume.push({ name: submenu.name, path: submenu.url });
        }
      }
    }
  }

  return breadcrume;
}
