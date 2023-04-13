import { defineStore } from "pinia";
import { accountLogin } from "@/service/login/login";
const useLoginStore = defineStore("login", {
  state: () => ({
    id: "",
    token: "",
    name: "",
  }),
  actions: {
    async loginAccountAction(account: any) {
      const loginResult = await accountLogin(account);
      console.log(loginResult);
      this.id = loginResult.data.id;
      this.token = loginResult.data.token;
      this.name = loginResult.data.name;
    },
  },
});

export default useLoginStore;
