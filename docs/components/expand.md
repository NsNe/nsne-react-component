---
order: 1
title: Expand
group:
  title: 基础组件
  order: 1
---

## ExpandIcon

```tsx
import React from 'react';
import { Expand } from 'nsne-react-component';
const { Icon: ExpandIcon } = Expand;

export default () => {
  return <ExpandIcon expanded title="基本信息" activeTitle />;
};
```

## Expand

```tsx
import React from 'react';
import { Button } from 'antd';
import { Expand } from 'nsne-react-component';

export default () => {
  return (
    <Expand
      expanded
      title="基本信息"
      rightContent={expand => <Button>{expand ? '展开了' : '收起了'}</Button>}
    >
      测试展开内容
    </Expand>
  );
};
```

## API

### ExpandIcon

| 参数        | 说明                 | 类型                                                          | 默认值  | 版本 |
| ----------- | -------------------- | ------------------------------------------------------------- | ------- | ---- |
| className   | 自定义类名           | `string`                                                      | -       |      |
| style       | 自定义样式           | `CSSProperties`                                               | -       |      |
| expanded    | 是否展开             | `CSSProperties`                                               | `false` |      |
| title       | 标题                 | `React.ReactNode`                                             | -       |      |
| activeTitle | 展开时是否高亮 title | `boolean`                                                     | `false` |      |
| onClick     | 展开被点击           | `(expand: boolean, e: React.MouseEvent<HTMLElement>) => void` | -       |      |

### Expand

| 参数         | 说明                 | 类型                                                                       | 默认值  | 版本 |
| ------------ | -------------------- | -------------------------------------------------------------------------- | ------- | ---- |
| className    | 自定义类名           | `string`                                                                   | -       |      |
| style        | 自定义样式           | `CSSProperties`                                                            | -       |      |
| expanded     | 是否展开             | `CSSProperties`                                                            | `false` |      |
| title        | 标题                 | `React.ReactNode`                                                          | -       |      |
| activeTitle  | 展开时是否高亮 title | `boolean`                                                                  | `false` |      |
| onClick      | 展开被点击           | `(expand: boolean, e: React.MouseEvent<HTMLElement>) => void`              | -       |      |
| children     | 展开的子元素         | <code>React.ReactNode &#x7C; ((expand: boolean) => React.ReactNode)</code> | -       |      |
| rightContent | 展开菜单右侧元素     | <code>React.ReactNode &#x7C; ((expand: boolean) => React.ReactNode)</code> | -       |      |
