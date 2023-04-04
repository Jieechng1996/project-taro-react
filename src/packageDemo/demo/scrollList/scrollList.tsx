/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-02 20:29:27
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
import { ScrollList } from "../../../common/components/index"
import api from "../../../config/api/api"


interface Props {
}

interface States {
  params: any,
  list: Array<any>
}
export default class Index extends Component<Props, States>  {
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      params: {
        url: api.findStoreInfoPagination,
        param: {
          orgId: 82,
          excludeStoreCodeField: "EXCLUDE_STORE_GUIDER"
        },
        type: 'O'
      },
      list: []
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

  onLoadComplete = (list) => {
    this.setState({
      list
    })
  }

  render() {
    return (
      <View className="index">
        <ScrollList api={api.auSaService_transferSaController} params={this.state.params} postMethod='v1' onLoadComplete={this.onLoadComplete}>
          <View>
            {
              this.state.list.map((item) => 
                <View>
                  <View >{item.storeCode}</View>
                  <View >{item.storeName}</View>
                </View>
              )
            }
          </View>
        </ScrollList>
      </View>
    );
  }
}
