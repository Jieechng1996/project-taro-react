/*
 * @Date: 2022-05-26 16:38:54
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 16:11:38
 * @LastEditors: guojiecheng
 */
import * as types from '../constants'

const initialState = {
    lookupCodeList: null,
}


export default function user(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case types.SET_LOOK_UP_CODE_LIST:
            return {
                ...state,
                lookupCodeList: action.data,
            }
        default:
            return state;
    }
}