import React from 'react';
import Icon from 'components/common/icon';
import modal, { Props as ModalProps } from '../components/modal';
import css from './index.less';

interface Content {
  key: string;
  value: string;
}

export interface Props extends ModalProps {
  title?: string;
  content?: Content[];
}

export default function success({ title, content, ...others }: Props) {
  const node = (
    <div className={css.successWrap}>
      <div className={css.line} />
      <div className={css.content}>
        <Icon type="iconSuccessed2" className={css.successIcon} />
        <div className={css.right}>
          <span className={css.successTitle}>{title}</span>
          {content &&
            content.map((item, index) => {
              return (
                <div key={`content_${index}`} className={css.contentList}>
                  <div className={css.key}>{item.key}：</div>
                  <span>{item.value}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  modal({
    content: node,
    props: others
  });
}
