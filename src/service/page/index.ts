import type { IQueryPage, IUserData } from "@/interface";
import hyRequest from "..";

export function getPagelist(page: string, queryPage: any) {
  return hyRequest.post({
    url: `/${page}/list`,
    data: queryPage,
  });
}

export function deletePageInfo(page: string, id: number) {
  return hyRequest.delete({
    url: `/${page}/${id}`,
  });
}

export function createPageInfo(page: string, fetchData: any) {
  return hyRequest.post({
    url: `/${page}`,
    data: fetchData,
  });
}

export function exitPageInfo(page: string, id: number, fetchData: any) {
  return hyRequest.patch({
    url: `/${page}/${id}`,
    data: fetchData,
  });
}
