import React from 'react';
import classNames from 'classnames';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';
import css from './index.less';

export interface Props extends InputProps {}

const Input: React.FC<Props> = React.forwardRef<AntInput, Props>(({ className, ...others }, ref) => {
  return (
    <AntInput {...others} ref={ref} className={classNames(css.input, className)} style={{ width: others.width }} />
  );
});

Input.defaultProps = {
  width: 320,
};

export default Input;
