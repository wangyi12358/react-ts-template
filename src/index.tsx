import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Router from './router';
import './index.less';

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <Router />
  </ConfigProvider>,
  document.getElementById('root') as HTMLDivElement,
);
