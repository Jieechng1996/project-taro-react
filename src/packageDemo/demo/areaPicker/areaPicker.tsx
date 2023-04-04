/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 15:38:19
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AreaPicker } from "../../../common/components/index"
import area from "../../lib/area"
interface Props {
}

interface States {
  value:string
}
export default class Index extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state= {
      value:''
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

  areaChange(data){
    this.setState({
      value:data.value.join('')
    })
  }

  render() {
    return (
      <View className="index">
        <AreaPicker title="地址选择" onChange={(data)=>{this.areaChange(data)}}  value={this.state.value}></AreaPicker>
        <AreaPicker title="地址选择" onChange={(data)=>{this.areaChange(data)}}  value={this.state.value} regionData={area}></AreaPicker>       
      </View>
    );
  }
}
