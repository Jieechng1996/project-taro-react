/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-03-31 17:29:22
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text, WebView } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
interface Props {
}

interface States {
  router:string
}
export default class Index extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state= {
      router:''
    };
  }
  
  onLoad(options) {
    let params = JSON.parse(decodeURIComponent(options.parmas))
    this.setState({
      router : params.router
    })
  }

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
        <WebView src={this.state.router}/>
      </View>
    );
  }
}
