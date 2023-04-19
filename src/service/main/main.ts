import hyRequest from "..";

export function getUserRoleInfo() {
  return hyRequest.post({
    url: "/role/list",
  });
}

export function getUserDepartmentInfo() {
  return hyRequest.post({
    url: "/department/list",
  });
}
