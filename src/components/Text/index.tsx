/*
 * @File: 文字显示
 * @Author: lintao.wang
 * @Date: 2020-11-13 10:59:53
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-27 18:08:28
 */
import { Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import './index.less';
import _ from 'lodash';

export type TextType = 'link' | 'label' | 'value';

export interface TextProps extends Partial<TooltipPropsWithTitle> {
  className?: string;
  style?: React.CSSProperties;
  type?: TextType;
  maxWidth?: number | string;
  children?: React.ReactNode;
  colon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Text = (props: TextProps) => {
  const {
    type = 'label',
    title,
    children,
    maxWidth = 140,
    colon = true,
    onClick,
    className,
    style,
    ...restProps
  } = props;

  const [showTip, setShowTip] = React.useState(false);

  const childrenRef = useRef<any>();

  // 不能得到正确的宽度（得到了 0），先用比较苟的办法解决，详见 issue https://github.com/facebook/react/issues/13108
  useEffect(() => {
    if (childrenRef?.current) {
      setTimeout(() => {
        try {
          const node = childrenRef.current;
          const showTooltip =
            node.offsetWidth < node.scrollWidth || // 处理单行省略
            node.offsetHeight < node.scrollHeight; // 处理多行省略
          setShowTip(showTooltip);
        } catch (error) {}
      }, 1);
    }
  });

  const textContent = (
    <div
      className={classNames('research-text-container', className)}
      onClick={onClick}
      style={style}
    >
      <div
        style={{
          maxWidth,
        }}
        ref={childrenRef}
        className={classNames('research-text', `research-text-${type}`)}
      >
        {children}
      </div>
      {type === 'label' && colon && (
        <span className="research-text-label-colon">:</span>
      )}
    </div>
  );

  return showTip ? (
    <Tooltip
      title={title || children}
      destroyTooltipOnHide={{ keepParent: false }}
      {...restProps}
      overlayClassName={classNames(
        restProps?.overlayClassName,
        'research-text-overlay',
      )}
    >
      {textContent}
    </Tooltip>
  ) : (
    textContent
  );
};

export default Text;
