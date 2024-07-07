/*
 * @File: Tag
 * @Author: lintao.wang
 * @Date: 2020-11-09 14:15:20
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-09 14:31:33
 */

import React from 'react';
import { Tag as AntdTag } from 'antd';
import { TagProps as AntdTagProps } from 'antd/lib/tag';
import classNames from 'classnames';
import './index.less';

const presetsColor = {
  success: '#5CD8A7',
  error: '#E8694A',
  warning: '#E9B211',
};

const Tag = (props: AntdTagProps) => {
  const { color, className, ...restProps } = props;
  const tagColor = presetsColor[color as keyof typeof presetsColor] || color;

  return (
    <AntdTag
      className={classNames('research-tag', className)}
      color={tagColor}
      {...restProps}
    />
  );
};

export default Tag;
