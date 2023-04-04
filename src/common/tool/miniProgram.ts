import message from "./message";
import {
  navigateTo,
  navigateToMiniProgram,
  switchTab,
  canIUse,
  getUpdateManager,
  getAccountInfoSync,
  chooseImage,
  getFileSystemManager,
  getApp,
  login
} from "@tarojs/taro";

import fetch from "../config/fetch";

const app = getApp()

const updateMiniProgram = () => {
  if (canIUse("getUpdateManager")) {
    const updateManager = getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res);
      console.log(getAccountInfoSync());
    });
    updateManager.onUpdateReady(function () {
      message.prompt({
        msg: "新版本已经准备好，是否重启应用？",
        type: "warning",
        title: "更新提示",
        callBack: () => {
          updateManager.applyUpdate();
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      message.prompt({
        msg: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
        type: "warning",
        title: "已经有新版本了哟~",
      });
    });
  } else {
    console.log("获取失败");
  }
};

interface envVersion {
  /** 开发版 */
  develop;
  /** 体验版 */
  trial;
  /** 正式版 */
  release;
}
interface webType {
  /** 普通微信页面 */
  wechat;
  /** tab页面 */
  wechatTab;
  /** 第三方网页 */
  thridWeb;
  /** 第三方小程序 */
  thirdMiniProgram;
  /** 调用函数 */
  function;
}
interface option {
  params?: object;
  router: string;
  type: keyof webType;
  appId?: string;
  envVersion?: keyof envVersion;
  open404?: boolean;
  func?: Function;
}
const webJumpAction = (option: option) => {
  let {
    params = {},
    router,
    type,
    appId = "",
    envVersion = "trial",
    open404 = true,
    func = () => {},
  } = option;
  if (!router && type !== "function") {
    open404
      ? navigateTo({
          url: "/common/pages/notFound/notFound",
        })
      : message.alert("当前功能暂未开放", "error");
    return;
  }
  let requestParams: Array<any> = [];
  for (let i in params) {
    requestParams.push(i + "=" + params[i]);
  }
  if (requestParams.length !== 0) {
    router = router + "?" + requestParams.join("&");
  }
  switch (type) {
    case "wechat":
      navigateTo({
        url: router,
        fail: (res) => {
          console.log(res.errMsg);
          navigateTo({
            url: "/common/pages/notFound/notFound",
          });
        },
      });
      break;
    case "wechatTab":
      switchTab({
        url: router,
        fail: (res) => {
          console.log(res.errMsg);
          navigateTo({
            url: "/common/pages/notFound/notFound",
          });
        },
      });
      break;
    case "thridWeb":
      debugger
      let thridWebParams = {
        router,
      };
      navigateTo({
        url:
          "/common/pages/webView/webView?parmas=" +
          encodeURIComponent(JSON.stringify(thridWebParams)),
      });
      break;
    case "thirdMiniProgram":
      navigateToMiniProgram({
        appId: appId,
        path: router,
        extraData: params,
        envVersion: envVersion,
      });
      break;
    case "function":
      func();
      break;
    default:
      message.alert("当前功能暂未开放", "error");
      break;
  }
};

const uploadImg = async (params: object = {}) => {
  return new Promise((resolve, reject) => {
    chooseImage({
      count: 1,
      success: async (chooseRes) => {
        let base64 = getFileSystemManager().readFileSync(
          chooseRes.tempFilePaths[0],
          "base64"
        );
        let _params = {
          base64Str: base64,
          fileName: "wechat_" + new Date().getTime() + ".jpg",
          ...params,
        };
        let res = await fetch.fileUploadService_base64ImgUpload(_params);
        if (res.status === "S") {
          resolve(res.data);
        } else {
          reject(res);
          message.alert(res.msg);
        }
      },
      fail: (chooseRes) => {
        if (chooseRes.errMsg != "chooseImage:fail cancel") {
          reject(chooseRes);
          message.alert(chooseRes.errMsg, "error");
        }
      },
    });
  });
};

const getLoginMessageByWechat = ({ orgId, grantCode }) => {
  return new Promise(function (resolve, reject) {
    if (app.globalData.loginMessageByWechat) {
      resolve(app.globalData.loginMessageByWechat);
    } else {
      login({
        success: async (res) => {
          let loginRes = await fetch.weChatAppService_weChatAppLogin({
            data: {
              orgId: orgId,
              jsCode: res.code,
              grantCode: grantCode,
            },
          });
          if (loginRes.status === "S") {
            app.globalData.loginMessageByWechat = loginRes.data;
            resolve(loginRes.data);
          } else {
            reject(loginRes.data);
            message.alert(loginRes.msg);
          }
        },
      });
    }
  });
};



export default {
  webJumpAction,
  updateMiniProgram,
  uploadImg,
  getLoginMessageByWechat
};
