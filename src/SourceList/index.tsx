/*
 * @File: Panel
 * @Author: lintao.wang
 * @Date: 2020-11-13 14:11:55
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-13 18:44:03
 */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Text } from '../components';
import './index.less';

export interface dataItem {
  name: string;
  fields: {
    name: string; // 字段名
    value?: string;
  }[];
}
export interface SourceListProps {
  className?: string;
  style?: React.CSSProperties;
  data?: dataItem[];
  onItemClick?: (
    item: dataItem,
    index: number,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  renderValue?: (
    item: {
      name: string; // 字段名
      value?: string;
    },
    index: number,
  ) => React.ReactNode;
  layout?: {
    label: string | number;
    value: string | number;
  };
  loading?: boolean;
}

const SourceList = (props: SourceListProps) => {
  const {
    data = [],
    onItemClick,
    className,
    style,
    layout,
    renderValue,
    loading = false,
  } = props;
  const { label: labelWidth = 140, value: valueWidth = 271 } = layout || {};

  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    if (data?.length > 0) {
      setCurrentIndex(0);
    }
  }, [data]);

  const onSwitch = (e: React.MouseEvent, index: number) => {
    setCurrentIndex(index);
    e.stopPropagation();
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const record = data?.[currentIndex];
    if (onItemClick) {
      onItemClick(record, currentIndex, e);
    }
  };

  const renderContent = () => {
    return (
      <div onClick={onClick}>
        {data &&
          data[currentIndex] &&
          data[currentIndex].fields.map((record, index) => {
            const { name, value } = record;
            return (
              <div className="research-sourceList-content-record" key={name}>
                {name && <Text maxWidth={labelWidth}>{name}</Text>}
                <Text maxWidth={valueWidth} type="value">
                  {renderValue ? renderValue(record, index) : value}
                </Text>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className={classNames('research-sourceList', className)} style={style}>
      <div className="research-sourceList-header">
        <span>{data && data[currentIndex] && data[currentIndex].name}</span>
        <div>
          {data?.length > 1 && (
            <>
              <Button
                className="switch"
                type="link"
                disabled={currentIndex <= 0}
                icon={<LeftOutlined />}
                onClick={e => onSwitch(e, currentIndex - 1)}
              />
              {`${currentIndex + 1}/${data?.length}`}
              <Button
                className="switch"
                type="link"
                disabled={currentIndex === data?.length - 1}
                icon={<RightOutlined />}
                onClick={e => onSwitch(e, currentIndex + 1)}
              />
            </>
          )}
        </div>
      </div>
      <Spin spinning={loading}>
        <div className="research-sourceList-content">{renderContent()}</div>
      </Spin>
    </div>
  );
};

export default SourceList;
