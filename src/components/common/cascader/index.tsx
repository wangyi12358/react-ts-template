import React from 'react';
import classNames from 'classnames';
import { Cascader as AntCascader } from 'antd';
import { CascaderProps } from 'antd/lib/cascader';
import css from './index.less';

export interface Props extends CascaderProps {
  width?: number | string;
  popupEqualWidth?: boolean; // 下拉菜单每列是否与select等宽
}


let styleNode: HTMLStyleElement;

const Cascader: React.FC<Props> = React.forwardRef<AntCascader, Props>(({
  className, width, onPopupVisibleChange, popupEqualWidth, ...props 
}, ref) => {

  /**
   * 当拉下弹窗打开时，设置每列的宽度等于 select的宽度
   * 关闭时，去掉 style标签
   */
  const handlePopupVisibleChange = React.useMemo(() => (popupVisible: boolean) => {
    onPopupVisibleChange(popupVisible);
    if (!popupEqualWidth) return;
    const head = document.getElementsByTagName('head')[0];

    if (popupVisible) {

      styleNode = document.createElement('style');
      styleNode.type = 'text/css';
      styleNode.appendChild(document.createTextNode(`.ant-cascader-menu{width: ${width}px}`));
      head.appendChild(styleNode);

    } else if (styleNode) {
      
      head.removeChild(styleNode);
      styleNode = null;
    }
  }, [onPopupVisibleChange]);

  return (
    <AntCascader {...props} 
      ref={ref}
      style={{ width }} 
      onPopupVisibleChange={handlePopupVisibleChange}
      className={classNames(css.cascader, className)} 
    />
  );
});

Cascader.defaultProps = {
  width: 320,
  popupEqualWidth: true,
  onPopupVisibleChange: () => {},
};

export default Cascader;
