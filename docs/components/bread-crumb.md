---
order: 6
title: Breadcrumb
group:
  title: 基础组件
  order: 1
---

## Breadcrumb

面包屑:

```tsx
import React from 'react';
import { Breadcrumb } from 'nsne-react-component';

export default () => {
  const breadcrumbProps = {
    breadcrumbs: [
      {
        name: '患者筛选',
        href: '/filter',
      },
      {
        name: `患者4875031`,
      },
    ],
  };

  return <Breadcrumb {...breadcrumbProps} />;
};
```

## API

| 参数        | 说明                                   | 类型                                | 默认值 | 版本 |
| ----------- | -------------------------------------- | ----------------------------------- | ------ | ---- |
| className   | 自定义类名                             | `string`                            | -      |      |
| style       | 自定义样式                             | `CSSProperties`                     | -      |      |
| breadcrumbs | 面包屑数组，若未配置或为空数组则不展示 | [BreadcrumbMeta[]](#breadcrumbmeta) | []     |      |

其余参数见 https://ant.design/components/breadcrumb-cn/#Breadcrumb

#### BreadcrumbMeta

| 参数 | 说明             | 类型              | 默认值 | 版本 |
| ---- | ---------------- | ----------------- | ------ | ---- |
| name | 面包屑显示的名称 | `React.ReactNode` | -      |      |

其余参数见 https://ant.design/components/breadcrumb-cn/#Breadcrumb.Item
