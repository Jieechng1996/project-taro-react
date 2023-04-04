/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-13 09:39:43
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
import { SideSearchModal } from "../../../common/components/index"
import api from "../../../config/api/api"
interface Props {

}

interface States {
  value: string
  params: object
}
export default class Index extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      params: {
        url: api.findStoreInfoPagination,
        param: {
          orgId: 82,
          excludeStoreCodeField: "EXCLUDE_STORE_GUIDER"
        },
        type: 'O'
      },
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

  onChange = () => {

  }

  onLoadComplete = () => { }

  onConfirm = (item) => {
    this.setState({
      value: item.storeName
    })
  }

  onConfirm2 = (list) => {
    let storeName = list.map( item => item.storeName ).toString()
    this.setState({
      value: storeName
    })
  }

  onClear = () => {
    this.setState({
      value:''
    })
  }

  render() {
    return (
      <View className="index">
        <SideSearchModal title="单选" value={this.state.value}
          api={api.auSaService_transferSaController} params={this.state.params} postMethod='v1'
          keys={{ key: 'storeCode', value: 'storeName' }} searchKey={{ key: 'storeCode', placeholder: '请输入' }}
          onConfirm={this.onConfirm}
        ></SideSearchModal>
        <SideSearchModal title="多选" value={this.state.value} radioType="checkbox"
          api={api.auSaService_transferSaController} params={this.state.params} postMethod='v1'
          keys={{ key: 'storeCode', value: 'storeName' }} searchKey={{ key: 'storeCode', placeholder: '请输入' }}
          onConfirm={this.onConfirm2} clear={true} onClear={this.onClear}
        ></SideSearchModal>
        <SideSearchModal title="禁用" value={this.state.value} disabled={true}
          api={api.auSaService_transferSaController} params={this.state.params} postMethod='v1'
          keys={{ key: 'storeCode', value: 'storeName' }} searchKey={{ key: 'storeCode', placeholder: '请输入' }}
          onConfirm={this.onConfirm}
        ></SideSearchModal>
      </View>
    );
  }
}
