import { localCache } from "@/utils/cache";
import hyRequest from "..";
export function accountLogin(account: any) {
  return hyRequest.post({
    url: "/login",
    data: account,
  });
}

export function getUserInfo(id: any) {
  console.log("id为", id);
  return hyRequest.get({
    url: `/users/${id}`,
  });
}

export function getUserMenuTree(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  });
}
