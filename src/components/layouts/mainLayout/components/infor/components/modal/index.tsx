import Portal from 'components/common/portal';
import Icon from 'components/common/icon';
import Button from 'components/common/button';
import css from './index.less';
import classNames from 'classnames';
import React from 'react';

export interface Props {
  visible?: boolean;
  title?: Element | string;
  width?: number | string;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  hasLine?: boolean;
  closeOnMask?: boolean;
  hiddenFooter?: boolean;
}

const Modal: React.FC<Props> = ({
  visible, title, onCancel, children, onOk, width, okText,
  cancelText, hasLine, closeOnMask, hiddenFooter
}) => {
  return (
    <Portal className={css.model} isOpen={visible}>
      <div className={css.mask} onClick={() => closeOnMask && onCancel()}>
        <div className={classNames(css.content, { [css.hasLine]: hasLine })} style={{ width }}>
          <div className={css.title}>
            <h4>{title}</h4>
            <Icon type="iconCancel" onClick={onCancel} />
          </div>
          <div className={css.body}>
            {children}
          </div>
          {
            !hiddenFooter && 
            <div className={css.footer}>
              <Button onClick={onCancel}>{cancelText}</Button>
              <Button type="primary" onClick={onOk}>{okText}</Button>
            </div>
          }
        </div>
      </div>
    </Portal>
  );

};

Modal.defaultProps = {
  visible: false,
  hasLine: true,
  title: '标题',
  onCancel: () => { },
  onOk: () => { },
  width: 1200,
  okText: '确定',
  cancelText: '取消',
};

export default Modal;
