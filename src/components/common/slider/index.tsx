import React from 'react';
import classNames from 'classnames';
import { Slider as AntSlider } from 'antd';
import { SliderProps } from 'antd/lib/slider';
import css from './idnex.less';

export interface Props extends SliderProps {}

const Slider: React.FC<Props> = React.memo<Props>(({ className, ...props }) => {
  return <AntSlider {...props} className={classNames(css.slider, className)} />;
});

Slider.defaultProps = {};

export default Slider;
