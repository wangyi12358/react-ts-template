import React from 'react';
import { Layout } from 'antd';
import css from './index.less';

export interface Props {}

const { Footer: AntFooter } = Layout;

const Footer: React.FC<Props> = () => {
  return (
    <AntFooter className={css.footer}>
      Footer
    </AntFooter>
  );
};

Footer.defaultProps = {};

export default Footer;
