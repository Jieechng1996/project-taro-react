/*
 * @Date: 2022-01-13 17:22:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-13 11:00:34
 * @LastEditors: guojiecheng
 */
export default {
  pages: ["pages/index/index"],
  subpackages: [
    {
      root: "packageDemo",
      pages: [
        "demo/login/login","demo/grid/grid","demo/timePicker/timePicker",
        "demo/areaPicker/areaPicker","demo/lookupCodePicker/lookupCodePicker",
        "demo/scrollList/scrollList","demo/sideSearchModal/sideSearchModal",
        "demo/calendar/calendar"],
    },
    {
      root: "common",
      pages: ["pages/notFound/notFound","pages/webView/webView"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
