---
order: 10
title: SettingColumn
group:
  title: 基础组件
  order: 1
---

## SettingColumn

### 首次渲染自定义列：

```tsx
import React from 'react';
import { SettingColumn } from 'nsne-react-component';

export default () => {
  const columns = Array.from({ length: 200 }, (v, k) => k).map(k => {
    const custom = {
      key: `id-${k}`,
      title: `字段 ${k}`,
    };
    return custom;
  });

  return <SettingColumn columns={columns} />;
};
```

### 根据用户历史自定义设置渲染:

```tsx
import React from 'react';
import { SettingColumn } from 'nsne-react-component';

export default () => {
  const columns = Array.from({ length: 8 }, (v, k) => k).map((k, index) => {
    const custom = {
      key: `id-${k}`,
      title: `字段 ${k}`,
      checked: index <= 4 ? true : false,
    };
    return custom;
  });

  return <SettingColumn columns={columns} columnList={columns} />;
};
```

### 在 Table 中使用：

```tsx
import React from 'react';
import { Table, SettingColumn } from 'nsne-react-component';

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
  const columnListString = localStorage.getItem('SettingColumnDemo');
  const columnList = columnListString && JSON.parse(columnListString);

  const [showColumns, setShowColumns] = React.useState(columns);
  const onColumnChange = (filterColumns, columnList, columns) => {
    setShowColumns(filterColumns);
    localStorage.setItem('SettingColumnDemo', JSON.stringify(columnList));
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        <SettingColumn
          columns={columns}
          columnList={columnList}
          onChange={onColumnChange}
        />
      </div>
      <Table
        dataSource={data}
        columns={showColumns}
        pagination={{
          pageSize: 2,
        }}
      ></Table>
    </>
  );
};
```

## API

| 参数       | 说明                                                                                                                                                 | 类型                                                                                    | 默认值 | 版本 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ | ---- |
| columns    | 原始 table 中 columns 的配置, key 与 dataIndex 必须存在其一，且不能重复                                                                              | `ColumnType[]`                                                                          | -      |      |
| columnList | 用户自定义排序及筛选后的值，通常存储在 localStorage 中, 为 null 则选中所有列（第一次，用户尚未自定义）                                               | `ColumnItem[]`                                                                          | -      |
| onChange   | 是否默认选中所有字段，用于首次尚未定义字段时，选中所有列。参数分别表示，filterColumns 自定义后的字段，columnList 自定义列的数据， columns 原始列数据 | `(filterColumns: ColumnType[],columnList: ColumnItem[],columns: ColumnType[]) => void;` | -      |      |

### ColumnType

原始 table 中 columns 的类型

{title: string, key?: string, dataIndex?: string}

### ColumnItem

自定义列的列表项类型
{title: string, key: string, checked: boolean}
