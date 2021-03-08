import React from 'react';
import classNames from 'classnames';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox';
import Group from 'antd/lib/checkbox/Group';
import css from './index.less';

export interface Props extends CheckboxProps {}

type ICheckbox = React.FC<Props> & {
  Group?: React.FC<CheckboxGroupProps>;
}

const Checkbox: ICheckbox = React.forwardRef<AntCheckbox, Props>(({ className, ...props }, ref) => {
  return <AntCheckbox {...props} ref={ref} className={classNames(css.checkbox, className)} />;
});

const CheckboxGroup = React.forwardRef<Group, CheckboxGroupProps>(({ className, ...props }, ref) => {
  return <AntCheckbox.Group {...props} ref={ref} className={classNames(css.checkbox, className)} />;
});

Checkbox.Group = CheckboxGroup;

Checkbox.defaultProps = {};

export default Checkbox;
