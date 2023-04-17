export interface IBreadcrume {
  name: string;
  path: string;
}
export interface IUserMenu {
  name: string;
  url: string;
  children?: IUserMenu[];
}

export interface IUserList {
  code: number;
  data: {
    list: IList[];
    totalCount: number;
  };
}

export interface IList {
  id: number;
  name: string;
  password: string;
  cellphone: string;
  departmentId: number;
  enable: number;
  roleId: number;
  createAt: string;
  updateAt: string;
  realname: string;
}
