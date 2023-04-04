/*
 * @Date: 2022-01-19 17:35:11
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 14:17:05
 * @LastEditors: guojiecheng
 */
import {
  request,
  showLoading,
  getApp,
  hideLoading,
  redirectTo,
  switchTab,
  getCurrentPages,
} from "@tarojs/taro";
declare module "md5";
declare module "qs";

import md5 from "js-md5";
import dayjs from "dayjs";
import qs from "qs";
import message, { errCode2CN } from "./message";
import { warn } from './logger'

import store from "../../store/index";

const app = getApp();

export const silencePostV1 = (url: String, params: any = {}) => {
  return postV1(url, params, true)
}

export const post = (url: String, params: any) => {
  return postFunc({ url, params });
}

export const silencePost = (url: String, params: any) => {
  return postFunc({ url, params, silence: true });
}

export const postV1 = (url: String, params: any = {}, silence: boolean = false) => {
  return requestFunc({
    params: {
      ...params,
      pageIndex: params.pageIndex || "1",
      pageSize: params.pageSize || "10",
      pageRows: params.pageRows || "10",
    },
    url,
    silence
  });
}

export const postFunc = ({ params, timeout = 60000, url, silence = false }) => {
  return requestFunc({
    params: qs.stringify({
      params: JSON.stringify(params),
      pageIndex: params.pageIndex || "1",
      pageSize: params.pageSize || "10",
      pageRows: params.pageRows || "10",
    }),
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    timeout,
    url,
    silence,
  });
};

const httpServer = {
  postV1,

  post,

  silencePostV1,

  silencePost,

  postFunc
};



const requestFunc = ({
  params,
  url,
  contentType = "application/json",
  timeout = 60000,
  silence = false,
}) => {
  if (!url) {
    message.alert("url is required");
    return;
  }
  if (!params) {
    message.alert("params is required");
    return;
  }
  return new Promise((resolve, reject) => {
    if (!silence) {
      showLoading({
        title: "加载中",
        mask: true,
      });
    }

    request({
      url: url, //仅为示例，并非真实接口地址。
      data: params,
      header: {
        appsign: getAppSign(),
        "content-type": contentType,
        certificate: store.getState().user.certificate,
      },
      method: "POST",
      timeout: timeout,
      success: (res) => {
        if (!silence) {
          hideLoading();
        }
        if (res.statusCode === 200) {
          switch (res.data.status) {
            case "timeout":
              message.confirm(res.data.msg || "系统超时", "confirm", () => {
                app.globalData.userInfo = {};
                redirectTo({
                  url: app.globalData?.loginPage || "/pages/login/login",
                  fail: () => {
                    switchTab({
                      url: app.globalData?.loginPage || "/pages/login/login",
                      fail: () => {
                        getCurrentPages()[0].onLoad();
                      },
                    });
                  },
                });
              });
              break;
            case "M":
            case "E":
            case "S":
            case "F":
            case "D":
              resolve(res.data);
              break;
            default:
              message.alert(res.data.msg || "未知错误", "warning");
              break;
          }
        } else {
          message.alert(
            errCode2CN({
              code: res.data.statusCode,
              type: "requestErrCode",
              message: res.data.message
            }),
            "warning"
          );
          warn(url, params, res.data.statusCode, errCode2CN({ code: res.data.statusCode, type: "requestErrCode", message: res.data.message }))
        }
      },
      fail: (res) => {
        if (!silence) {
          hideLoading();
        }
        message.alert(res.errMsg || "未知错误", "warning");
        warn(url, params, res.errMsg)
      },
    });
  });
};

const getAppSign = () => {
  let timestamp = dayjs().format("x");
  let timestampArr = timestamp.split("");
  let letter1: number = Number(timestampArr[timestampArr.length - 2]);
  let letter2 = (letter1 % 4) + 1;
  let sum = 0;
  for (var i = 0; i < letter2; i++) {
    sum += Number(timestampArr[i]);
  }
  let num = (sum % 4) + 1;
  let appsign = timestamp;
  for (var i = 0; i < num; i++) {
    appsign = md5(appsign);
  }
  return appsign;
};

export default httpServer
