import React from 'react';
import classNames from 'classnames';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import css from './index.less';

export interface Props extends ButtonProps {
  type?: 'primary' | 'default';
  isBanRepeatClick?: boolean; // 是否禁止重复点击，是的化，则按钮点击后，500ms内不能再次点击
}

const Button: React.FC<Props> = React.memo(({ 
  className, loading, type, isBanRepeatClick, onClick, ...others 
}) => {

  const [innerLoading, setInnerLoading] = React.useState(false);
  const buttonRef = React.useRef<AntButton>();

  let timer: NodeJS.Timeout;

  React.useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  /**
   * 点击按钮后，500ms后方可点击
   * @param e 
   */
  function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    onClick && onClick(e);
    buttonRef.current.buttonNode.blur();
    if (!isBanRepeatClick) return;
    setInnerLoading(true);
    timer = setTimeout(() => setInnerLoading(false), 500);
  }

  return (
    <AntButton {...others}
      ref={buttonRef}
      type={type === 'primary' ? 'primary' : 'ghost'}
      loading={loading || innerLoading}
      onClick={handleClick}
      className={classNames(
        css.btn,
        { [css.primary]: type === 'primary' },
        className,
      )}  
    />
  );
});

Button.defaultProps = {
  type: 'default',
  isBanRepeatClick: true,
};

export default Button;
