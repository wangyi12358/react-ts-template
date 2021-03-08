import Ajax from 'common/utils/ajax';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import { PagList } from 'api/interface';

export function getTableList<T extends object>(url: any, params: PaginatedParams[0]) {
  return Ajax.query<PaginatedParams[0], PagList<T>>({
    url,
    params,
  });
}

function create<T extends object>() {

}

function update() {

}

function del() {

}