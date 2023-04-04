/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-20 17:03:51
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton ,AtList, AtListItem ,AtCard} from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
import { Calendar } from "../../../common/components/index"
interface Props {
}

interface States {
}
export default class calendar extends Component<Props, States>  {
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

  renderBlockFunction = (item) => {
    return <View className="red">{item.day}</View>
  }

  onConfirm = (list) => {
    console.log(list)
  }

  render() {
    return (
      <View className="index">
        <View className="center">默认</View>
        <Calendar></Calendar>
        <View className="center">checkbox</View>
        <Calendar radioType="checkbox" onConfirm={this.onConfirm} ></Calendar>
        <View className="center">格式化block（所有样式都会失效）</View>
        <Calendar renderBlockFunction={this.renderBlockFunction}></Calendar>
        
      </View>
    );
  }
}
