/*
 * @Date: 2022-01-19 17:37:02
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-13 10:09:32
 * @LastEditors: guojiecheng
 */

import message from "./message";
import Taro, {
  getApp,
  createSelectorQuery,
  getSystemInfoSync,
  canvasToTempFilePath,
} from "@tarojs/taro";
import { host } from '../config/platform'
import drawQrcode from "weapp-qrcode";
const app = getApp();

const bd09togcj02 = (bd_lon, bd_lat) => {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let x = bd_lon - 0.0065;
  let y = bd_lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let longitude = z * Math.cos(theta);
  let latitude = z * Math.sin(theta);
  return {
    longitude,
    latitude,
  };
};

const getScrollHeight = ({
  selector = "id", //可传多个
  component,
}) => {
  const systemInfo = getSystemInfoSync()
  const pxToRpxScale = 750 / systemInfo.windowWidth;
  let query;
  if (component) {
    query = createSelectorQuery().in(component)
  } else {
    query = createSelectorQuery();
  }
  //let query = wx.createSelectorQuery()
  let selectorArr = selector.split(",");
  query.selectViewport().scrollOffset();
  for (let i = 0; i < selectorArr.length; i++) {
    query.select("#" + selectorArr[i]).boundingClientRect();
  }
  return new Promise((resolve, reject) => {
    try {
      query.exec((res) => {
        let selectorHetight = 0;
        for (let i = 1; i < res.length; i++) {
          selectorHetight += res[i] ? res[i].height : 0;
        }
        let windowHeight = getSystemInfoSync().windowHeight;
        let obj: any = {
          res,
          pxToRpxScale,
          heightPx: windowHeight - selectorHetight ,
          height: (windowHeight - selectorHetight) * pxToRpxScale,
        }
        resolve(obj);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};



const urlToQrcode = ({ id = "myQrcode", text = host }) => {
  const query = createSelectorQuery();
  return new Promise((resolve, reject) => {
    query
      .select("#" + id)
      .fields({
        node: true,
        size: true,
      })
      .exec(async (res) => {
        var canvas = res[0].node;
        let qrCodeOption = {
          canvas: canvas,
          canvasId: id,
          background: "#ffffff",
          foreground: "#000000",
          width: 200,
          height: 200,
          text: text,
          callback: () => {
            canvasToTempFilePath({
              canvasId: id,
              canvas: canvas,
              width: 200,
              height: 200,
              success(res) {
                resolve(res.tempFilePath);
              },
              fail(res) {
                reject(res.errMsg)
                console.log(res.errMsg);
              },
            });
          },
        };
        // 调用方法drawQrcode生成二维码
        drawQrcode(qrCodeOption);
      });
  });
};
export {
  message,
  getScrollHeight,
  formatNumber,
  bd09togcj02,
  urlToQrcode,
};
