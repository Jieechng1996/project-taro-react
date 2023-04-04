/*
 * @Date: 2022-02-24 17:28:23
 * @Author: guojiecheng
 * @LastEditTime: 2022-04-28 09:40:05
 * @LastEditors: guojiecheng
 */

import api from '../api/api'

import commonFetch from "../../common/config/fetch";

import httpServer from '../../common/tool/httpServer';

interface Fetch { [propName: string]: any };

let fetch: Fetch = {}

for (let i in api) {
    if (api[i].indexOf('v1') !== -1) {
        fetch[i] = (params: object) => httpServer.postV1(api[i], params)
    } else {
        fetch[i] = (params: object) => httpServer.post(api[i], params)
    }
}
console.log(fetch)

export default {
    ...fetch,
    ...commonFetch
}
