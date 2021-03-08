import React from 'react';
import classNames from 'classnames';
import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/lib/table';
import Search, { Props as SearchProps } from '../search';
import Pagination, { Props as PaginationProps } from '../pagination';
import css from './index.less';

type OmitKeys = 'showHeader';

export interface Props<T> extends Omit<TableProps<T>, OmitKeys> {
  pagination?: PaginationProps;
  search?: SearchProps & {
    renderBtn?: () => React.ReactNode;
    isShow?: boolean;
  };
}

function Table<T extends object = any>(props: Props<T>) {
  const { className, pagination, onChange, search, ...others } = props;

  function renderSearch() {
    if (!search) return null;

    const { renderBtn = () => null, isShow = true, ...otherSearchProps } = search;
    return (
      <div className={css.searchBar}>
        <div className={css.searchBtns}>{renderBtn()}</div>
        {isShow && <Search {...otherSearchProps} />}
      </div>
    );
  }

  const tableProps: TableProps<T> = {
    ...others,
    className: css.tableBody,
    pagination: false
  };

  pagination.onChange = (current?: number, pageSize?: number) => {
    onChange({ current, pageSize }, null, null, null);
  };

  return (
    <div className={classNames(css.table, className)}>
      {renderSearch()}
      <AntTable {...tableProps} />
      {!!pagination && <Pagination {...pagination} className={classNames(css.pag, pagination.className)} />}
    </div>
  );

}

export default Table;