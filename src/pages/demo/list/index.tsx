import React from 'react';
import { useAntdTable } from 'ahooks';
import Ajax from 'common/utils/ajax';
import Table, { Props as TableProps } from 'components/common/table';
import PageLayout from 'components/layouts/pageLayout';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import Button from 'components/common/button';

const url: string = 'http://127.0.0.1:5000/demo';

interface Data {
  id: number;
  name: string;
  age: number;
  sex: number;
}

async function getData({ current, pageSize }: PaginatedParams[0], params) {
  // return Ajax.query({
  //   url,
  //   params: {
  //     current,
  //     pageSize,
  //     ...params,
  //     // ...other[3],
  //   },
  // });
  return { "list": [{ "id": 1, "name": "wang", "age": 20, "sex": 1, "createdAt": "2021-03-01T16:00:00.000Z", "updatedAt": null, "deletedAt": null }, { "id": 2, "name": "wang1", "age": 27, "sex": 1, "createdAt": "2021-03-01T16:00:00.000Z", "updatedAt": null, "deletedAt": null }, { "id": 3, "name": "waa1", "age": 66, "sex": 1, "createdAt": "2021-03-01T16:00:00.000Z", "updatedAt": null, "deletedAt": null }, { "id": 4, "name": "英雄联盟", "age": 11, "sex": 1, "createdAt": "2021-03-01T16:00:00.000Z", "updatedAt": null, "deletedAt": null }, { "id": 5, "name": "绝地求生", "age": 5, "sex": 1, "createdAt": "2021-03-01T16:00:00.000Z", "updatedAt": null, "deletedAt": null }], "total": 6 };

}

const List = React.memo(() => {

  const { tableProps, run, params } = useAntdTable(getData, {
    defaultPageSize: 5,
  });

  console.log('params===', params);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '操作',
      key: 'action',
      render() {
        return (
          <a>删除</a>
        )
      }
    }
  ];
  const props: TableProps<Data> = {
    ...tableProps,
    search: {
      onSearch(value) {
        params[1].keywrod = value;
        run(...params);
      },
      // renderBtn() {
      //   return (
      //     <Button>添加</Button>
      //   )
      // },
    },
    rowKey: row => String(row.id),
    columns,
  };

  return (
    <PageLayout>
      <Table {...props} />
    </PageLayout>
  );
})

export default List;
