import React from 'react';
import { Form, Upload, Drawer, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Input from 'components/common/input';
import CountDown from '../countDown';
import { useConnect } from '../../../model/index';
import css from './index.less';

export interface Props extends FormComponentProps {
    // setState?: (bool: boolean) => void;
    // setCodeForm?: (code: string) => void;
    // user?: {
    //     id: number;
    //     name: string;
    //     tel: string;
    // };
}

const { Item: FormItem, create: createFrom } = Form;

const Code: React.FC<Props> = React.memo<Props>(({ form }) => {
    
  const [store, dispatch] = useConnect();

  const { user } = store;

  return (
    <Form>
      <FormItem label="请输入验证码">
        {form.getFieldDecorator('code', {
          rules: [
            { 
              required: true, message: '请输入验证码!' 
            },
          ],
        })(
          <Input
            onChange={(e) => {
              dispatch({
                type: 'update',
                payload: {
                  codeForm: e.target.value
                }
              });
            //   setCodeForm(e.target.value);
            }}
            className={css.inputCode} size="large" placeholder="请输入验证码" 
            suffix={<CountDown onClick={(bool) => dispatch({
              type: 'update',
              payload: {
                state: bool
              }
            })} tel={user.tel && user.tel} form={form}
            />}
          />,
        )}
      </FormItem>
    </Form>
  );
});

Code.defaultProps = {};

export default createFrom()(Code);
