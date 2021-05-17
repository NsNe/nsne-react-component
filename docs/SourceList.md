---
order: 4
title: 溯源列表
group:
  title: 业务组件
  order: 2
  path: /business
---

## SourceList

通过设置 provider 来控制是否可溯源

```tsx
import React from 'react';
import { SourceList } from 'nsne-react-component';
import { Popover, Button } from 'antd';

export default () => {
  const data = [
    {
      name: '类目1',
      fields: [
        { name: '字段1', value: '值1' },
        { name: '字段2', value: '值2' },
      ],
    },
    {
      name: '类目2',
      fields: [
        { name: '字段1', value: '值1' },
        { name: '字段2', value: '值2' },
      ],
    },
  ];

  const onItemClick = (record, index) => {
    console.log(record, index);
  };

  return (
    <>
      <Popover
        content={<SourceList data={data} onItemClick={onItemClick} />}
        trigger="click"
      >
        <Button>open</Button>
      </Popover>
    </>
  );
};
```

## API

| 参数        | 说明       | 类型                                                                            | 默认值 | 版本 |
| ----------- | ---------- | ------------------------------------------------------------------------------- | ------ | ---- |
| className   | 自定义类名 | `string`                                                                        | -      |      |
| style       | 自定义样式 | `CSSProperties`                                                                 | -      |      |
| data        | panel 数据 | `dataItem[]`                                                                    | -      |      |
| onItemClick | 自定义样式 | `(item: dataItem, index: number, event: React.MouseEvent<HTMLElement>) => void` | -      |      |

### dataItem

| 参数   | 说明     | 类型                               | 默认值 |
| ------ | -------- | ---------------------------------- | ------ |
| name   | 标题     | `string`                           | -      |
| fields | 字段信息 | `{name: string, value?: string}[]` | -      |
