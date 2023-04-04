/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-21 09:47:45
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtLoadMore, AtIcon } from 'taro-ui'
import { navigateTo, getSystemInfoSync } from "@tarojs/taro";
import './scrollList.scss'
import httpServer from '../../tool/httpServer'
import message from '../../tool/message'
interface Props {
  params?: object,
  pageSize?: string,
  autoRequest?: boolean
  api: string,
  listHeight?: string
  postMethod?: keyof postMethod
  onLoadComplete?: Function
}

interface postMethod {
  v0,
  v1
}

interface States {
  refreshType: boolean
  list: Array<any>
  page: { [propName: string]: any };
}

export default class ScrollList extends Component<Props, States>  {
  static defaultProps = {
    params: {},
    autoRequest: true,
    listHeight: getSystemInfoSync().windowHeight,
    pageSize: '30',
    postMethod: 'v0',
    onLoadComplete: () => { }
  };
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshType: false,
      list: [],
      page: {
        pageSize: this.props.pageSize
      }
    };
  }

  onLoad(options) { }

  // onReady
  onReady() { }

  componentWillMount() { }

  componentDidMount() {
    if (this.props.autoRequest) {
      this.onRefresherRefresh()
    }

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onRefresherRefresh = () => {
    this.setState({
      refreshType: true
    }, () => {
      this.getFirstList()
    })
  }

  getFirstList = () =>{
    this.getList({
      pageIndex: 1,
      pageSize: this.state.page.pageSize
    })
  }

  getNextList = () => {
    if (this.state.page.count && this.state.page.count !== this.state.list.length) {
      this.getList({
        pageIndex: this.state.page.nextIndex,
        pageSize: this.state.page.pageSize
      })
    }
  }



  async getList({ pageIndex, pageSize }) {
    let res
    let params = {
      ...this.props.params,
      pageIndex,
      pageRows: pageSize,
      pageSize
    }
    if (this.props.postMethod === 'v1') {
      res = await httpServer.postV1(this.props.api, params)
    } else {
      res = await httpServer.post(this.props.api, params)
    }

    if (res.status === 'S') {
      let list = res.data
      this.setState({
        list: res.curIndex > 1 ? [...this.state.list, ...list] : list,
        refreshType: false,
        page: {
          curIndex: res.curIndex,
          nextIndex: res.nextIndex,
          count: res.count,
          pageSize: res.pageSize,
        }
      }, () => {
        if (typeof this.props.onLoadComplete === 'function') {
          this.props.onLoadComplete(this.state.list)
        }
      })
    } else {
      message.alert(res.msg || '操作失败')
    }
  }

  render() {
    return (
      <View className="index">
        <ScrollView
          scrollY
          scrollWithAnimation
          refresherEnabled={true}
          onRefresherRefresh={this.onRefresherRefresh}
          refresherTriggered={this.state.refreshType}
          onScrollToLower={this.getNextList}
          style={{ height: this.props.listHeight + 'px',transition:'all 1s' }}>
        
          <View>
            {this.state.list.length !== 0 && this.props.children}
          </View>
          <View>
            {this.state.page.count && this.state.list.length === this.state.page.count &&
             <AtLoadMore status="noMore"></AtLoadMore>
             }
          </View>
          <View>
            {this.state.list.length === 0 &&
              <View className="warp p2">
                <View className="center pb1">
                  <AtIcon value="image" size="30" color="#6F6C6D"></AtIcon>
                </View>
                <View className="center">
                  暂无数据
                </View>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
