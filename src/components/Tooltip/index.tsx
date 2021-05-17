import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface TooltipProps extends TooltipPropsWithTitle {
  textMaxLen: number;
  title: string;
}

export function Tooltip({ textMaxLen = -Infinity, ...rest }: TooltipProps) {
  return (rest.title?.length || 0) > textMaxLen ? (
    <AntdTooltip {...rest}>
      {rest.title?.slice(0, textMaxLen) + '...'}
    </AntdTooltip>
  ) : (
    <span>{rest.title || null}</span>
  );
}
