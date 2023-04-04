/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-13 10:43:41
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtGrid } from "taro-ui";
import { navigateTo } from "@tarojs/taro";
import miniProgram from "../../../common/tool/miniProgram";
interface Props {}

interface States {
  data: Array<any>;
}
export default class Guid extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "404",
          router: "/common/pages/notFound/notFound",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "webView",
          router: "https://www.baidu.com",
          type: "thridWeb"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "登录",
          router: "/packageDemo/demo/login/login",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "时间选择",
          router: "/packageDemo/demo/timePicker/timePicker",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "地址选择",
          router: "/packageDemo/demo/areaPicker/areaPicker",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "快码选择",
          router: "/packageDemo/demo/lookupCodePicker/lookupCodePicker",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "列表",
          router: "/packageDemo/demo/scrollList/scrollList",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "侧边栏搜索",
          router: "/packageDemo/demo/sideSearchModal/sideSearchModal",
          type: "wechat"
        },
        {
          image:
            "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
          value: "日历",
          router: "/packageDemo/demo/calendar/calendar",
          type: "wechat"
        },
      ],
    };
  }
  // onLoad
  onLoad(options) {}

  // onReady
  onReady() {}

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onClick = (item) => {
    miniProgram.webJumpAction({
      type: item.type,
      router: item.router,
    });
  };

  render() {
    return (
      <View className="index">
        <AtGrid data={this.state.data} onClick={this.onClick} />
      </View>
    );
  }
}
