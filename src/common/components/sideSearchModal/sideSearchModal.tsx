/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-13 09:45:37
 * @LastEditors: guojiecheng
 */
import { Component, createRef } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtDrawer, AtIcon, AtSearchBar, AtRadio, AtCheckbox } from 'taro-ui'
import { ScrollList } from "../index";
import { navigateTo, redirectTo } from "@tarojs/taro";
import { getScrollHeight } from '../../tool/util'
import './sideSearchModal.scss'
interface Props {
  title?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onClear?: Function;
  clear?: boolean;
  params?: object;
  pageSize?: string;
  autoRequest?: boolean;
  api: string;
  postMethod?: keyof postMethod;
  radioType?: keyof radioType;
  searchKey?: {
    key: string,
    placeholder?: string
  }
  keys: {
    key: string
    value: string
    desc?: string
  };
  onConfirm?: Function
  onCancel?: Function
  right:boolean
}

interface postMethod {
  v0,
  v1
}
interface radioType {
  radio,
  checkbox
}
interface States {
  show: boolean,
  searchValue: string
  value: string,
  optionList: Array<any>
  listHeight: string,
  params: any,
  selectedList: Array<any>
}
export default class SearchModal extends Component<Props, States>  {
  // onLoad
  static defaultProps = {
    placeholder: "请选择",
    clear: false,
    onClear: () => { },
    params: {},
    radioType: 'radio',
    autoRequest: true,
    onConfirm: () => { },
    onCancel: () => { },
    right: true
  };
  listRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      searchValue: '',
      value: '',
      optionList: [],
      listHeight: '1000',
      params: {},
      selectedList: []
    };
    this.listRef = createRef()
  }



  onLoad(options) { }

  // onReady
  onReady() { }

  componentWillMount() { }

  componentDidMount() {
    this.setState({
      params: this.props.params
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  showModal = () => {
    let _this: any = this
    if (!this.props.disabled)
      this.setState({
        show: true
      }, () => {
        setTimeout(() => {
          getScrollHeight({
            selector: 'header,footer',
            component: _this.$scope
          }).then((res: any) => {
            console.log(res)
            this.setState({
              listHeight: res.heightPx
            })
          })
        }, 500)

      })
  }

  hideModal = () => {
    this.setState({
      show: false
    })
  }

  onLoadComplete = (list) => {
    list.map(item => {
      item.label = item[this.props.keys.value]
      item.value = item[this.props.keys.key]
      item.desc = item[this.props.keys.desc || '']
    })
    this.setState({
      optionList: list
    })
  }

  onClick = (value) => {
    this.setState({
      value
    })
  }

  handleChange = (value) => {
    this.setState({
      selectedList: value
    })
  }

  onChange = (value) => {
    this.setState({
      searchValue: value
    })
  }


  onActionClick = () => {
    let params = {
      ...this.props.params,
    }
    let key = this.props.searchKey?.key
    if (key) {
      params[key] = this.state.searchValue
    }
    this.setState({
      params
    }, () => {
      this.listRef.current.getFirstList()
    })
  }

  onCancel = () => {
    this.setState({
      show: false
    })
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel()
    }
  }
  onConfirm = () => {
    this.setState({
      show: false
    })
    if (typeof this.props.onConfirm === 'function') {
      if (this.props.radioType === 'radio') {
        let item: object = this.state.optionList.find(item => item[this.props.keys.key] === this.state.value)
        this.props.onConfirm(item)
      }
      if (this.props.radioType === 'checkbox') {
        console.log(this.state.optionList)
        console.log(this.state.selectedList)
        let list: Array<any> = this.state.optionList.filter(item => this.state.selectedList.indexOf(item[this.props.keys.key]) !== -1)
        this.props.onConfirm(list)
      }
    }
  }

  render() {
    return (
      <View className="index">
        <View className="at-input self-picker">
          <View className="at-input__container at-input--disabled" style={{ flex: 1 }} onClick={this.showModal}>
            <label className="at-input__title false" >{this.props.title}</label>
            <input className="at-input__input" placeholder={this.props.placeholder} placeholder-class="placeholder" value={this.props.value} disabled  ></input>
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
        <View>
          <AtDrawer
            show={this.state.show}
            mask
            right={this.props.right}
            onClose={this.hideModal}
          >
            <View className='drawer-item' id="header">
              {this.props.searchKey && (<AtSearchBar
                value={this.state.searchValue}
                placeholder={this.props.searchKey.placeholder}
                onChange={this.onChange}
                onActionClick={this.onActionClick}
                showActionButton={true}
              />)}
            </View>
            <View>
              <ScrollList {...this.props} onLoadComplete={this.onLoadComplete} listHeight={this.state.listHeight}
                ref={this.listRef} params={this.state.params}
              >
                {this.props.radioType === 'radio' && (
                  <AtRadio
                    options={this.state.optionList}
                    value={this.state.value}
                    onClick={this.onClick}
                  />
                )}
                {this.props.radioType === 'checkbox' && (
                  <AtCheckbox
                    options={this.state.optionList}
                    selectedList={this.state.selectedList}
                    onChange={this.handleChange}
                  />
                )}
              </ScrollList>
            </View>
            <View id="footer" className="footer">
              <AtButton type='secondary' size="small" onClick={this.onCancel}>取消</AtButton>
              <AtButton type='primary' size="small" onClick={this.onConfirm}>确定</AtButton>
            </View>
          </AtDrawer>
        </View>
      </View>
    );
  }
}
