---
order: 9
title: ResizeDrawer
group:
  title: 基础组件
  order: 1
---

## ResizeDrawer

可拖拽 Drawer:

```tsx
import React from 'react';
import { ResizeDrawer } from 'nsne-react-component';
import { Button } from 'antd';

export default () => {
  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <ResizeDrawer visible={visible} onClose={onClose} title="测试Drawer">
        测试 content
      </ResizeDrawer>
    </>
  );
};
```

## API

| 参数           | 说明           | 类型     | 默认值 | 版本 |
| -------------- | -------------- | -------- | ------ | ---- |
| resizeWidth    | 默认展示的宽度 | `number` | `800`  |      |
| resizeMinWidth | 拖拽的最小宽度 | `number` | `584`  |      |
| resizeMaxWidth | 拖拽的最大宽度 | `number` | `904`  |      |

其余参数，见 https://ant.design/components/drawer-cn/#API
