/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-05-27 15:25:18
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { Base64 } from "js-base64";
import { AtForm, AtInput, AtButton } from "taro-ui";
import fetch from "../../../config/fetch/fetch";
import { commonAction } from "../../../store/actions/actions"
import "./login.scss";
import store from "../../../store/index";

interface Props {
  value: string;
}

interface States {
  value: any;
  formData: { [propName: string]: any };
}

export default class Login extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      formData: {},
    };
  }
  // onLoad
  onLoad(options) { }

  // onReady
  onReady() { }

  componentWillMount() { }

  componentDidMount() { 
    console.log(commonAction)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  btnLogin = (event) => {
    let { userName, password } = this.state.formData;
    fetch.baseLoginService_login({
      userName,
      pwd: Base64.encode(password)

    }).then((res:any) => {
      if(res.status === 'S'){
        store.dispatch(commonAction.setUserInfoCache(res.data))
        console.log(store.getState())
      }else{
        console.log(res)
      }
      
    });
  };

  valueChange = (key: string, event: any) => {
    this.state.formData[key] = event
    this.setState({
      formData: this.state.formData,
    });
  };

  handleChange() { }

  render() {
    return (
      <View className="index p1">
        <View>
          <AtInput
            name="userName"
            title="账号"
            type="text"
            placeholder="请输入账号"
            value={this.state.formData.userName}
            onChange={(event) => {
              this.valueChange("userName", event);
            }}
          />
          <AtInput
            name="password"
            title="密码"
            type="password"
            placeholder="请输入密码"
            value={this.state.formData.password}
            onChange={(event) => {
              this.valueChange("password", event);
            }}
          />
          <View className="mt1">
            <AtButton type="primary" onClick={this.btnLogin}>
              登陆
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
