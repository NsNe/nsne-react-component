/*
 * @File: 卡片列表
 * @Author: lintao.wang
 * @Date: 2020-11-06 11:46:26
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-19 18:24:40
 */

import { PaginationProps } from 'antd/lib/pagination';
import usePagination, {
  DEFAULT_PAGE_SIZE,
} from 'antd/lib/table/hooks/usePagination';
import { Pagination } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { GetRowKey } from 'antd/lib/table/interface';
import ExpandIcon from '../Expand/ExpandIcon';
import CardItem, {
  ExpandedRowRender,
  Key,
  RenderExpandIcon,
  TriggerEventHandler,
} from './CardItem';
import noDAtaIcon from './img/noData_small.svg';
import './index.less';

export function warning(valid: boolean, message: string) {
  // Support uglify
  if (
    process.env.NODE_ENV !== 'production' &&
    !valid &&
    console !== undefined
  ) {
    console.error(`Warning: ${message}`);
  }
}

export interface ChangeEventInfo {
  pagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  };
}

export declare type RowClassName<RecordType> = (
  record: RecordType,
  index: number,
  indent: number,
) => string;

export interface CardListProps<RecordType> {
  className?: string;
  style?: React.CSSProperties;
  dataSource?: RecordType[];
  expandable?: {
    expandedRowKeys?: Key[];
    defaultExpandedRowKeys?: Key[];
    expandedRowRender?: ExpandedRowRender<RecordType>;
    expandIcon?: RenderExpandIcon<RecordType>;
    onExpand?: (expanded: boolean, record: RecordType) => void;
    rowExpandable?: (record: RecordType) => boolean;
  };
  itemTitleRender?: ExpandedRowRender<RecordType>;
  itemContentRender?: ExpandedRowRender<RecordType>;
  rowKey?: string | GetRowKey<RecordType>;
  pagination?: false | PaginationProps;
  onChange?: (pagination: { current?: number; pageSize?: number }) => void;
  expandedRowClassName?: string | RowClassName<RecordType>;
  rowClassName?: string | RowClassName<RecordType>;
}

type ListAction = 'paginate';

const CardList = <RecordType extends object = any>(
  props: CardListProps<RecordType>,
) => {
  const {
    pagination,
    onChange,
    dataSource,
    className,
    style,
    rowKey = 'key',
    expandable,
    itemTitleRender,
    itemContentRender,
    rowClassName,
    expandedRowClassName,
  } = props;

  const rawData: RecordType[] = dataSource || [];
  const mergedData = rawData;

  const changeEventInfo: Partial<ChangeEventInfo> = {};

  const triggerOnChange = (
    info: Partial<ChangeEventInfo>,
    action: ListAction,
    reset: boolean = false,
  ) => {
    const changeInfo = {
      ...changeEventInfo,
      ...info,
    };
    if (reset) {
      if (changeInfo.pagination!.current) {
        changeInfo.pagination!.current = 1;
      }

      if (pagination && pagination.onChange) {
        pagination.onChange(1, changeInfo.pagination!.pageSize);
      }
    }
    if (onChange) {
      onChange(changeInfo.pagination!);
    }
  };

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => {
      const key = record && (record as any)[rowKey as string];
      warning(
        key !== undefined,
        'Each record in table should have a unique `key` prop, or set `rowKey` to an unique primary key.',
      );
      return key;
    };
  }, [rowKey]);

  // ============================ pagination ============================
  const onPaginationChange = (current: number, pageSize: number) => {
    triggerOnChange(
      {
        pagination: { ...changeEventInfo.pagination, current, pageSize },
      },
      'paginate',
    );
  };

  const [mergedPagination] = usePagination(
    mergedData.length,
    pagination,
    onPaginationChange,
  );

  const pageData = React.useMemo<RecordType[]>(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }

    const {
      current = 1,
      total,
      pageSize = DEFAULT_PAGE_SIZE,
    } = mergedPagination;

    // Dynamic table data
    if (mergedData.length < total!) {
      if (mergedData.length > pageSize) {
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }

    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [
    !!pagination,
    mergedData,
    mergedPagination && mergedPagination.current,
    mergedPagination && mergedPagination.pageSize,
    mergedPagination && mergedPagination.total,
  ]);

  let PaginationNode;
  if (pagination !== false && mergedPagination.total) {
    PaginationNode = (
      <Pagination
        {...mergedPagination}
        className={classNames(
          'ant-table-pagination',
          'ant-table-pagination-right',
          mergedPagination.className,
        )}
      />
    );
  }

  // ============================ expandable ============================
  const {
    defaultExpandedRowKeys,
    expandedRowKeys,
    onExpand,
    expandedRowRender,
    rowExpandable,
  } = expandable || {};
  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState<Key[]>(
    () => {
      if (defaultExpandedRowKeys) {
        return defaultExpandedRowKeys;
      }
      return [];
    },
  );

  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  );

  const { expandIcon: megedExpandIcon } = {
    expandIcon: ({ expanded, onExpand, record, title }: any) => (
      <ExpandIcon
        expanded={expanded}
        onClick={e => onExpand(record, e)}
        title={title}
        activeTitle
      />
    ),
    ...expandable,
  };

  const onTriggerExpand: TriggerEventHandler<RecordType> = React.useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, mergedData.indexOf(record));

      let newExpandedKeys: Key[];
      const hasKey = mergedExpandedKeys.has(key);
      if (hasKey) {
        mergedExpandedKeys.delete(key);
        newExpandedKeys = [...mergedExpandedKeys];
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key];
      }

      setInnerExpandedKeys(newExpandedKeys);
      if (onExpand) {
        onExpand(!hasKey, record);
      }
    },
    [getRowKey, mergedExpandedKeys, mergedData, onExpand],
  );

  const expandableType = React.useMemo<false | string>(() => {
    if (expandedRowRender) {
      return 'row';
    }

    return false;
  }, [expandedRowRender]);

  const renderList = () => {
    return pageData.map((data, index) => {
      const Key = getRowKey(data);
      const cardItemProps = {
        record: data,
        index,
        recordKey: Key,
        expandedKeys: mergedExpandedKeys,
        onExpand: onTriggerExpand,
        expandIcon: megedExpandIcon,
        expandedRowRender,
        itemTitleRender,
        itemContentRender,
        expandableType,
        rowExpandable,
        rowClassName,
        expandedRowClassName,
      };

      return <CardItem key={Key} {...cardItemProps} />;
    });
  };

  const renderEmpty = () => {
    return (
      <div className="research-empty">
        <img src={noDAtaIcon} />
        <div>暂无数据</div>
      </div>
    );
  };

  return (
    <div className={classNames('research-cardList', className)} style={style}>
      <div className="research-cardList-body">
        {mergedData.length ? renderList() : renderEmpty()}
      </div>
      <div className="research-cardList-footer clearfix">{PaginationNode}</div>
    </div>
  );
};

export default CardList;
