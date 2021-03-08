import React from 'react';
import { Drawer } from 'antd';
import { provideStore, useConnect } from '../model/index'; 
import css from './index.less';

export interface Props {}

const Information: React.FC<Props> = React.memo<Props>(props => {

  const [store, dispatch] = useConnect();
  const { infoVisible } = store;
  // icon取消
  function handleClose() {
    dispatch({
      type: 'update',
      payload: {
        infoVisible: false,
      }
    });
    // window.history.back();
  }
  return (
    <Drawer className={css.drawerBox} title={<img src="https://img.alicdn.com/imgextra/i2/4074958541/O1CN017yMr2U2CxpMWZwAdg_!!4074958541.png" alt="" />} 
      height={window.innerHeight} placement="top" 
      visible={infoVisible} onClose={handleClose}>
      <h1>
        消息中心
      </h1>
    </Drawer>
  );
});

Information.defaultProps = {};

export default Information;
