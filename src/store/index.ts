/*
 * @Date: 2022-05-26 16:40:45
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 14:16:03
 * @LastEditors: guojiecheng
 */
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers/reducers'

const store = createStore(rootReducer,applyMiddleware(thunk,logger))

export default store