/*
 * @Date: 2022-01-13 17:22:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-06 16:58:23
 * @LastEditors: guojiecheng
 */
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { navigateTo } from "@tarojs/taro";
import { wxApp_login_mini } from '../../common/config/platform'
import './index.scss'
export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { 
    console.log(wxApp_login_mini)
    navigateTo({
      url: '/packageDemo/demo/grid/grid',
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
