/*
 * @Date: 2022-05-26 16:36:00
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 16:11:00
 * @LastEditors: guojiecheng
 */
import { setStorageSync } from "@tarojs/taro";
import * as types from '../constants'
// 缓存用户信息
export function setLookupCodeListCache(data) {
    setStorageSync('lookupCodeList', data)
    return {
        type: types.SET_LOOK_UP_CODE_LIST,
        data
    }
}