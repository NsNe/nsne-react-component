/*
 * @File: 通用 table
 * @Author: lintao.wang
 * @Date: 2020-11-05 16:49:20
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-07 14:30:51
 */

import React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';
import classNames from 'classnames';
import ExpandIcon from '../Expand/ExpandIcon';
import './index.less';

const Table = <RecordType extends object = any>(
  props: TableProps<RecordType>,
) => {
  const { className, ...restProps } = props;
  const tableProps = {
    ...restProps,
    expandable: restProps.expandable
      ? {
          expandIcon: ({ expanded, onExpand, record }: any) => (
            <ExpandIcon
              expanded={expanded}
              onClick={e => onExpand(record, e)}
            />
          ),
          ...restProps.expandable,
        }
      : undefined,
  };

  return (
    <AntdTable
      className={classNames('research-table', className)}
      {...tableProps}
    ></AntdTable>
  );
};

export default Table;
