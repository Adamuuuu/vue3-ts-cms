import { defineStore } from "pinia";
import type { IList, IUserList } from "@/interface/index";
import { getuserslist } from "@/service/users";
const usersListStore = defineStore("userlist", {
  state: () => ({
    userslist: <IUserList>{},
    List: <IList[]>[],
  }),
  actions: {
    async postUsersListActions() {
      this.userslist = await getuserslist();
      this.List = this.userslist.data.list;
      console.log("执行成功", this.List);
    },
  },
});

export default usersListStore;
