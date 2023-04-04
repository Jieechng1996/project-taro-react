/*
 * @Date: 2022-01-13 17:22:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 17:29:18
 * @LastEditors: guojiecheng
 */
import { Component } from 'react'
import './app.scss'
import { Provider } from 'react-redux'

import store from './store/index'
import { commonAction } from './store/actions/actions'
import { getStorageSync } from '@tarojs/taro'

class App extends Component {

  componentDidMount() {
    let userInfo:any = getStorageSync('userInfo')
    let lookupCodeList = getStorageSync('lookupCodeList') || []
    store.dispatch(commonAction.setLookupCodeListCache(lookupCodeList))
    store.dispatch(commonAction.initUserInfo(userInfo)) // ts报错，却能正常执行？
    console.log(store.getState())
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
