import React from 'react';
import classNames from 'classnames';
import { Select as AntSelect } from 'antd';
import { SelectProps, OptionProps, OptGroupProps } from 'antd/lib/select';
import Search from '../search';
import css from './index.less';

type OmitKeys = 'optionFilterProp' | 'filterOption' | 'onSearch' | 'open';

export interface Props extends Omit<SelectProps, OmitKeys> {
  width?: number | string;
  autoMenuClose?: boolean;
}

type ISelect = React.FC<Props> & {
  Option?: React.ClassicComponentClass<OptionProps>;
  OptGroup?: React.ClassicComponentClass<OptGroupProps>;
}

const Select: ISelect = React.forwardRef<AntSelect, Props>(({ 
  className, width, showSearch, children, onDropdownVisibleChange, dropdownRender, autoMenuClose, ...props 
}, ref) => {

  /**
   * 使用itemRender时，Antd Select 框内触发 onMouseDown 事件会收起 DorpDown，
   * input focus 也会触发 Select 收起 DorpDown
   * 此处为 antd Select itemRender 的BUG，参考issue
   * https://github.com/ant-design/ant-design/issues/13448#issuecomment-512002600
   * 参考解决方法：
   * https://codesandbox.io/s/beautiful-firefly-l5swz?fontsize=14
   */
  const [open, setOpen] = React.useState(false);
  const [isBlurSearch, setIsBlurSearch] = React.useState(false); 
  const [keywords, setKeywords] = React.useState('');

  /**
   * 渲染下拉菜单
   * @param menu
   */
  function renderDropdown(menu?: React.ReactNode) {

    if (dropdownRender) {
      return dropdownRender(menu);
    }
    if (!showSearch) return menu;
    return (
      <>
        <div 
          className={css.search} 
          onMouseEnter={() => setIsBlurSearch(true)}
          onMouseLeave={() => setIsBlurSearch(false)}
        >
          <Search width="100%" keywords={keywords} onSearch={value => setKeywords(value)} />
        </div>
        {menu}
      </>
    );
  }

  /**
   * 过滤筛选option
   */
  function renderChildren() {
    if (!Array.isArray(children)) {
      return ((children as React.ReactElement<OptionProps>).props.children as string).indexOf(keywords) > -1 ? children : null;
    }
    return children.filter(child => ((child as React.ReactElement<OptionProps>).props.children as string).indexOf(keywords) > -1);
  }

  return (
    <AntSelect {...props} 
      open={open}
      ref={ref}
      style={{ width }}
      showSearch={false}
      className={classNames(css.select, className)} 
      dropdownRender={renderDropdown}
      onDropdownVisibleChange={visible => {
        onDropdownVisibleChange(visible);
        if (autoMenuClose || !isBlurSearch) {
          setOpen(visible);
        }
      }}
    >
      {renderChildren()}
    </AntSelect>
  );
});

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

Select.defaultProps = {
  width: 320,
  onDropdownVisibleChange: () => {},
};

export default Select;
