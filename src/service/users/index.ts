import type { IQueryPage, IUserData } from "@/interface";
import hyRequest from "..";

export function getuserslist(queryPage: IQueryPage) {
  return hyRequest.post({
    url: "/users/list",
    data: queryPage,
  });
}

export function deleteUserInfo(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
  });
}

export function createUserInfo(fetchData: IUserData) {
  return hyRequest.post({
    url: "/users",
    data: fetchData,
  });
}

export function exitUserInfo(id: number, fetchData: IUserData) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: fetchData,
  });
}
