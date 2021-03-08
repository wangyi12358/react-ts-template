import { useEffect } from 'react';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import { useRequest } from 'ahooks';
import { getTableList } from 'api/request/common';



type Antd3ValidateFields = (fieldNames: string[], callback: (errors, values) => void) => void;
type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface Store {
  [name: string]: any;
}

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  validateFields: Antd3ValidateFields | Antd4ValidateFields;
  [key: string]: any;
}


export interface Result<Item> extends PaginatedResult<Item> {
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U> extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U>,
): any {

  const {
    form,
    refreshDeps = [],
    manual,
    defaultType = 'simple',
    defaultParams,
    ...restOptions
  } = options;
  const result = useRequest((params) => getTableList(service, params), {
    ...restOptions,
    // paginated: true as true,
    // paginated: true as true,
    manual: true,
  });
  console.log('result==', result);
  const { params, run } = result;

  useEffect(() => {

    run(...params);

  }, []);


  return {
    ...result
  };
}

export default useAntdTable;
