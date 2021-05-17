/*
 * @File: 带溯源的文本值
 * @Author: lintao.wang
 * @Date: 2020-11-16 11:08:53
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-27 18:09:09
 */

import React, { useEffect, useState } from 'react';
import Text, { TextProps } from '../components/Text';
import { Popover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import SourceList, { SourceListProps } from '../SourceList';
import classNames from 'classnames';
import './index.less';

export interface TextValueSourceProps extends PopoverProps {
  textProps?: TextProps;
  sourceListProps?: SourceListProps;
  loading?: boolean;
}

const TextValueSource = (props: TextValueSourceProps) => {
  const {
    textProps,
    sourceListProps,
    visible = false,
    onVisibleChange,
    trigger = 'click',
    children,
    overlayClassName,
    loading = false,
    ...restProps
  } = props;

  const {
    visible: tipVisible = false,
    onVisibleChange: tipVisibleChange,
    className: tooltipClassName,
    ...textRestProps
  } = textProps || {};

  const [popoverVisible, setPopoverVisible] = useState(visible);
  const [tooltipVisible, setTooltipVisible] = useState(tipVisible);

  useEffect(() => {
    if (popoverVisible !== visible) {
      setPopoverVisible(visible || false);
    }
  }, [visible]);

  const onPopoverVisibleChange = (value: boolean) => {
    setPopoverVisible(value);
    if (value) {
      setTooltipVisible(false);
    }
    if (onVisibleChange) {
      onVisibleChange(value);
    }
  };

  const onTooltipVisibleChange = (value: boolean) => {
    if (popoverVisible) {
      setTooltipVisible(false);
    } else {
      setTooltipVisible(value);
    }
    if (tipVisibleChange) {
      tipVisibleChange(value);
    }
  };

  return (
    <Popover
      trigger={trigger}
      destroyTooltipOnHide={{ keepParent: false }}
      {...restProps}
      onVisibleChange={onPopoverVisibleChange}
      visible={popoverVisible}
      content={<SourceList {...sourceListProps} loading={loading} />}
      overlayClassName={classNames(
        'research-textValueSource-popover',
        overlayClassName,
      )}
    >
      <Text
        type="value"
        {...textRestProps}
        visible={tooltipVisible}
        onVisibleChange={onTooltipVisibleChange}
        className={classNames(
          'research-textValueSource-text',
          tooltipClassName,
        )}
      >
        {children}
      </Text>
    </Popover>
  );
};

export default TextValueSource;
