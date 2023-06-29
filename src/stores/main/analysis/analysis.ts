import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsAddressSale,
} from "@/service/main/analysis/analysis";
import { defineStore } from "pinia";

interface IAnalysisState {
  amountData: any[];
  goodsCategoryCount: any[];
  goodsCategorySale: any[];
  goodsCategoryFavor: any[];
  goodsAddressSale: any[];
}

const useAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountData: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: [],
  }),
  actions: {
    async fetchDashboardDataAction() {
      const amountResult = await getAmountList();

      this.amountData = amountResult.data;
      const categoryGoodsCount = await getCategoryGoodsCount();
      this.goodsCategoryCount = categoryGoodsCount.data;
      const categoryGoodsSale = await getCategoryGoodsSale();
      this.goodsCategorySale = categoryGoodsSale.data;
      const categoryGoodsFavor = await getCategoryGoodsFavor();
      this.goodsCategoryFavor = categoryGoodsFavor.data;
      const goodsAddressSale = await getGoodsAddressSale();
      this.goodsAddressSale = goodsAddressSale.data;
      console.log("获取goodsAddressSale数据成功", this.goodsCategorySale);
    },
  },
});

export default useAnalysisStore;
