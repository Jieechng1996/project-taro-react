/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-29 15:56:04
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { LookupCodePicker } from "../../../common/components/index"
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

  onChange(data){
    this.setState({
      value:data.value
    })
  }

  render() {
    return (
      <View className="index">
        <LookupCodePicker title="快码选择" lookupType="YES_OR_NO" systemCode="PUBLIC" onChange={(data)=>{this.onChange(data)}}  value={this.state.value} clear={true}
          onClear={()=>{ this.setState({
            value:''
          }) }}
        ></LookupCodePicker>
        <LookupCodePicker title="随意选择" onChange={(data)=>{this.onChange(data)}}  value={this.state.value} optionList={[{'code':'1','value':'测试'}]}></LookupCodePicker>       
      </View>
    );
  }
}
