/*
 * @File: Section 组件
 * @Author: lintao.wang
 * @Date: 2020-11-05 15:10:34
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-13 19:32:56
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './index.less';

export interface SectionProps {
  className?: string;
  style?: React.CSSProperties;
  rightContent?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Section(props: SectionProps) {
  const { className, style, title, rightContent, children } = props;

  return (
    <div className={classNames('research-section', className)} style={style}>
      <div className="research-section-header">
        <div>
          <span className="research-section-header-title">{title}</span>
        </div>
        {rightContent}
      </div>
      <div className="research-section-body">{children}</div>
    </div>
  );
}
