/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-29 15:50:26
 * @LastEditors: guojiecheng
 */
import { Component, createRef } from "react";
import { View, Text, Picker } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtIcon } from "taro-ui";

import "./lookupCodePicker.scss";

import store from '../../../store/index'

import fetch from '../../config/fetch'

import { setLookupCodeListCache } from '../../store/action/lookupCodeAction'
import { Style } from "@tarojs/runtime";

interface Props {
  title?: string;
  value: string;
  placeholder?: string;
  onChange: Function;
  disabled?: boolean;
  lookupType?: string,
  systemCode?: string,
  optionList?: Array<any>,
  rangeKey?: string,
  clear?: boolean,
  onClear?: Function
}

interface States {
  value: string;
  range: Array<any>
}

const { orgId } = store.getState().user


const picker = createRef()

export default class lookupCodePicker extends Component<Props, States> {
  static defaultProps = {
    placeholder: "请选择",
    disabled: false,
    optionList: [],
    rangeKey: 'value',
    clear: false,
    onClear: () => { }
  };
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      range: [],
    };

  }

  onLoad(options) {

  }

  // onReady
  onReady() { }

  componentWillMount() {

  }

  componentDidMount() {

    if (this.props.optionList?.length === 0 && this.props.lookupType) {
      this.getLookupCode()
    } else {
      this.setState({
        range: this.props.optionList || []
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  async getLookupCode() {
    let allList = store.getState().lookupCode.lookupCodeList
    let lookupCodeList = allList.filter(item => item.lookupType === this.props.lookupType && item.systemCode === this.props.systemCode)
    if (lookupCodeList.length === 0) {
      let reviceList = await this.getLookupCodeList()
      let buOrgId = reviceList.find((item) => item.buOrgId)
      if (buOrgId) {
        lookupCodeList = reviceList.filter(item => item.buOrgId == orgId)
      } else {
        lookupCodeList = reviceList
      }
      allList = [...allList, ...lookupCodeList]
      store.dispatch(setLookupCodeListCache(allList))
    }

    lookupCodeList.map((item) => {
      item.value = item.meaning,
        item.code = item.lookupCode
    })
    console.log(picker)
    this.setState({
      range: lookupCodeList
    })
  }
  async getLookupCodeList() {
    let res = await fetch.baseLookupValuesService_findDic({
      lookupType: this.props.lookupType,
      systemCode: this.props.systemCode
    })
    if (res.status === 'S') {
      return res.data
    }
  }


  render() {
    return (
      <View>
        <View className="at-input self-picker">
          <Picker {...this.props} mode="selector" range={this.state.range}
            onChange={(event) => {
              this.props.onChange(this.state.range[event.detail.value])
            }} value={0} style={{ flex: 1 }} >
            <View className="at-input__container at-input--disabled">
              <label className="at-input__title false" >{this.props.title}</label>
              <input className="at-input__input" placeholder={this.props.placeholder} placeholder-class="placeholder" value={this.props.value} disabled ></input>
              {!this.props.disabled && (
                this.props.clear ? !this.props.value &&
                  <View className="at-input__children icon">
                    <AtIcon value="chevron-right" size="16" color="#000"></AtIcon>
                  </View>
                  :
                  <View className="at-input__children icon">
                    <AtIcon value="chevron-right" size="16" color="#000"></AtIcon>
                  </View>
              )
              }

            </View>
          </Picker>
          {!this.props.disabled && this.props.clear && this.props.value && (
            <View className="at-input__children icon" onClick={() => {
              if (typeof this.props.onClear === 'function') {
                this.props.onClear()
              }
            }}>
              <AtIcon value="close" size="16" color="#000"></AtIcon>
            </View>
          )}
        </View>
      </View>
    );

  }
}
