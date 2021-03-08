import React from 'react';
import { Link } from 'react-router-dom';
// import Button from 'components/common/button';
import css from './index.less';

const Page404: React.FunctionComponent = () => (
  <div className={css.container404}>
    <div className={css.left}>
      <div className={css.leftContent} >
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="" />
      </div>
    </div>
    <div className={css.right}>
      <h2>404</h2>
      <div className={css.text}>抱歉，你访问的页面不存在</div>
      <div>
        <Link to="/">
          {/* <Button type="primary" htmlType="button">
            返回首页
          </Button> */}
        </Link>
      </div>
    </div>
  </div>
);

export default Page404;
