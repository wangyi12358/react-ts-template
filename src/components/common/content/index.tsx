import React from 'react';
import classNames from 'classnames';
import css from './index.less';

export interface Props {
  title: string;
  className?: string;
  padding?: 'normal' | 'large';
  renderExtra?: () => React.ReactNode;
}

const Content: React.FC<Props> = React.memo<Props>(({ 
  title, className, children, padding, renderExtra 
}) => {
  return (
    <div className={classNames(css.content, className)}>
      <h6>{title} {renderExtra()}</h6>
      <div className={classNames(css.body, { [css.large]: padding === 'large', [css.normal]: padding === 'normal' })}>
        {children}
      </div>
    </div>
  );
});

Content.defaultProps = {
  renderExtra: () => null,
};

export default Content;
