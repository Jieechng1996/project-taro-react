/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 15:38:29
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { TimePicker } from "../../../common/components/index"
import { AtInput } from 'taro-ui'
interface Props {
}

interface States {
  value: string
}
export default class timePicker extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  onLoad(options) { }

  // onReady
  onReady() { }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  timeChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <View className="index">
        <TimePicker title="日期选择" onChange={this.timeChange} value={this.state.value}></TimePicker>
        <TimePicker title="日期禁用" onChange={this.timeChange} value={this.state.value} disabled={true}></TimePicker>
        <TimePicker title="日期选择" onChange={this.timeChange} value={this.state.value} mode="dateTime" start="2022/05/20 14:02" end="2022/05/20 14:59"></TimePicker>
      </View>
    );
  }
}
