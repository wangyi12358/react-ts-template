
import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import Button from 'components/common/button';
import Icon from 'components/common/icon';
import css from './index.less';


export interface Props {
  isCancelIcon?: boolean;
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => boolean | void;
  footer?: React.ReactNode;
  style?: object;
}

const Modal: React.FC<Props> = React.memo<Props>(({
  isCancelIcon, cancelText, okText, onOk, onCancel, footer, children, style
}) => {

  function renderBtn() {
    return (
      <>
        <Button 
          className={css.btn}
          onClick={() => onCancel()}
        >
          {cancelText}
        </Button>
        <Button 
          className={css.btn} 
          onClick={() => onOk()} 
          type="primary">
          {okText}
        </Button>
      </>
    );
  }

  return (
    <div className={css.masker}>
      <div className={css.box} style={{ ...style }} >
        {isCancelIcon && 
        <div 
          className={css.cancelIconBox}
          onClick={() => onCancel()}
        >
          <Icon className={css.cancelIcon} type="iconCancel" />
        </div>}
        {children}
        <div className={css.btnBox}>
          {footer || renderBtn()}
        </div>
      </div>
    </div>
  );
});

Modal.defaultProps = {
  okText: '确定',
  cancelText: '取消',
  onCancel: () => {},
  onOk: () => {},
  isCancelIcon: true
};

export default function ({ content, props }: { content: React.ReactNode; props: Props }) {
  
  const { onOk=() => {}, onCancel=() => {}, ...others } = props;
  /**
   * 取消操作，关闭弹窗
   */
  function handleClose() {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    onCancel();
  }
  /**
   * 确认操作，关闭弹窗
   */
  function handleOk() {
    if (onOk()!==false) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  }

  let div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(
    <Modal 
      {...others}
      onOk={handleOk} 
      onCancel={handleClose}
    >
      {content}
    </Modal>,
    div);

  return {
    handleOk: () => handleOk(),
    handleClose: () => handleClose()
  };
}
