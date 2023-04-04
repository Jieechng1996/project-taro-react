/*
 * @Date: 2022-02-24 17:28:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-02 19:32:09
 * @LastEditors: guojiecheng
 */
import commonApi from '../../common/config/api'

import { host } from './../../common/config/platform'

let baseServer = host + '/api/baseServer'

let api = {
    findStoreInfoPagination: baseServer + '/baseInvStoreTService/findStoreInfoPagination'
}


export default {
    ...commonApi,
    ...api
}