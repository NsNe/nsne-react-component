import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
  DropResult,
} from 'react-beautiful-dnd';
import { Button, Checkbox } from 'antd';
import _ from 'lodash';
import './index.less';

export interface ColumnType {
  title?: string;
  dataIndex?: string;
  key?: string;
}

export interface ColumnItem extends Pick<ColumnType, 'title' | 'key'> {
  checked?: boolean;
}

interface ColumnContentProps {
  columnList: ColumnItem[];
  onChange: (columnList: ColumnItem[]) => void;
}

export const getColumnKey = (column: ColumnType): string =>
  column.dataIndex || (column.key as string);

const ColumnContent = ({ columnList, onChange }: ColumnContentProps) => {
  const reorder = (
    list: Iterable<any> | ArrayLike<any>,
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const list = reorder(
      columnList,
      result.source.index,
      result.destination.index,
    );
    onChange(list);
  };

  const onCheckedChange = (
    item: ColumnType,
    index: number,
    checked: boolean,
  ) => {
    columnList[index].checked = checked;
    onChange(Array.from(columnList));
  };

  /** 列表容器渲染 style */
  const containerStyle = {
    maxHeight: 375,
    padding: 8,
    overflow: 'hidden auto',
  };

  /** 单个列表项渲染 style */
  const getItemStyle = ({ isDragging, draggingOver }: any) => {
    return {
      width: 216,
      marginBottom: 0,
      padding: '5px 8px',
      boxShadow: isDragging
        ? '0 3px 6px 0 rgba(0,0,0,0.12), 0 5px 12px 4px rgba(0,0,0,0.09)'
        : 'none',
      background: isDragging ? 'rgba(255,255,255,0.90)' : '#fff',
      outline: 0,
      display: 'flex',
      justifyContent: 'space-between',
    };
  };

  /** 拖拽鼠标样式渲染 */
  const getDraggableStyle = (
    snapshot: DraggableStateSnapshot,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  ): CSSProperties => {
    // rest mode
    let cursor = 'auto';

    return {
      ...draggableStyle,
      cursor,
      pointerEvents: 'auto',
    };
  };

  const renderItem = (column: ColumnItem, index: number) => (
    <Draggable
      draggableId={getColumnKey(column)}
      index={index}
      key={getColumnKey(column)}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDraggableStyle(snapshot, provided.draggableProps.style)}
        >
          <div style={getItemStyle(snapshot)}>
            <Checkbox
              checked={column.checked}
              style={{ marginRight: 8 }}
              className="research-settingColumn-checkbox"
              onChange={e => onCheckedChange(column, index, e.target.checked)}
            >
              <span
                title={column.title}
                className="research-settingColumn-checkbox-title"
              >
                {column.title}
              </span>
            </Checkbox>
            <span className="research-settingColumn-moveEle"></span>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={containerStyle}
            >
              {columnList.map((column, index: number) =>
                renderItem(column, index),
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export interface ColumnPopoverProps {
  columnList?: ColumnItem[];
  onCancel?: () => void;
  onSave?: (list: ColumnItem[]) => void;
  visible?: boolean;
}

const ColumnPopover = ({
  columnList,
  visible,
  onCancel: propsOnCancel,
  onSave: propsOnSave,
}: ColumnPopoverProps) => {
  const [list, setList] = useState<ColumnItem[]>(columnList || []);
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const cloneListRef = useRef<ColumnItem[]>();

  // 如果有传递调整后的列，则根据此渲染自定义列列表
  useEffect(() => {
    if (columnList) {
      onColumnChange(_.cloneDeep(columnList));
      // 用于重置的数据list
      cloneListRef.current = _.cloneDeep(columnList);
    }
  }, [columnList]);

  // 重新打开 popover，则根据上次保存的数据进行重置，兼容点击空白处关闭弹框的情况
  useEffect(() => {
    if (visible) {
      const cloneList = _.cloneDeep(cloneListRef.current);
      onColumnChange(cloneList!);
    }
  }, [visible]);

  const onCheckAllChange = (e: {
    target: { checked: React.SetStateAction<boolean> };
  }) => {
    setList(
      e.target.checked
        ? list.map(item => ({ ...item, checked: true }))
        : list.map(item => ({ ...item, checked: false })),
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onColumnChange = (value: ColumnItem[]) => {
    setList(value);
    const checkedList = value.filter(item => item.checked);
    setIndeterminate(!!checkedList.length && checkedList.length < list.length);
    setCheckAll(checkedList.length === list.length);
  };

  const onReset = () => {
    const resetList = _.cloneDeep(cloneListRef.current!);
    onColumnChange(resetList);
  };

  const onCancel = () => {
    onReset();
    if (propsOnCancel) {
      propsOnCancel();
    }
  };

  const onSave = () => {
    cloneListRef.current = _.cloneDeep(list);
    if (propsOnSave) {
      propsOnSave(list);
    }
  };

  return (
    <>
      <div className="research-settingColumn-header">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          className="research-settingColumn-checkbox"
        >
          列展示
        </Checkbox>
        <a onClick={onReset}>重置</a>
      </div>
      <ColumnContent
        columnList={list}
        onChange={value => onColumnChange(value)}
      ></ColumnContent>
      <div className="research-settingColumn-footer">
        <Button
          size="small"
          className="research-settingColumn-footer-cancelBtn"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          type="primary"
          size="small"
          className="research-settingColumn-footer-saveBtn"
          onClick={() => onSave()}
        >
          保存
        </Button>
      </div>
    </>
  );
};

export default ColumnPopover;
