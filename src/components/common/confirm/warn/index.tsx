import React, { Fragment } from 'react';
import Icon from 'components/common/icon';
import Button from 'components/common/button';
import modal, { Props as ModalProps } from '../components/modal';
import css from './index.less';


export interface Props extends ModalProps {
  title?: string;
  content?: React.ReactNode;
}

export default function warn(
  { title, content, okText, footer, cancelText, ...others }: Props) {

  const node = (
    <div className={css.warnWrap}>
      <div className={css.line} />
      <div className={css.header}>
        <Icon type="iconWarning3" className={css.typeIcon} />
        <h3 className={css.title}>{title}</h3>
      </div>
      <div className={css.desc}>{content}</div>
    </div>
  );

  const newFooter = (
    <Fragment>
      <div className={css.cancelBtnBox}>
        <Button 
          className={css.cancelBtn}
          onClick={() => newModal.handleClose()}
        >
          {cancelText||'取消'}
        </Button>
      </div>
      <div className={css.okBtnBox}>
        <Button 
          className={css.okBtn} 
          onClick={() => newModal.handleOk()} 
        >
          {okText||'确定'}
        </Button>
      </div>
    </Fragment> 
  );
 
  const newModal = modal({
    content: node,
    props: { footer: footer||newFooter, ...others }
  });
}



