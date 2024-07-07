/*
 * @File: 通过方法调用的 modal
 * @Author: lintao.wang
 * @Date: 2020-11-11 17:59:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-07-07 17:05:41
 */
import React from 'react';
import { Modal as AntdModal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal/Modal';
import destroyFns from 'antd/lib/modal/destroyFns';
import ReactDOM from 'react-dom';
import { getConfirmLocale } from 'antd/lib/modal/locale';
import classNames from 'classnames';
import './index.less';

let defaultRootPrefixCls = 'ant';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

let Modal: typeof AntdModal & {
  open?: (
    props: ModalFuncProps,
  ) => {
    destroy: () => void;
    update: (configUpdate: ConfigUpdate) => void;
  };
} = AntdModal;

const open = (config: ModalFuncProps) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({
    okText,
    cancelText,
    prefixCls,
    content,
    className,
    ...props
  }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      const runtimeLocale = getConfirmLocale();
      ReactDOM.render(
        <AntdModal
          {...props}
          prefixCls={prefixCls || `${getRootPrefixCls()}-modal`}
          rootPrefixCls={getRootPrefixCls()}
          okText={
            okText ||
            (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText)
          }
          cancelText={cancelText || runtimeLocale.cancelText}
          onCancel={() => close({ triggerCancel: true })}
          className={classNames(className)}
        >
          {content}
        </AntdModal>,
        div,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
};

Modal.open = open;

export default Modal;
