const modelConfig = {
  formItems: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入部门名称",
    },
    {
      type: "select",
      label: "上级部门",
      prop: "parentId",
      placeholder: "请选择上级部门",

      options: [],
    },
    {
      type: "input",
      label: "上级领导",
      prop: "leader",
      placeholder: "请输入上级领导",
    },
  ],
};
export default modelConfig;
