import React from 'react';
import classNames from 'classnames';
import { Radio as AntRadio } from 'antd';
import { RadioProps, RadioGroupProps } from 'antd/lib/radio';
import Group from 'antd/lib/radio/group';
import css from './index.less';

export interface Props extends RadioProps {}

type IRadio = React.FC<Props> & {
  Group?: React.FC<RadioGroupProps>;
}

const Radio: IRadio = React.forwardRef<AntRadio, Props>(({ className, ...props }, ref) => {
  return <AntRadio {...props} ref={ref} className={classNames(css.radio, className)} />;
});

Radio.Group = React.forwardRef<Group, Props>(({ className, ...props }, ref) => {
  return <AntRadio.Group {...props} ref={ref} className={classNames(css.radio, className)} />;
});

Radio.defaultProps = {};

export default Radio;
