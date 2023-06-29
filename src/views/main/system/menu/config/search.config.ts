const searchConfig = {
  formItems: [
    {
      type: "input",
      label: "角色名称",
      prop: "name",
      placeholder: "请输入角色名",
      initiaValue: "",
    },
    {
      type: "input",
      label: "权限",
      prop: "intro",
      placeholder: "请输入权限",
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
