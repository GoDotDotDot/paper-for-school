/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-28 17:03:30
 * @Last Modified by: 璟睿 / tiramisu18
 * @Last Modified time: 2017-09-28 17:30:02
 */

import React from 'react'
import { Slider, InputNumber, Row, Col } from 'antd'

export default class PopoverContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hourValue: 0,
      minsValue: 0
    }
    this.hourChange = this.hourChange.bind(this)
    this.minsChange = this.minsChange.bind(this)
    this.onOk = this.onOk.bind(this)
    this.cancle = this.cancle.bind(this)
  }
  hourChange (value) {
    this.setState({
      hourValue: value
    })
  }
  minsChange (value) {
    this.setState({
      minsValue: value
    })
  }
  /**
   * 确定按钮点击事件
   */
  onOk () {
    let { hourValue, minsValue } = this.state
    this.props.statusChange(hourValue, minsValue)
  }
  /**
   * 取消按钮点击事件
   */
  cancle () {
    this.props.hide()
  }
  render () {
    return (
      <div>
        <Row>
          <Col span={3}>
            <span style={{ lineHeight: '27px', color: '#108ee9' }}>时:</span>
          </Col>
          <Col span={12}>
            <Slider
              min={0}
              max={20}
              onChange={this.hourChange}
              value={this.state.hourValue}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={20}
              style={{ marginLeft: 10, width: 60 }}
              value={this.state.hourValue}
              onChange={this.hourChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <span style={{ lineHeight: '27px', color: '#108ee9' }}>分:</span>
          </Col>
          <Col span={12}>
            <Slider
              min={0}
              max={60}
              onChange={this.minsChange}
              value={this.state.minsValue}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={60}
              style={{ marginLeft: 10, width: 60 }}
              value={this.state.minsValue}
              onChange={this.minsChange}
            />
          </Col>
        </Row>

        <Row
          style={{
            margin: '10px 0px 0px 0px',
            paddingTop: '15px',
            borderTop: '1px solid #e9e9e9'
          }}
        >
          <span
            onClick={this.onOk}
            style={{
              border: '1px solid #108ee9',
              borderRadius: '3px',
              padding: '3px',
              marginLeft: '55%',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            确认
          </span>
          <span
            onClick={this.cancle}
            style={{
              border: '1px solid #108ee9',
              borderRadius: '3px',
              padding: '3px',
              cursor: 'pointer'
            }}
          >
            取消
          </span>
        </Row>
      </div>
    )
  }
}
