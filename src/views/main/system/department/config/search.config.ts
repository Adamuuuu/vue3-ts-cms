const searchConfig = {
  formItems: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入用户名",
      initiaValue: "",
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入领导姓名",
    },
    {
      type: "date-picker",
      label: "创建时间",
      prop: "updateAt",
    },
    // {
    //   type: "select",
    //   options: [
    //     { label: "启用", value: 1 },
    //     { label: "禁用", value: 0 },
    //   ],
    //   placeholder: "请选择你的状态",
    //   prop: "enable",
    // },
  ],
};
export default searchConfig;
