/*
 * @Date: 2021-11-26 14:45:55
 * @Author: guojiecheng
 * @LastEditTime: 2022-04-28 09:40:57
 * @LastEditors: guojiecheng
 */
import httpServer from '../tool/httpServer'
import api from './api'
interface Fetch { [propName: string]: any };
let fetch:Fetch = {}
for(let i in api){
    fetch[i] = (params:object) => httpServer.post(api[i],params)
}

fetch.weChatAppService_weChatAppLogin = (params:object) => httpServer.postV1(api.weChatAppService_weChatAppLogin,params)
fetch.weChatAppService_dataCrypt = (params:object) => httpServer.postV1(api.weChatAppService_dataCrypt,params)
console.log(fetch)
export default fetch