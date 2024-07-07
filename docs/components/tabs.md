---
order: 13
title: Tabs
group:
  title: 基础组件
  order: 1
---

## Tabs

```tsx
import React from 'react';
import { Tabs } from 'nsne-react-component';

const { TabPane } = Tabs;

export default () => {
  return (
    <>
      <Tabs>
        {[...Array(30).keys()].map(i => (
          <TabPane tab={`Tab-${i}`} key={i}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
```

## API

https://3x.ant.design/components/tabs-cn/#API
