/*
 * @Date: 2022-05-26 16:36:00
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 17:28:41
 * @LastEditors: guojiecheng
 */
import { setStorageSync } from "@tarojs/taro";
import * as types from '../constants'
// 缓存用户信息
export function setUserInfoCache(data) {
    setStorageSync('userInfo', data)
    return {
        type: types.SET_USER_INFO,
        data
    }
}
export function setOrgIdCache(data) {
    return {
        type: types.SET_ORG_ID,
        data
    }
}

export function setRespIdCache(data) {
    return {
        type: types.SET_RESP_ID,
        data
    }
}

export function initUserInfo(data){
    return (dispatch: any) => {
        let userRespList = data.userRespList || []
        let userResp = userRespList[0] || {}
        let responsibilityId = userResp?.responsibilityId
        let orgId = userResp?.orgBean?.orgId
    
        dispatch(setUserInfoCache(data))
        dispatch(setOrgIdCache(orgId))
        dispatch(setRespIdCache(responsibilityId))
    }
    
}