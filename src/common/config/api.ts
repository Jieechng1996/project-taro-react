/*
 * @Date: 2021-11-26 14:45:55
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-02 19:25:32
 * @LastEditors: guojiecheng
 */

import { host } from './platform'

let baseServer = host + '/api/baseServer'
let infServer = host + '/api/infServer'
let bpmServer = host + '/api/bpmServer'
let weChatServer = host + '/api/weChatServer'


const api = {
    baseLoginService_login : baseServer + '/baseLoginService/login',
    fileUploadService_base64ImgUpload : baseServer + '/fileUploadService/base64ImgUpload',
    baseLoginService_getVerificationCode :  baseServer + '/baseLoginService/getVerificationCode', //获取验证码
    baseUsersService_getCheckCode :  baseServer + '/baseUsersService/getCheckCode', //获取验证码 忘记密码用
    baseUsersService_passwordReminder :  baseServer + '/baseUsersService/passwordReminder', //修改密码
    weChatAppService_weChatAppLogin :  infServer + '/smp/inside/weChatAppService/v1/weChatAppLogin', //微信登录获取openId
    weChatAppService_dataCrypt :  infServer + '/smp/inside/weChatAppService/v1/dataCrypt' , //微信小程序获取手机号
    baseLookupValuesService_findDic :  baseServer + '/baseLookupValuesService/findDic', //快码查询

    //流程
    bpmTaskService_get :  bpmServer + '/bpmTaskService/get', //流程详情查询
    bpmProcessService_getStartUrl :  bpmServer + '/bpmProcessService/getStartUrl', //流程获取任务信息
    bpmProcessService_findHistoricActivities :  bpmServer + '/bpmHistoryService/findHistoricActivities',//流程获取任务信息
    
    auSaService_transferSaController :  weChatServer + '/auSaService/v1/transferSaController', //中转SA相关接口
}
export default api