/*
 * @File: 可拖拽控制的 Drawer
 * @Author: lintao.wang
 * @Date: 2020-11-09 15:33:55
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-10 10:56:16
 */
import React from 'react';
import { DrawerProps } from 'antd/lib/drawer';
import { Drawer } from 'antd';
import { Resizable } from 're-resizable';
import classNames from 'classnames';
import './index.less';

export interface ResizeDrawerProps extends DrawerProps {
  resizeWidth?: number;
  resizeMinWidth?: number;
  resizeMaxWidth?: number;
  children?: React.ReactNode;
}

const ResizeDrawer = (props: ResizeDrawerProps) => {
  const {
    resizeWidth = 800,
    resizeMinWidth = 584,
    resizeMaxWidth = 904,
    className,
    children,
    ...restProps
  } = props;

  const [width, setWidth] = React.useState(resizeWidth);
  const [height] = React.useState('100%');

  const resizeProps = {
    style: {
      display: 'flex',
    },
    defaultSize: { width, height },
    enable: { left: true },
    minWidth: resizeMinWidth,
    maxWidth: resizeMaxWidth,
  };

  return (
    <Drawer
      {...restProps}
      className={classNames(className, 'research-drawer')}
      width="auto"
    >
      <Resizable {...resizeProps} className="research-drawer-resize">
        {children}
      </Resizable>
    </Drawer>
  );
};

export default ResizeDrawer;
