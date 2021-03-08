import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import css from './index.less';
import { sendCode } from 'api/queries/role';

export interface Props extends FormComponentProps {
    tel: string;
    onClick?: (state: boolean) => void;
 }

let timer: NodeJS.Timeout;

const CountDown: React.FC<Props> = ({ form, tel, onClick }) => {

  const [again, setAgain] = React.useState(false);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    if (timer) clearTimeout(timer);
  }, []);

  /**
   * 发送验证码
   */
  function handleSendCode() {
    // form.validateFields(['tel'], (err, { tel }: { tel: string }) => {
    //   console.log('tel', tel);
    //   if (err) return;
    onClick(true);
    handleCountDown();
    sendCode(tel);
    // });
  }

  /**
   * 执行倒计时
   * @param changeTime 
   */
  function handleCountDown(changeTime: number = 60) {
    if (timer) clearTimeout(timer);
    setTime(changeTime);
    if (!changeTime) {
      setAgain(true);
    } else {
      timer = setTimeout(() => handleCountDown(changeTime - 1), 1000);
    }
  }

  if (!time) {
    return (
      <a onClick={handleSendCode} className={css.text}>{again ? '重新发送' : '发送验证码'}</a>
    );
  }

  return <span className={css.text}>{time}s</span>;
};

CountDown.defaultProps = {};

export default CountDown;
