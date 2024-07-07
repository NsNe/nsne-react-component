---
order: 2
title: Section
group:
  title: 基础组件
  order: 1
---

## Section

```tsx
import React from 'react';
import { Button } from 'antd';
import { Section } from 'nsne-react-component';

export default () => {
  return (
    <Section title="病案夹" rightContent={<Button size="small">测试</Button>}>
      Section 内容
    </Section>
  );
};
```

## API

### Section

| 参数         | 说明                     | 类型              | 默认值 | 版本 |
| ------------ | ------------------------ | ----------------- | ------ | ---- |
| className    | 自定义类名               | `string`          | -      |      |
| style        | 自定义样式               | `CSSProperties`   | -      |      |
| title        | 标题                     | `React.ReactNode` | -      |      |
| rightContent | Section 顶部右侧展示内容 | `React.ReactNode` | -      |      |
| children     | Section 子元素           | `React.ReactNode` | -      |      |
