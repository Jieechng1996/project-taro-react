/*
 * @Date: 2022-01-14 09:55:37
 * @Author: guojiecheng
 * @LastEditTime: 2022-06-20 16:25:31
 * @LastEditors: guojiecheng
 */
import { Component } from "react";
import { View, Picker } from "@tarojs/components";
import { AtInput, AtIcon } from "taro-ui";
import dayjs from "dayjs";

import "./timePicker.scss";
import { message } from "../../../common/tool/util";
interface Props {
  title?: string;
  value: string;
  placeholder?: string;
  onChange: Function;
  mode: keyof mode;
  disabled?: boolean;
  start?: string;
  end?: string;
}

interface States {
  range: any;
  dateTimeValue: Array<number>;
  startTimes: number
  endTimes: number
}
interface mode {
  time;
  date;
  dateTime;
  month
}
export default class timePicker extends Component<Props, States> {
  static defaultProps = {
    placeholder: "请选择",
    mode: "date",
    disabled: false,
  };
  // onLoad
  constructor(props: Props) {
    super(props);
    this.state = {
      range: [],
      dateTimeValue: [],
      startTimes: 0,
      endTimes: 0
    };

  }

  onLoad(options) {

  }

  // onReady
  onReady() { }

  componentWillMount() {
    if (this.props.mode === 'dateTime' || this.props.mode === 'month')
      this.initRange()
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  createRange = (startTimes: number, endTimes: number, currentTimes, formatType: string) => {
    let startTime = dayjs(startTimes).valueOf()
    let endTime = dayjs(endTimes).valueOf()
    let currentTime = dayjs(currentTimes).valueOf()
    let start = dayjs(startTimes).valueOf()
    let end = dayjs(endTimes).valueOf()
    switch (formatType) {
      case 'year':
        start = Number(dayjs(startTime).format('YYYY'))
        end = Number(dayjs(endTime).format('YYYY'))
        break;
      case 'month':
        start = Number(dayjs(startTime).format('MM'))
        end = Number(dayjs(endTime).format('MM'))
        if (currentTime > startTime && currentTime < endTime) {
          if (endTime > dayjs(currentTime).endOf('year').valueOf()) {
            end = 12
          }
          if (startTime < dayjs(currentTime).startOf('year').valueOf()) {
            start = 1
          }
        }

        break;
      case 'day':
        start = Number(dayjs(startTime).format('DD'))
        end = Number(dayjs(endTime).format('DD'))
        if (currentTime > startTime && currentTime < endTime) {
          if (endTime > dayjs(startTime).endOf('month').valueOf()) {
            end = Number(dayjs(currentTime).endOf('month').format("DD"))
          }
          if (startTime < dayjs(currentTime).startOf('month').valueOf()) {
            start = 1
          }
        }

        break;
      case 'hour':
        start = Number(dayjs(startTime).format('HH'))
        end = Number(dayjs(endTime).format('HH'))
        if (currentTime > startTime && currentTime < endTime) {
          if (endTime > dayjs(currentTime).endOf('day').valueOf()) {
            end = 23
          }
          if (startTime < dayjs(currentTime).startOf('day').valueOf()) {
            start = 0
          }
        }
        break;
      case 'minute':
        start = Number(dayjs(startTime).format('mm'))
        end = Number(dayjs(endTime).format('mm'))
        if (currentTime > startTime && currentTime < endTime) {
          if (endTime > dayjs(currentTime).endOf('hour').valueOf()) {
            end = 59
          }
          if (startTime < dayjs(currentTime).startOf('hour').valueOf()) {
            start = 0
          }
        }

        break;
    }
    let arr: Array<string> = []
    for (let i = start; i <= end; i++) {
      let item = i.toString()
      arr.push(item[1] ? item : '0' + item)
    }
    return arr
  }
  getTimeIndex = (value: string, array: Array<string>) => {
    let index = array.findIndex(item => item === value)
    if (index === -1) {
      return 0
    } else {
      return index
    }
  }
  getDateTimeFormat(dateTimeValue, currentRange?: Array<Array<number>>) {
    let range = currentRange || this.state.range
    let timeArr: Array<string> = []
    for (let i = 0; i < dateTimeValue.length; i++) {
      timeArr.push(range[i][dateTimeValue[i]])
    }
    if(this.props.mode === 'month'){
      return [timeArr[0], timeArr[1]].join('-')
    }else{
      return [timeArr[0], timeArr[1], timeArr[2]].join('-') + ' ' + [timeArr[3], timeArr[4]].join(':')
    }
    

  }

  initRange = () => {
    let currentYear = Number(dayjs().format('YYYY'))
    let startTimes = this.props.start ? dayjs(this.props.start).valueOf() : dayjs().subtract(20, 'years').startOf('year').valueOf()
    let endTimes = this.props.end ? dayjs(this.props.end).valueOf() : dayjs().add(20, 'years').endOf('year').valueOf()
    let currentTimes = dayjs().valueOf()
    if (endTimes < startTimes) {
      message.alert('结束时间小于起始时间', 'error')
      startTimes = dayjs().subtract(20, 'years').startOf('year').valueOf()
      endTimes = dayjs().add(20, 'years').endOf('year').valueOf()
    }
    currentTimes = startTimes >= currentTimes ? startTimes : currentTimes
    currentTimes = endTimes <= currentTimes ? endTimes : currentTimes
    this.setState({
      startTimes,
      endTimes,
      
    })
    if(this.props.mode === 'dateTime'){
      this.setState({
        range: [
          this.createRange(startTimes, endTimes, currentTimes, 'year'),
          this.createRange(startTimes, endTimes, currentTimes, 'month'),
          this.createRange(startTimes, endTimes, currentTimes, 'day'),
          this.createRange(startTimes, endTimes, currentTimes, 'hour'),
          this.createRange(startTimes, endTimes, currentTimes, 'minute')
        ],
        dateTimeValue: [
          this.getTimeIndex(currentYear.toString(), this.createRange(startTimes, endTimes, currentTimes, 'year')),
          this.getTimeIndex(dayjs().format('MM'), this.createRange(startTimes, endTimes, currentTimes, 'month')),
          this.getTimeIndex(dayjs().format('DD'), this.createRange(startTimes, endTimes, currentTimes, 'day')),
          this.getTimeIndex(dayjs().format('HH'), this.createRange(startTimes, endTimes, currentTimes, 'hour')),
          this.getTimeIndex(dayjs().format('mm'), this.createRange(startTimes, endTimes, currentTimes, 'minute')),
        ]
      })
    }
    if(this.props.mode === 'month'){
      this.setState({
        range: [
          this.createRange(startTimes, endTimes, currentTimes, 'year'),
          this.createRange(startTimes, endTimes, currentTimes, 'month'),
        ],
        dateTimeValue: [
          this.getTimeIndex(currentYear.toString(), this.createRange(startTimes, endTimes, currentTimes, 'year')),
          this.getTimeIndex(dayjs().format('MM'), this.createRange(startTimes, endTimes, currentTimes, 'month')),
        ]
      })
    }

  }

  onColumnChange = (event) => {
    console.log(event)
    let range = [...this.state.range]
    let dateTimeValue = this.state.dateTimeValue
    dateTimeValue[event.detail.column] = event.detail.value
    let index = -1
    switch (event.detail.column) {
      case 0:
        range[1] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue, range), 'month');
        index = range[1].findIndex(item => item === this.state.range[1][dateTimeValue[1]])
        if (index !== -1) {
          dateTimeValue[1] = index
        } else {
          dateTimeValue[1] = range[1].length - 1
        }
      case 1:
        // let month = range[0][dateTimeValue[0]] + '-' + range[1][dateTimeValue[1]]
        // if (dateTimeValue[2] > dayjs(month).daysInMonth() - 1) {
        //   dateTimeValue[2] = dayjs(month).daysInMonth() - 1
        // }
        if(!range[2]){
          break
        }
        range[2] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue, range), 'day')
        index = range[2].findIndex(item => item === this.state.range[2][dateTimeValue[2]])
        if (index !== -1) {
          dateTimeValue[2] = index
        } else {
          dateTimeValue[2] = range[2].length - 1
        }
      case 2:
        if(!range[3]){
          break
        }
        range[3] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue, range), 'hour')
        index = range[3].findIndex(item => item === this.state.range[3][dateTimeValue[3]])
        if (index !== -1) {
          dateTimeValue[3] = index
        } else {
          dateTimeValue[3] = range[3].length - 1
        }
      case 3:
        if(!range[4]){
          break
        }
        range[4] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue, range), 'minute')
        index = range[4].findIndex(item => item === this.state.range[4][dateTimeValue[4]])
        if (index !== -1) {
          dateTimeValue[4] = index
        } else {
          dateTimeValue[4] = range[4].length - 1
        }
        break;

    }
    // if (event.detail.column === 0) {

    //   range[1] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue), 'month')
    // }
    // if (event.detail.column === 1) {

    //   let month = range[0][dateTimeValue[0]] + '-' + range[1][dateTimeValue[1]]
    //   if (dateTimeValue[2] > dayjs(month).daysInMonth() - 1) {
    //     dateTimeValue[2] = dayjs(month).daysInMonth() - 1
    //   }
    //   range[2] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue), 'day')
    // }
    // if (event.detail.column === 2) {
    //   range[3] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue), 'hour')
    // }
    // if (event.detail.column === 3) {
    //   range[4] = this.createRange(this.state.startTimes, this.state.endTimes, this.getDateTimeFormat(dateTimeValue), 'minute')
    // }
    this.setState({
      range,
      dateTimeValue
    })

  }

  render() {
    switch (this.props.mode) {
      case 'time':
        return (
          <View>
            <Picker {...this.props} mode="time" onChange={(event) => { this.props.onChange(event.detail.value) }} value='' >
              <AtInput {...this.props} editable={false} name="input" type="text" onChange={() => { }}>
                {!this.props.disabled && (
                  <AtIcon value="chevron-right" size="20" color="#000"></AtIcon>
                )}
              </AtInput>
            </Picker>
          </View>
        );
      case 'date':
        return (
          <View>
            <Picker {...this.props} mode="date" onChange={(event) => { this.props.onChange(event.detail.value); }} value='' >
              <AtInput {...this.props} editable={false} name="input" type="text" onChange={() => { }}>
                {!this.props.disabled && (
                  <AtIcon value="chevron-right" size="20" color="#000"></AtIcon>
                )}
              </AtInput>
            </Picker>
          </View>
        );
      case 'dateTime':
        return (
          <View>
            <Picker
              {...this.props} mode="multiSelector"
              range={this.state.range} onChange={(event) => {
                this.props.onChange(dayjs(this.getDateTimeFormat(event.detail.value)).format('YYYY-MM-DD HH:mm'));
              }}
              value={this.state.dateTimeValue}
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
      case 'month':
        return (
          <View>
            <Picker
              {...this.props} mode="multiSelector"
              range={this.state.range} onChange={(event) => {
                this.props.onChange(dayjs(this.getDateTimeFormat(event.detail.value)).format('YYYY-MM'));
              }}
              value={this.state.dateTimeValue}
              onColumnChange={this.onColumnChange}
            >
              {this.props.children ? (this.props.children) :

                <AtInput {...this.props} editable={false} name="input" type="text" onChange={() => { }}>
                  {!this.props.disabled && (
                    <AtIcon value="chevron-right" size="20" color="#000"></AtIcon>
                  )}
                </AtInput>

              }

            </Picker>
          </View>
        )
    }

  }
}
