import React from 'react';
import classNames from 'classnames';
import css from './index.less';

export interface Props {
  bg?: string;
  className?: string;
  text: string;
  type?: 'primary' | 'warn' | 'success' | 'error';
}

const Tag: React.FC<Props> = React.memo<Props>(({ bg, type, text, className }) => {

  return (
    <span 
      style={{ backgroundColor: bg }}
      className={classNames(
        css.tag, 
        { [css.primary]: type === 'primary' },
        { [css.warn]: type === 'warn' },
        { [css.success]: type === 'success' },
        { [css.error]: type === 'error' },
        className,
      )}
    >{text}</span>
  );
});

Tag.defaultProps = {
  type: 'primary',
};

export default Tag;
