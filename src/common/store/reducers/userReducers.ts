/*
 * @Date: 2022-05-26 16:38:54
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 17:09:52
 * @LastEditors: guojiecheng
 */
import * as types from '../constants'

const initialState = {
    userInfo: null,
    orgId: null,
    respId: null,
    certificate: null
}


export default function user(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.data,
                certificate: action.data.certificate
            }
        case types.SET_ORG_ID:
            return {
                ...state,
                orgId: action.data,
            }
        case types.SET_RESP_ID:
            return {
                ...state,
                respId: action.data,
            }
        default:
            return state;
    }
}