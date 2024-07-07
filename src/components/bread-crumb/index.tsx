/*
 * @File: 面包屑
 * @Author: lintao.wang
 * @Date: 2020-11-04 16:17:17
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-04 17:42:37
 */
import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import {
  BreadcrumbItemProps,
  BreadcrumbProps as AntdBreadcrumbProps,
} from 'antd/lib/breadcrumb';
import classNames from 'classnames';
import './index.less';

export interface BreadcrumbMeta extends BreadcrumbItemProps {
  name: React.ReactNode;
}

export interface BreadcrumbProps extends AntdBreadcrumbProps {
  breadcrumbs?: BreadcrumbMeta[];
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { className, breadcrumbs = [], ...restProps } = props;

  return breadcrumbs.length ? (
    <div className={classNames('research-breadcrumb-wrapper', className)}>
      <AntdBreadcrumb
        separator=">"
        className="research-breadcrumb"
        {...restProps}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const { name, ...restProps } = breadcrumb;
          return (
            <AntdBreadcrumb.Item {...restProps} key={index}>
              {name}
            </AntdBreadcrumb.Item>
          );
        })}
      </AntdBreadcrumb>
    </div>
  ) : null;
};

export default Breadcrumb;
