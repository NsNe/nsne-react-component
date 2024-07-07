/*
 * @File: 自定义列组件
 * @Author: lintao.wang
 * @Date: 2020-11-10 11:07:23
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-28 11:08:15
 */
import React, { useEffect, useRef, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import classNames from 'classnames';
import ColumnPopover, {
  ColumnType,
  ColumnItem,
  getColumnKey,
} from './ColumnPopover';
import './index.less';
import _ from 'lodash';

export interface SettingColumnProps extends PopoverProps {
  columns?: ColumnType[];
  columnList?: ColumnItem[] | null;
  onChange?: (
    filterColumns: ColumnType[],
    columnList: ColumnItem[],
    columns: ColumnType[],
    init: boolean,
  ) => void;
}

const SettingColumn = (props: SettingColumnProps) => {
  const {
    placement = 'bottomRight',
    trigger = 'click',
    overlayClassName,
    columns = [],
    columnList,
    onVisibleChange,
    visible = false,
    onChange,
    ...restProps
  } = props;

  const [selectedAllList, columnsMap] = React.useMemo(() => {
    let selectedAllState: ColumnItem[] = [];
    let columnMapState: { [index: string]: ColumnType } = {};
    columns.forEach(column => {
      const key = getColumnKey(column);
      selectedAllState.push({
        key,
        title: column.title,
        checked: true,
      });
      columnMapState[key] = column;
    });
    return [selectedAllState, columnMapState];
  }, [columns]);

  const [visibleStatus, setVisibleStatus] = useState<boolean>(visible);

  useEffect(() => {
    if (visibleStatus !== visible) {
      setVisibleStatus(visible);
    }
  }, [visible]);

  const onPopoverVisibleChange = (visible: boolean) => {
    setVisibleStatus(visible);
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  };

  const onCancel = () => {
    onPopoverVisibleChange(false);
  };

  const onSave = (list: ColumnItem[], init = false) => {
    let filterColumns: ColumnType[] = [];
    list.forEach(column => {
      if (column.checked) {
        filterColumns.push(columnsMap[column.key!]);
      }
    });
    if (onChange) {
      onChange(filterColumns, _.cloneDeep(list), columns, init);
    }
    if (visibleStatus) {
      onPopoverVisibleChange(false);
    }
  };

  // 使用全部列进行初始化
  useEffect(() => {
    if (selectedAllList && !columnList) {
      onSave(selectedAllList, true);
    }
  }, [selectedAllList]);

  // 使用 客户端存储的 columList 进行初始化
  useEffect(() => {
    if (columnList?.length) {
      onSave(columnList, true);
    }
  }, []);

  const content = (
    <ColumnPopover
      columnList={!columnList ? selectedAllList : columnList || []}
      visible={visibleStatus}
      onCancel={onCancel}
      onSave={onSave}
    />
  );

  return (
    <>
      <Popover
        content={content}
        title={null}
        placement={placement}
        trigger="click"
        {...restProps}
        overlayClassName={classNames(
          'research-settingColumn-overlay',
          overlayClassName,
        )}
        onVisibleChange={onPopoverVisibleChange}
        visible={visibleStatus}
      >
        <SettingOutlined className="research-settingColumn-icon" />
      </Popover>
    </>
  );
};

export default SettingColumn;
