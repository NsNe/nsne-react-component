/*
 * @File: 展开组件
 * @Author: lintao.wang
 * @Date: 2020-11-05 18:59:24
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-07 15:00:22
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.less';

export interface ExpandIconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (expand: boolean, e: React.MouseEvent<HTMLElement>) => void;
  expanded?: boolean; // 是否展开
  title?: string;
  activeTitle?: boolean;
  disabled?: boolean;
}

const ExpandIcon = (props: ExpandIconProps) => {
  const {
    expanded = false,
    activeTitle = false,
    disabled = false,
    title,
    onClick,
    className,
    style,
  } = props;

  const [expandStatus, setExpandStatus] = useState<boolean>(expanded);

  useEffect(() => {
    if (expandStatus !== expanded) {
      setExpandStatus(expandStatus);
    }
  }, [expanded]);

  const onExpandClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const status = !expandStatus;
    setExpandStatus(status);
    if (onClick) {
      onClick(status, e);
    }
  };

  return (
    <span
      className={classNames('research-expand-icon', className, {
        'research-expand-icon-disabled': disabled,
      })}
      style={style}
      onClick={onExpandClick}
    >
      {disabled ? (
        <img src={require('./img/arrow-disabled.svg')} alt="不可展开" />
      ) : expandStatus ? (
        <img src={require('./img/arrow-down.svg')} alt="收起" />
      ) : (
        <img src={require('./img/arrow-right.svg')} alt="展开" />
      )}
      {title && (
        <span
          className={classNames('research-expand-icon-title', {
            'research-expand-icon-title-active':
              !disabled && activeTitle && expandStatus,
          })}
        >
          {title}
        </span>
      )}
    </span>
  );
};

export default ExpandIcon;
