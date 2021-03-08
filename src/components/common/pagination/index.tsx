import React from 'react';
import classNames from 'classnames';
import { Pagination as AntPagination, Tooltip } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import Icon from '../icon';
import css from './index.less';

type OmitKeys = 'size';
type Type = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

export interface Props extends Omit<PaginationProps, OmitKeys> { }

const Pagination: React.FC<Props> = ({
  className,
  ...others
}) => {

  const isFirstPage = (others.current <= 1); // 是否处于第一页
  const isLastPage = (others.current * others.pageSize >= others.total); // 是否处于最后一页

  /**
   * 渲染pag的item，用于修改 前一页，后一页icon
   * @param page 
   * @param type 
   * @param originalElement 
   */
  function renderItem(page: number, type: Type, originalElement: React.ReactElement<HTMLElement>) {


    if (type === 'prev') {
      return (
        <Tooltip placement="top" title="上一页">
          <span className={classNames(css.pagItem, { [css.disabled]: isFirstPage })}>
            <Icon type="iconPageUp" />
          </span>
        </Tooltip>
      );
    }

    if (type === 'next') {
      return (
        <Tooltip placement="top" title="下一页">
          <span className={classNames(css.pagItem, { [css.disabled]: isLastPage })}>
            <Icon type="iconPagedown" />
          </span>
        </Tooltip>
      );
    }

    return originalElement;
  }

  return (
    <span className={classNames(css.pag, className)}>
      <Tooltip placement="top" title="第一页">
        <span
          className={classNames(css.pagItem, css.firstPage, { [css.disabled]: isFirstPage })}
          onClick={() => !isFirstPage && others.onChange(1, others.pageSize)}
        >
          <Icon type="iconPageTurner" />
        </span>
      </Tooltip>
      <AntPagination {...others} size="small" itemRender={renderItem} />
      <Tooltip placement="top" title="最后一页">
        <span
          className={classNames(css.pagItem, css.lastPage, { [css.disabled]: isLastPage })}
          onClick={() => !isLastPage && others.onChange(Math.ceil(others.total / others.pageSize), others.pageSize)}
        >
          <Icon type="iconPageTurner1" />
        </span>
      </Tooltip>
    </span>
  );
};

Pagination.defaultProps = {
  onChange: () => { },
};

export default Pagination;
