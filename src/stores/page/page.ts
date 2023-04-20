import { defineStore } from "pinia";
import {
  deletePageInfo,
  getPagelist,
  createPageInfo,
  exitPageInfo,
} from "@/service/page/index";

const pageListStore = defineStore("pagelist", {
  state: () => ({
    pagelist: <any>{},
    List: <any[]>[],
  }),
  actions: {
    //查询数据
    async postPageListActions(page: string, queryPage: any) {
      this.pagelist = await getPagelist(page, queryPage);
      this.List = this.pagelist.data.list;
      console.log("执行成功", this.List);
    },
    //删除数据
    async deletePageActions(page: string, id: number) {
      const deletePage = await deletePageInfo(page, id);
      console.log("删除成功");
      this.postPageListActions(page, { offset: 0, size: 10 });
    },
    //新建数据
    async fetchCreatePage(page: string, fetchData: any) {
      const createPage = await createPageInfo(page, fetchData);
      this.postPageListActions(page, { offset: 0, size: 10 });
    },
    //修改数据
    async fetchExitPage(page: string, id: number, fetchData: any) {
      const createPage = await exitPageInfo(page, id, fetchData);

      this.postPageListActions(page, { offset: 0, size: 10 });
    },
  },
});

export default pageListStore;
