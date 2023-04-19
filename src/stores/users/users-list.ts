import { defineStore } from "pinia";
import type { IList, IQueryPage, IUserList } from "@/interface/index";
import { deleteUserInfo, getuserslist } from "@/service/users";
import type { IUserData } from "@/interface";

import { createUserInfo, exitUserInfo } from "@/service/users/index";
const usersListStore = defineStore("userlist", {
  state: () => ({
    userslist: <IUserList>{},
    List: <IList[]>[],
  }),
  actions: {
    //查询数据
    async postUsersListActions(queryPage: IQueryPage) {
      this.userslist = await getuserslist(queryPage);
      this.List = this.userslist.data.list;
      console.log("执行成功", this.List);
    },
    //删除数据
    async deleteUsersActions(id: number) {
      const deleteUsers = await deleteUserInfo(id);
      console.log("删除成功");
      this.postUsersListActions({ offset: 0, size: 10 });
    },
    //新建数据
    async fetchCreateUser(fetchData: IUserData) {
      const createUser = await createUserInfo(fetchData);
      this.postUsersListActions({ offset: 0, size: 10 });
    },
    //修改数据
    async fetchExitUser(id: number, fetchData: IUserData) {
      const createUser = await exitUserInfo(id, fetchData);

      this.postUsersListActions({ offset: 0, size: 10 });
    },
  },
});

export default usersListStore;
