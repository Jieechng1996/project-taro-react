/*
 * @Date: 2022-05-26 17:07:16
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 16:03:28
 * @LastEditors: guojiecheng
 */
import { combineReducers } from 'redux';
import user from '../../common/store/reducers/userReducers';
import lookupCode from '../../common/store/reducers/lookupCodeReducers'
const rootReducer = combineReducers({
  user,
  lookupCode
});

export default rootReducer;