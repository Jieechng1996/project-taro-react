/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 15:53:16
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text, Picker } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtIcon } from "taro-ui";
import "./areaPicker.scss";
import { env } from '../../config/platform'
interface Props {
  title?: string;
  value: string;
  placeholder?: string;
  onChange: Function;
  disabled?: boolean;
  regionData?: Array<any>
}

interface States {
  value: Array<string>;
  range: any;
  dataValue: Array<number>
  provinceList: Array<any>
  cityList: Array<any>
  regionList: Array<any>
}
export default class areaPicker extends Component<Props, States> {
  static defaultProps = {
    placeholder: "请选择",
    regionData: [],
    disabled: false,
  };
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      value: [],
      range: [],
      dataValue: [],
      provinceList: [],
      cityList: [],
      regionList: []
    };

  }

  onLoad(options) {

  }

  // onReady
  onReady() { }

  componentWillMount() {

  }

  componentDidMount() {
    switch (env) {
      case 'WEAPP':
      case 'WEB':
        if (this.props.regionData?.length !== 0) {
          this.initRange()
        }
      default:
        break;
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onColumnChange = (event) => { 
    let dataValue = this.state.dataValue
    dataValue[event.detail.column] = event.detail.value
    switch (event.detail.column) {
      case 0:
        this.createRange('city',event.detail.value);
        dataValue[1] = 0
        break;
      case 1:
        this.createRange('region',event.detail.value);
        dataValue[2] = 0

    }
    // this.setState({
    //   dataValue
    // })
  }


  createRange = (type: string, perentIndex: number = 0) => {
    let provinceList: Array<any> = this.state.provinceList
    let cityList: Array<any> = this.state.cityList
    let regionList: Array<any> = this.state.regionList
    let range = [...this.state.range]
    switch (type) {
      case 'province':
        provinceList = this.props.regionData?.filter((item, index, self) => {
          if (item.code.lastIndexOf('0000') !== -1 && self.findIndex(line => line.code === item.code) === index) {
            return item.value
          }
        }).sort((item1, item2) => item1.code - item2.code) || []
        range[0] = provinceList
      case 'city':
        cityList = this.props.regionData?.filter((item,index,self) => {
          if (
            item.code.lastIndexOf('0000') === -1 && 
            item.code.lastIndexOf('00') !== -1 && 
            item.code.substring(0, 2) === provinceList[perentIndex].code.substring(0, 2) &&
            self.findIndex(line => line.code === item.code) === index
            ) {
            return item.value
          }
        }).sort((item1, item2) => item1.code - item2.code) || []
        range[1] = cityList
        perentIndex = 0
      case 'region':
        regionList = this.props.regionData?.filter((item,index,self) => {
          if ( 
            item.code.substring(0, 4) === cityList[perentIndex].code.substring(0, 4) && 
            self.findIndex(line => line.code === item.code) === index && 
            ![...provinceList,...cityList].some(line => line.code === item.code)
            ) {
            return item.value
          }
        }).sort((item1, item2) => item1.code - item2.code) || []
        range[2] = regionList
    }
    this.setState({
      range:range,
      provinceList,
      cityList,
      regionList
    })
  }

  initRange = () => {
    
    this.setState({
      range:[[],[],[]],
      dataValue:[0,0,0]
    },()=>{
      this.createRange('province')
    })
  }
  render() {
    if (this.props.regionData?.length === 0) {
      return (
        <View>
          <Picker {...this.props} mode="region" onChange={(event) => { console.log(event.detail); this.props.onChange(event.detail) }} regionData={[]} value={[]} >
            <AtInput {...this.props} editable={false} name="input" type="text" onChange={() => { }}>
              {!this.props.disabled && (
                <AtIcon value="chevron-right" size="20" color="#000"></AtIcon>
              )}
            </AtInput>
          </Picker>
        </View>
      );
    } else {
      return (
        <View>
          <Picker
            {...this.props} mode="multiSelector" rangeKey="value"
            range={this.state.range} onChange={(event) => {
              let value = event.detail.value
              this.props.onChange({
                value:[this.state.provinceList[value[0]]?.value,this.state.cityList[value[1]]?.value,this.state.regionList[value[2]]?.value],
                code:[this.state.provinceList[value[0]]?.code,this.state.cityList[value[1]]?.code,this.state.regionList[value[2]]?.code],
              });
            }}
            value={this.state.dataValue}
            onColumnChange={this.onColumnChange}
          >
            <AtInput {...this.props} editable={false} name="input" type="text" onChange={() => { }}>
              {!this.props.disabled && (
                <AtIcon value="chevron-right" size="20" color="#000"></AtIcon>
              )}
            </AtInput>
          </Picker>
        </View>
      )
    }
  }
}
