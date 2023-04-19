import { getUserRoleInfo, getUserDepartmentInfo } from "@/service/main/main";
import { defineStore } from "pinia";

export const useMainDataStore = defineStore("main", {
  state: () => ({
    userRoleInfoList: <any[]>{},
    userDepartmentInfoList: <any[]>{},
  }),
  actions: {
    async fetchData() {
      const userRoleInfo = await getUserRoleInfo();
      const userDepartmentInfo = await getUserDepartmentInfo();
      this.userRoleInfoList = userRoleInfo.data.list;
      this.userDepartmentInfoList = userDepartmentInfo.data.list;
      console.log("userRoleInfo", this.userRoleInfoList);
      console.log("userDepartmentInfo", this.userDepartmentInfoList);
    },
  },
});
