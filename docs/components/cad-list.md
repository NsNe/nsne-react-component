---
order: 5
title: CardList
group:
  title: 基础组件
  order: 1
---

## CardList

### CardList 展示

```tsx
import React from 'react';
import { CardList } from 'nsne-react-component';

export default () => {
  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  return (
    <CardList
      dataSource={data}
      pagination={{
        pageSize: 2,
      }}
      itemTitleRender={record => record.name}
      itemContentRender={record => JSON.stringify(record)}
    ></CardList>
  );
};
```

### 可展开 CardList

```tsx
import React from 'react';
import { CardList, Table } from 'nsne-react-component';

export default () => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ];

  return (
    <CardList
      dataSource={data}
      pagination={{
        pageSize: 2,
      }}
      itemTitleRender={record => record.name}
      itemContentRender={record => JSON.stringify(record)}
      expandable={{
        expandedRowRender: record => (
          <>
            <p style={{ margin: 0 }}>{record.description}</p>
            <Table
              dataSource={data}
              columns={columns}
              pagination={{
                pageSize: 2,
              }}
            ></Table>
          </>
        ),
      }}
    ></CardList>
  );
};
```

## API

### CardList

| 参数              | 说明                                      | 类型                                                   | 默认值 | 版本 |
| ----------------- | ----------------------------------------- | ------------------------------------------------------ | ------ | ---- |
| className         | 自定义类名                                | `string`                                               | -      |      |
| style             | 自定义样式                                | `CSSProperties`                                        | -      |      |
| dataSource        | 数据数组                                  | `object[]`                                             | -      |      |
| expandable        | 配置展开属性                              | [expandable](#expandable)                              | -      |      |
| rowKey            | 卡片项 key 的取值，可以是字符串或一个函数 | <code>string &#x7C; function(record): string</code>    | `key`  |      |
| onChange          | 分页变化时触发                            | `function(pagination)`                                 | -      |      |
| itemTitleRender   | 卡片标题渲染                              | `function(record, index, indent, expanded): ReactNode` | -      |
| itemContentRender | 卡片内容字段渲染                          | `function(record, index, indent, expanded): ReactNode` | -      |

### expandable

| 参数                   | 说明               | 类型                                                   | 默认值 | 版本 |
| ---------------------- | ------------------ | ------------------------------------------------------ | ------ | ---- |
| defaultExpandedRowKeys | 默认展开的行       | `string[]`                                             | -      |      |
| expandedRowRender      | 额外的展开行       | `function(record, index, indent, expanded): ReactNode` | -      |      |
| onExpand               | 点击展开图标时触发 | `function(expanded, record)`                           | -      |      |
