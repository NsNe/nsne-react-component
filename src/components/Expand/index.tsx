/*
 * @File: Expand容器
 * @Author: lintao.wang
 * @Date: 2020-11-07 14:33:07
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-27 21:22:06
 */

import React, { useEffect } from 'react';
import ExpandIcon, { ExpandIconProps } from './expand-icon';
import classNames from 'classnames';
import './index.less';

export interface ExpandProps extends ExpandIconProps {
  children?: React.ReactNode | ((expand: boolean) => React.ReactNode);
  rightContent?: React.ReactNode | ((expand: boolean) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
}

const Expand = (props: ExpandProps) => {
  const {
    className,
    style,
    children,
    rightContent,
    onClick,
    expanded = false,
    disabled = false,
    ...restProps
  } = props;
  const [expandRended, setExpandRended] = React.useState<boolean>(expanded);
  const [expandFirst, setExpandFirst] = React.useState(false);

  useEffect(() => {
    if (expandRended) {
      setExpandFirst(true);
    }
  }, [expandRended]);

  useEffect(() => {
    if (expanded !== expandRended) {
      setExpandRended(expanded);
    }
  }, [expanded]);

  const rightContentNode =
    typeof rightContent === 'function'
      ? rightContent(expandRended)
      : rightContent;

  const childrenNode =
    typeof children === 'function' ? children(expandRended) : children;

  let expandedNode;
  if (expandFirst) {
    expandedNode = (
      <div
        style={{ display: expandRended ? '' : 'none' }}
        className="research-expand-content"
      >
        {childrenNode}
      </div>
    );
  }

  useEffect(() => {
    if (!restProps?.title) {
      setExpandRended(true);
    }
  }, [restProps?.title]);

  const expandProps = {
    ...restProps,
    expanded: expandRended,
    disabled,
    onClick: (expand: boolean, e: React.MouseEvent<HTMLElement>) => {
      setExpandRended(expand);
      if (onClick) {
        onClick(expand, e);
      }
    },
  };

  return (
    <>
      {restProps?.title && (
        <div className={classNames(className, 'research-expand')}>
          <ExpandIcon {...expandProps} />
          {rightContentNode}
        </div>
      )}
      {disabled ? null : restProps?.title ? expandedNode : childrenNode}
    </>
  );
};

Expand.Icon = ExpandIcon;

export default Expand;
