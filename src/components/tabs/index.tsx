/*
 * @File: 左右切换的 tab
 * @Author: lintao.wang
 * @Date: 2020-11-16 15:27:13
 * @Last Modified by: lintao.wang
 * @Last Modified time: 2020-11-16 16:24:36
 */
import React from 'react';
import RcTabs, { TabPane, TabsProps } from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import 'rc-tabs/assets/index.css';
import './index.less';

const Tabs = (props: TabsProps) => {
  const iconProps = {
    prevIcon: <img src={require('./img/arrow-left.svg')}></img>,
    nextIcon: <img src={require('./img/arrow-right.svg')}></img>,
  };

  const { className, ...restProps } = props;

  const tabProps = {
    renderTabBar: () => <ScrollableInkTabBar {...iconProps} />,
    renderTabContent: () => <TabContent />,
    ...restProps,
  };

  return (
    <RcTabs {...tabProps} className={classNames('research-tabs', className)} />
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
