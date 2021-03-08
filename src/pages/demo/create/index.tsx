import React from 'react';
import PageLayout from 'components/layouts/pageLayout';
import { usePersistFn } from 'ahooks';

const Create = React.memo(() => {
  const a = usePersistFn((params) => {
    console.log('usePersistFn', params);
  });
  console.log(a({ data: 1 }));
  // a();
  return (
    <PageLayout>
      新增
    </PageLayout>
  );
});

export default Create;