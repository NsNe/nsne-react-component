---
order: 4
title: Tooltip
group:
  title: 基础组件
  order: 1
---

## Tooltip

提示截断组件。

```tsx
import React from 'react';
import { Button } from 'antd';
import { Tooltip } from 'nsne-react-component';

export default () => {
  return <Tooltip title="这是一段被截断的话" textMaxLen={6} />;
};
```
