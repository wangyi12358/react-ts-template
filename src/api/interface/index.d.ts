// 通用地址
export interface Address {
  regionId?: number; // 省ID：510000
  cityId?: number; // 市ID：511000
  areaId?: number; // 区县ID：511010
  detailAddress?: string; // 详细地址
}

// 通用字段
export interface GeneralParams {
  id?: number;
  createTime?: string;
  createId?: number;
  updateTime?: string;
  updateId?: number;
  isDelete?: boolean;
  companyId?: number;
}

// 服务端返回数据格式
export interface Result<D = void> {
  result: boolean;
  data: D;
  msg: string;
  code: string;
  timestamp?: number;
}

// 通用列表
export interface List<I> {
  list: I[];
}

// 通用分页参数
export interface PagParams {
  current?: number;
  pageSize?: number;
}

// 通用分页列表
export interface PagList<I> extends List<I> {
  total: number; // total
}
