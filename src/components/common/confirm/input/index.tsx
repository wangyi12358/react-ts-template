import MyInput, { Props as InputProps } from 'components/common/input';
import Utils from 'common/utils';
import modal, { Props as ModalProps } from '../components/modal';
import css from './index.less';
import React from 'react';

type OmitKeys = 'style' | 'onChange';

export interface Props
  extends Omit<ModalProps, 'onOk'>,
    Omit<InputProps, OmitKeys> {
  title?: string;
  name?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  onOk?: (val: string) => void ;
  warn?: boolean;
  max?: string | number;
  regular?: RegExp;
  regularMsg?: string;
}
// 正则验证有些输入法出BUG，不能输入中文
const Input: React.FC<Props> = React.memo<Props>(
  ({ title, name, defaultValue, onChange, warn, max, regular, regularMsg, ...others }) => {
    
    const [value, setValue] = React.useState(defaultValue);
    const [regularWarn, setRegularWarn] = React.useState(false);
    const [maxShow, setMaxShow] = React.useState(false);
    function getInpValue(val: string) {
      setValue(val);
      onChange(val);
    }

    return (
      <div className={css.inpWrap}>
        <div className={css.inputTitle}>{title}</div>
        <div className={css.inpBox}>
          <span className={css.inpName}>{name}</span>
          <MyInput
            {...others}
            width={460}
            value={value}
            max={max}
            onChange={e => {
              regular && setRegularWarn(!regular.test(e.target.value));
              getInpValue(e.target.value);
              e.target.value.length > max && setMaxShow(true);
              e.target.value.length < max && setMaxShow(false);
            }}
          />
          <div>
            {maxShow && <p className={css.warn}>{`不能超过${max}个字符`}</p>}
            {regularWarn && <p className={css.warn}>{regularMsg}</p>}
          </div>
        </div>
      </div>
    );
  }
);

Input.defaultProps={
  defaultValue: ''
};

export default function input({
  title,
  onChange = () => {},
  name,
  defaultValue,
  onOk,
  onCancel,
  warn,
  max,
  regularMsg,
  regular,
  ...others
}: Props) {
  let value = defaultValue ? defaultValue:''; // 闭包存值，关闭时销毁

  const modalHanders = modal({

    content: (
      <Input
        regularMsg={regularMsg}
        max={max}
        warn={warn}
        title={title}
        name={name}
        regular={regular}
        defaultValue={defaultValue}
        onChange={str => {
          value = str;
          onChange(str);
        }}
      />
    ),

    props: {
      ...others,
      onCancel() {
        onCancel && onCancel();
        value = null;
      },
      onOk() {
        if (value.trim() === '') {
          Utils.message('输入框不得为空', 'error');
          return false;
        }
        if (value.length > max) {
          return false;
        }
        if (regular && !regular.test(value)) {
          return false;
        }
        onOk && value !== '' && onOk(value);
        return value !== '';
      }
    }
  });

  return modalHanders;
}
