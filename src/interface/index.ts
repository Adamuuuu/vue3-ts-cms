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

export interface IQueryPage {
  size: number;
  offset: number;
}

export interface IUserData {
  id?: number;
  name: string;
  realname: string;
  password: string;
  cellphone: number;
  departmentId: number;
  roleId: number;
  leader: string;
  parentId: number;
  [propName: string]: any;
}

export interface IDepartmentData {
  id: number;
  name: string;
  leader?: string;
  parentId?: number;
  createAt: string;
  updateAt: string;
  [propName: string]: any;
}
