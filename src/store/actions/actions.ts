/*
 * @Date: 2022-05-26 17:06:55
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 16:04:29
 * @LastEditors: guojiecheng
 */

import * as user from '../../common/store/action/userAction'

import * as lookupCode from '../../common/store/action/lookupCodeAction'

export const commonAction = { ...user, ...lookupCode }