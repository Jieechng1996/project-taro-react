/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-25 13:54:10
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";
import { navigateTo } from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import './notFound.scss'
export default class NotFound extends Component {
  // onLoad
  onLoad(options) {}

  // onReady
  onReady() {}

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="p2 warp">
        <View className="center pb1">
          <AtIcon value="image" size="30" color="#6F6C6D"></AtIcon>
        </View>
        <View className="center">
          此功能暂未开放
        </View>
      </View>
    );
  }
}
