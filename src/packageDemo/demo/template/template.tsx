/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-03-31 16:13:49
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
interface Props {
}

interface States {
}
export default class Index extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state= {
    };
  }
  
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
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
