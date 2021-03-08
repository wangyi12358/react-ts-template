import React, { Suspense } from 'react';
import { Spin } from 'antd';
import css from './index.less';

const lazyComponent = (component: () => Promise<any>) => {
  const Component = React.lazy(component);
  return (props: any) => (
    <div>
      <Suspense fallback={(
        <div className={css.spin}>
          <Spin size="large" />
        </div>
      )}>
        <Component {...props} />
      </Suspense>
    </div>
  );
};

export default lazyComponent;
