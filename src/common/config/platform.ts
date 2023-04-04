/*
 * @Date: 2022-01-01 15:56:08
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-25 17:09:19
 * @LastEditors: guojiecheng
 */

import { getEnv } from "@tarojs/taro";

declare var WEB_TYPE: any;

declare var WEB_TYPE: any;
declare var WEB_HOST: any;

console.log(WEB_TYPE);

let appHead;

switch (WEB_TYPE) {
  case "uat":
  case "dev":
  case "test":
    appHead = WEB_HOST + "/allnutriaapp/";
    break;
  case "production":
    appHead = WEB_HOST + "/allnutriaH5/";
    break;
}
//appHead = 'http://127.0.0.1:8081/'
// export default {
//   wxApp_login_mini: appHead + "#/login_mini/",
//   imagePath: appHead + "static/",
//   host: WEB_HOST,
// };
export const wxApp_login_mini = appHead + '#/login_mini/'
export const imagePath = appHead + 'static/'
export const host = WEB_HOST
export const webPath = WEB_HOST + ''
export const env = getEnv()