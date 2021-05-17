---
order: 12
title: Text
group:
  title: 基础组件
  order: 1
---

## Text

```tsx
import React from 'react';
import { Tooltip, Popover } from 'antd';
import { Text, Modal } from 'nsne-react-component';

export default () => {
  const onLinkClick = () => {
    Modal.open({
      title: 'modal title',
      content: <div>43434343</div>,
      footer: null,
    });
  };

  return (
    <>
      <Text maxWidth={128}>我是一段label</Text>
      <br />
      <Text maxWidth={128}>
        我是一段label我是一段label我是一段label我是一段label我是一段label
      </Text>
      <br />
      <Text maxWidth={366} type="value">
        我是一段值 我是一段值
      </Text>
      <br />
      <Text maxWidth={366} type="value">
        我是一段值 我是一段值我是一段值 我是一段值我是一段值
        我是一段值我是一段值 我是一段值我是一段值 我是一段值我是一段值
        我是一段值我是一段值 我是一段值
      </Text>
      <br />
      <Text type="link" onClick={onLinkClick}>
        我是一个链接
      </Text>
      <br />
    </>
  );
};
```

## API

### ExpandIcon

| 参数      | 说明         | 类型                     | 默认值  | 版本 |
| --------- | ------------ | ------------------------ | ------- | ---- |
| className | 自定义类名   | `string`                 | -       |      |
| style     | 自定义样式   | `CSSProperties`          | -       |      |
| type      | Text 类型    | `label`, `value`, `link` | `label` |      |
| maxWidth  | 文本最大宽度 | `number`                 | 140     |      |
| onClick   | 文本点击事件 | `function`               | -       |      |

其余参数，见：https://ant.design/components/tooltip-cn/#API
