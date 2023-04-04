/*
 * @Date: 2022-01-14 15:17:54
 * @Author: guojiecheng
 * @LastEditTime: 2022-04-24 14:17:20
 * @LastEditors: guojiecheng
 */

import { showModal, showToast } from "@tarojs/taro";

import { requestErrCode } from "../map/index";

interface intType {
  confirm;
  warning;
  error;
  success;
}

enum titleEnum {
  confirm = "提示",
  warning = "警告",
  error = "错误",
}

interface option {
  msg: string;
  type?: keyof intType;
  title?: string;
  cancelText?: string;
  callBack?: Function;
  cancelCallBack?: Function;
}

export const prompt = (option: option) => {
  let {
    msg,
    type,
    title,
    cancelText = "取消",
    callBack = () => {},
    cancelCallBack,
  } = option;
  switch (type) {
    case "confirm":
    case "warning":
    case "error":
      showModal({
        title: title || titleEnum[type],
        content: msg,
        showCancel: !!cancelCallBack && typeof cancelCallBack === "function",
        cancelText: cancelText,
        success: function (res) {
          if (res.confirm) {
            if (!!callBack && typeof callBack === "function") callBack();
          } else if (res.cancel) {
            console.log(cancelCallBack);
            if (!!cancelCallBack && typeof cancelCallBack === "function")
              cancelCallBack();
          }
        },
      });
      break;
    case "success":
      showToast({
        title: msg,
        icon: "success",
        duration: 2000,
        mask: true,
      });
      break;
    default:
      showToast({
        title: msg,
        icon: "none",
        duration: 2000,
        mask: true,
      });
      break;
  }
};

export const alert = (msg: string, type?: keyof intType) => {
  return prompt({
    type,
    msg,
  });
};

export const confirm = (
  msg: string,
  type: keyof intType = "confirm",
  callBack?: Function,
  cancelCallBack?: Function
) => {
  return prompt({
    msg,
    type,
    callBack,
    cancelCallBack,
  });
}

export const errCode2CN = ({ type, code ,message}) => {
  switch (type) {
    case "requestErrCode":
      return code + '：' + (requestErrCode[code] || message );
    default:
      return message || "未知错误";
  }
};

export default {
  prompt,
  alert,
  confirm,
};



