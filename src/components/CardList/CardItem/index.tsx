/*
 * @File: 单个卡片渲染
 * @Author: lintao.wang
 * @Date: 2020-11-06 14:48:31
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-19 17:38:24
 */

import React from 'react';
import classNames from 'classnames';
import { RowClassName } from '..';
import './index.less';

export type Key = string | number;

export interface RenderExpandIconProps<RecordType> {
  prefixCls: string;
  expanded: boolean;
  record: RecordType;
  expandable: boolean;
  onExpand: TriggerEventHandler<RecordType>;
  title?: React.ReactNode;
}
export declare type TriggerEventHandler<RecordType> = (
  record: RecordType,
  event: React.MouseEvent<HTMLElement>,
) => void;

export declare type RenderExpandIcon<RecordType> = (
  props: Partial<RenderExpandIconProps<RecordType>>,
) => React.ReactNode;

export declare type ExpandedRowRender<ValueType> = (
  record: ValueType,
  index: number,
  indent: number,
  expanded: boolean,
) => React.ReactNode;

interface CardItemProps<RecordType extends object = any> {
  className?: string;
  style?: React.CSSProperties;
  record?: RecordType;
  itemTitleRender?: ExpandedRowRender<RecordType>;
  itemContentRender?: ExpandedRowRender<RecordType>;
  expandIcon?: RenderExpandIcon<RecordType>;
  expandedRowRender?: ExpandedRowRender<RecordType>;
  rowExpandable?: (record: RecordType) => boolean;
  onExpand: TriggerEventHandler<RecordType>;
  expandableType: string | false;
  index: number;
  expandedKeys: Set<Key>;
  recordKey: Key;
  expandedRowClassName?: string | RowClassName<RecordType>;
  rowClassName?: string | RowClassName<RecordType>;
}

const CardItem = (props: CardItemProps) => {
  const {
    className,
    style,
    record,
    index,
    itemTitleRender,
    itemContentRender,
    expandIcon,
    expandedKeys,
    expandableType,
    expandedRowRender,
    rowClassName,
    expandedRowClassName,
    rowExpandable,
    onExpand,
  } = props;

  const expanded = expandedKeys && expandedKeys.has(props.recordKey);
  const [expandRended, setExpandRended] = React.useState(false);

  React.useEffect(() => {
    if (expanded) {
      setExpandRended(true);
    }
  }, [expanded]);

  const rowSupportExpand =
    expandableType === 'row' && (!rowExpandable || rowExpandable(record));

  let expandRowNode: React.ReactNode;
  let expandIconNode: React.ReactNode;
  if (rowSupportExpand && expandableType && expandRended && expandedRowRender) {
    const expandContent = expandedRowRender(record, index, 15, expanded);
    expandRowNode = (
      <div
        className={classNames(
          typeof expandedRowClassName === 'function'
            ? expandedRowClassName(record, index, 15)
            : expandedRowClassName,
          'research-cardItem-expand-row',
          { 'research-cardItem-expand-row-expanded': expanded },
        )}
        style={{
          display: expanded ? '' : 'none',
        }}
      >
        {expandContent}
      </div>
    );
  }

  let titleNode;
  // 如果支持展开，则添加 iconNode
  if (rowSupportExpand && expandIcon && expandableType) {
    expandIconNode = expandIcon({
      expanded,
      onExpand,
      record,
      title: itemTitleRender
        ? itemTitleRender(record, index, 15, expanded)
        : undefined,
    });
  } else {
    titleNode = itemTitleRender
      ? itemTitleRender(record, index, 15, expanded)
      : null;
  }
  const baseRowNode = (
    <div
      className={classNames(
        'research-cardItem',
        'research-cardItem-row',
        typeof rowClassName === 'function'
          ? rowClassName(record, index, 15)
          : rowClassName,
        {
          'research-cardItem-row-expanded': expanded,
        },
      )}
    >
      <div
        className={classNames(
          'research-cardItem-row-title',
          {
            'research-cardItem-row-title-expanded': expanded,
          },
          {
            active: expanded,
          },
        )}
      >
        {expandIconNode}
        {titleNode}
      </div>
      {itemContentRender && itemContentRender(record, index, 15, expanded)}
    </div>
  );

  return (
    <div
      className={classNames('research-cardItem-container', className)}
      style={style}
    >
      {baseRowNode}
      {expandRowNode}
    </div>
  );
};

export default CardItem;
