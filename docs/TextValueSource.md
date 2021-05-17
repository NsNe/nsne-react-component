---
order: 5
title: 溯源 value
group:
  title: 业务组件
  order: 2
  path: /business
---

## TextValueSource

```tsx
import React from 'react';
import { TextValueSource } from 'nsne-react-component';

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

  const sourceListProps = {
    data,
    onItemClick,
  };

  return (
    <>
      <TextValueSource
        textProps={{ maxWidth: 366 }}
        sourceListProps={sourceListProps}
      >
        这是一个字段值 这是一个字段值 这是一个字段值 这是一个字段值
        这是一个字段值 这是一个字段值
      </TextValueSource>
    </>
  );
};
```

## API

| 参数            | 说明           | 类型              | 默认值 | 版本 |
| --------------- | -------------- | ----------------- | ------ | ---- |
| textProps       | 文本组件 props | `TextProps`       | -      |      |
| sourceListProps | 溯源列表 props | `sourceListProps` | -      |      |

其余参数，见 https://ant.design/components/popover-cn/#API
