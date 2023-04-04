/*
 * @Date: 2022-04-25 16:24:53
 * @Author: guojiecheng
 * @LastEditTime: 2022-04-27 16:20:00
 * @LastEditors: guojiecheng
 */
import { getRealtimeLogManager, getEnv } from "@tarojs/taro";

declare var WEB_TYPE: any;

// Taro.ENV_TYPE

const logger = getRealtimeLogManager()

let env = getEnv()

WEB_TYPE === 'production'

export const info = (...args: any[]) => {
    if (WEB_TYPE === 'production') {
        switch (env) {
            case 'WEAPP':
                logger.info(args)
                break;
            default:
                console.log(args)
                break;
        }
    } else {
        console.log(args)
    }

}

export const warn = (...args: any[]) => {
    if (WEB_TYPE === 'production') {
        switch (env) {
            case 'WEAPP':
                logger.warn(args)
                break;
            default:
                console.log(args)
                break;
        }
    } else {
        console.log(args)
    }
}

export default {
    info,
    warn
}