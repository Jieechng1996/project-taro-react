/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-30 15:05:20
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtIcon } from 'taro-ui'
import { navigateTo } from "@tarojs/taro";
import solarLunar from 'solarLunar';
import TimePicker from "../timePicker/timePicker"
import dayjs from "dayjs"
import './calendar.scss'

interface radioType {
  radio,
  checkbox
}

interface Props {
  month?: string
  current?: string
  renderBlockFunction?: Function
  renderTextFunction?: Function
  onClick?: Function,
  onSelect?: Function
  radioType?: keyof radioType
  onConfirm?: Function
  onCancel?: Function
  showFooter?: boolean
}

interface States {
  value: string
  month: string
  weeks: Array<Array<any>>
  current: string
}
export default class Index extends Component<Props, States>  {
  static defaultProps = {
    radioType: 'radio',
    showFooter: true
  };
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      month: '',
      weeks: [],
      current: ''
    };
  }

  onLoad(options) { }

  // onReady
  onReady() { }

  componentWillMount() {
    this.setState({
      value: this.props.month ? dayjs(this.props.month).format('YYYY年MM月') : dayjs().format('YYYY年MM月'),
      month: this.props.month || dayjs().format('YYYY-MM'),
      current: this.props.current || dayjs().format('YYYY-MM-DD')
    }, () => {
      this.initCalendar()
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  initCalendar = () => {

    let months: Array<any> = []

    let start = dayjs(this.state.month).startOf('month').day(0)

    let end = dayjs(this.state.month).endOf('month').day(6)

    let currentMonth = dayjs(this.state.month)

    let current = dayjs(this.state.current)

    if (current.valueOf() < currentMonth.startOf('month').valueOf()) {
      current = currentMonth.startOf('month')
    }

    if (current.valueOf() > currentMonth.endOf('month').valueOf()) {
      current = currentMonth.endOf('month')
    }

    while (start.valueOf() <= end.valueOf()) {
      let itemCn = solarLunar.solar2lunar(start.year(), start.month() + 1, start.date())
      months.push({
        obj: start,
        day: start.date(),
        date: start.format('YYYY-MM-DD'),
        disabled: start.month() !== currentMonth.month(),
        isActive: start.format('YYYY-MM-DD') === current.format('YYYY-MM-DD'),
        isCurrent: start.format('YYYY-MM-DD') === current.format('YYYY-MM-DD'),
        isSelect: false,
        itemCn,
        dayCn: itemCn.term || (itemCn.lDay === 1 ? itemCn.monthCn : itemCn.dayCn),
      })
      start = start.add(1, 'day')
    }

    let weeks: Array<Array<any>> = []

    let arr: Array<any> = []

    for (let i = 0; i < months.length; i++) {
      arr.push(months[i])
      if (arr.length == 7) {
        weeks.push(arr)
        arr = []
      }
    }
    console.log(weeks)
    this.setState({
      weeks
    })
  }

  lastMonth = () => {
    let current = dayjs(this.state.current).subtract(1, 'month').format('YYYY-MM-DD')
    let last = dayjs(this.state.month).subtract(1, 'month')
    this.setState({
      month: last.format('YYYY-MM'),
      value: last.format('YYYY年MM月'),
      current
    }, () => {
      this.initCalendar()
    })
  }

  nextMonth = () => {
    let current = dayjs(this.state.current).add(1, 'month').format('YYYY-MM-DD')
    let next = dayjs(this.state.month).add(1, 'month')
    this.setState({
      month: next.format('YYYY-MM'),
      value: next.format('YYYY年MM月'),
      current
    }, () => {
      this.initCalendar()
    })
  }

  onClick = (item, lineIndex, index) => {
    if (item.disabled) {
      return
    }
    let weeks = [...this.state.weeks]
    let selectList: Array<any> = []
    if (this.props.radioType === 'radio') {
      weeks.map(line => {
        line.map(item => {
          item.isActive = false
        })
      })
      weeks[lineIndex][index].isActive = true
    }
    if (this.props.radioType === 'checkbox') {
      weeks[lineIndex][index].isSelect = !weeks[lineIndex][index].isSelect

      weeks.map(line => {
        line.map(item => {
          if (item.isSelect) {
            selectList.push(item)
          }
        })
      })
    }

    this.setState({
      current: item.date,
      weeks
    }, () => {
      if (this.props.radioType === 'radio' && typeof (this.props.onClick) === 'function') {
        this.props.onClick(item)
      }
      if (this.props.radioType === 'checkbox' && typeof (this.props.onSelect) === 'function') {
        this.props.onSelect(item)
      }
    })
  }

  resetSelect = () => {
    let weeks = [...this.state.weeks]
    weeks.map(line => {
      line.map(item => {
        item.isSelect = false
      })
    })
    this.setState({
      weeks
    })
    if (typeof (this.props.onCancel) === 'function') {
      this.props.onCancel()
    }
  }

  onConfirm = () => {
    let weeks = [...this.state.weeks]
    let selectList: Array<any> = []
    weeks.map(line => {
      line.map(item => {
        if (item.isSelect) {
          selectList.push(item)
        }
      })
    })
    if (typeof (this.props.onConfirm) === 'function') {
      this.props.onConfirm(selectList)
    }
  }

  onChange = (month) => {
    let date = dayjs(this.state.current).date()
    let current = dayjs(month).date(date).format('YYYY-MM-DD')
    this.setState({
      month: dayjs(month).format('YYYY-MM'),
      value: dayjs(month).format('YYYY年MM月'),
      current
    }, () => {
      this.initCalendar()
    })
  }

  render() {
    return (
      <View>
        <View className="header">
          {!this.props.month && <AtIcon value='chevron-left' className="icon" size='30' color='#6190E8' onClick={this.lastMonth} ></AtIcon>}
          <TimePicker mode="month" value={this.state.value} onChange={this.onChange} disabled={!!this.props.month}>
            <View>{this.state.value}</View>
          </TimePicker>
          {!this.props.month && <AtIcon value='chevron-right' className="icon" size='30' color='#6190E8' onClick={this.nextMonth} ></AtIcon>}
        </View>
        <View className="section">
          <View className="calendar-header">
            <View>日</View>
            <View>一</View>
            <View>二</View>
            <View>三</View>
            <View>四</View>
            <View>五</View>
            <View>六</View>
          </View>
          <View className="calendar-body">
            {
              this.state.weeks.map((line, lineIndex) =>
                <View className="line">{
                  line.map((item, index) => <View className='block' onClick={() => { this.onClick(item, lineIndex, index) }}>
                    {this.props.renderBlockFunction && typeof this.props.renderBlockFunction ?
                      this.props.renderBlockFunction(item) :
                      <View className={['date',
                        item.disabled ? 'disabled' : '',
                        item.isActive && this.props.radioType === 'radio' ? 'active' : '',
                        item.isCurrent && this.props.radioType === 'checkbox' ? 'current' : ''
                      ].join(' ')}>
                        <View>
                          <View>{item.day}</View>
                          <View>{this.props.radioType === 'checkbox' && item.isSelect ?
                            <AtIcon value='check' size='12' color='#6190E8'></AtIcon>
                            : (this.props.renderTextFunction && typeof this.props.renderTextFunction ?
                              this.props.renderTextFunction(item) :item.dayCn)
                            }
                          </View>
                        </View>
                      </View>
                    }
                  </View>)
                }</View>
              )
            }
          </View>
          {this.props.radioType === 'checkbox' && this.props.showFooter && <View className="calendar-footer"  >
            <AtButton type='primary' size='small' onClick={this.onConfirm}>确认</AtButton>
            <AtButton type='secondary' size='small' onClick={this.resetSelect}>清除选择</AtButton>
          </View>}
        </View>
      </View>
    );
  }
}
