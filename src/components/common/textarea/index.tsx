import React from 'react';
import { Input } from 'antd';
import Button from 'components/common/button';
import classNames from 'classnames';
import css from './index.less';

const { TextArea: AntdTextArea } = Input;


export interface Props {
  limitNum?: number;
  onOk?: (text: string) => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  style?: object;
}

const TextArea: React.FC<Props> = React.memo<Props>(({
  limitNum, onOk, onCancel, okText, style, cancelText 
}) => {


  const [isOver, setIsOver] = React.useState(false);
  const [isNull, setIsNull] = React.useState(true);
  const [textNum, setTextNum] = React.useState(0);
  const [text, setText] = React.useState('');

  /**
   * 监听文本框的值
   */
  function handleChange({ target: { value }}) {
    setTextNum(value.length);
    setText(value);
    if (!value) {
      setIsNull(true);
      return;
    }
    if (value && value.length<=500) {
      setIsNull(false);
      setIsOver(false);
      return;
    }
    if (value.length>500 && !isOver) {
      setIsOver(true);
      return;
    }
  }

  return (
    <div className={css.box} style={{ ...style }}>
      <div className={classNames(css.textAreaBox, { [css.overBox]: textNum>limitNum })} >
        <AntdTextArea onChange={handleChange} />
        <div className={css.limit}>
          <span className={classNames({ [css.textNum]: !isNull, [css.over]: isOver })}>{textNum}</span>
          <span className={classNames({ [css.text]: !isNull })}>/{limitNum}</span>
        </div>
      </div>
      <div className={css.btn}>
        <Button onClick={() => onCancel()}>{cancelText}</Button>
        <Button type="primary" onClick={() => onOk(text)}>{okText}</Button>
      </div>
    </div>
  );
});

TextArea.defaultProps = {
  limitNum: 500,
  onOk: () => {},
  onCancel: () => {},
  cancelText: '取消',
  okText: '确定',
  style: {}
};

export default TextArea;
