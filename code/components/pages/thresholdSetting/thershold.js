/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-10-23 17:53:25
 * @Last Modified by: 谢海龙 / Jamesxiehailong
 * @Last Modified time: 2017-11-06 11:43:03
 */

import React from 'react'
import {Input, Button, message} from 'antd'
import ControlPanel from '../../common/ControlPanel/ControlPanel'
import Head from 'next/head'
import {ctx} from '../../../public/scripts/golbalStatic'
import mdAjax  from "../../utils/md-service/md-ajax"
import scss from './style/index.scss'

export default class Thershold extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      maxValues: props.maxDefaultValues,
      minValues: props.minDefaultValues,
      buttonDisabled: true,
      isMaxChanged: false,
      isMinChanged: false
    }
    this.currentMaxValues = this.props.maxDefaultValues
    this.currentMinValues = this.props.minDefaultValues
    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.confirmClick = this.confirmClick.bind(this)
  }
  onChangeHandle (e, t) {
      this.setState({
        [t]: e.target.value
      }, () => {
        this.setState({buttonDisabled: (this.currentMaxValues === this.state.maxValues && this.currentMinValues === this.state.minValues)})
      })
  }
  confirmClick () {
    const {minValues,maxValues} = this.state;
    const {equipTypeId} = this.props;
    mdAjax.put(`${ctx}threshold.action`,{
      equipTypeId:parseFloat(equipTypeId),
      maxValue:parseFloat(maxValues),
      minValue:parseFloat(minValues)
    }).then((data)=>{
      if(data.status === true)
          message.success('修改成功')
      else{
        message.error('发生了错误')
      }
    }).catch((e)=>{
      message.error(e.message)
    })

    this.setState({buttonDisabled: true})
    this.currentMaxValues = this.state.maxValues
    this.currentMinValues = this.state.minValues
  }
  render () {
    const {cardTitle, cardExtra, maxDefaultValues, minDefaultValues} = this.props
    const {maxValues, minValues, buttonDisabled} = this.state
    const title = <div className='card-head'>
      <span className='card-title'>{cardTitle}</span>
      <span className='card-extra'>{`单位：${cardExtra}`}</span>
    </div>
    return (
      <div className='slider'>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
        <ControlPanel title={title}>
          <div className='card-input-border'>
            <span>最大值：</span><Input defaultValue={maxDefaultValues} value={maxValues} onChange={(e) => { this.onChangeHandle(e, 'maxValues') }} className='card-input card-input-max' />
            <span>最小值：</span><Input defaultValue={minDefaultValues} value={minValues} onChange={(e) => { this.onChangeHandle(e, 'minValues') }} className='card-input' />
          </div>
          <div className='card-button-border'>
            <Button type={buttonDisabled ? 'default' : 'primary'} className='card-button card-button-confirm' onClick={this.confirmClick} disabled={buttonDisabled}>确定</Button>
            <Button className='card-button card-button-cancel'>取消</Button>
          </div>
        </ControlPanel>
      </div>
    )
  }
}
Thershold.defaultProps = {
  cardTitle: '氨氮',
  cardExtra: 'mg/L',
  maxDefaultValues: '',
  minDefaultValues: ''
}
