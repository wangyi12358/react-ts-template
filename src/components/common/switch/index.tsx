import React from 'react';
import classNames from 'classnames';
import { Switch as AntSwitch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';
import css from './index.less';

export interface Props extends SwitchProps {}

const Switch: React.FC<Props> = React.memo<Props>(({ className, ...props }) => {
  return <AntSwitch {...props} className={classNames(css.switch, className)} />;
});

Switch.defaultProps = {};

export default Switch;
