---
order: 11
title: Modal
group:
  title: 基础组件
  order: 1
---

## Modal

```tsx
import React from 'react';
import { Button } from 'antd';
import { Modal, Table } from 'nsne-react-component';
import './style/modal.less';

let num = 1;
export default () => {
  const onOpenModal = title => {
    title = title ? title + num++ : 'Modal Title';
    Modal.open({
      title,
      className: 'levelModal',
      content: (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize: 2,
          }}
        ></Table>
      ),
      footer: null,
      width: 800,
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a onClick={() => onOpenModal('Again Modal')}>open</a>,
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

  const onOpenConfimModal = () => {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
    });
  };

  const [visible, setVisible] = React.useState(false);
  const onOpenNormalModal = () => {
    setVisible(true);
  };

  const onNormalModalCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => onOpenModal()} style={{ marginRight: 8 }}>
        open
      </Button>
      <Button onClick={onOpenConfimModal} style={{ marginRight: 8 }}>
        confirm
      </Button>
      <Button onClick={onOpenNormalModal}>normal</Button>
      <Modal
        visible={visible}
        title="test"
        onCancel={onNormalModalCancel}
        onOk={onNormalModalCancel}
      ></Modal>
    </>
  );
};
```

## API

参照 [Modal.method()](<https://ant.design/components/modal-cn/#Modal.method()>)
