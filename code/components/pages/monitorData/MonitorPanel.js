/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-29 11:29:19
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-10-19 15:37:53
 */

import React from 'react'
import ControlPanel from '../../common/ControlPanel/ControlPanel'
import CirclePanel from 'com_common/CirclePanel'

const MonitorPanel = props => {
  return (
    <ControlPanel title={`${props.title}${props.num}号池`}>
    {
      props.data.map((ele,index)=>{
        return  <CirclePanel key={index} type={ele.status} num={ele.num} unit={ele.unit} name={ele.name}  style={{margin: '13px 15px'}} />
      })
    }
    </ControlPanel>
  )
}

export default MonitorPanel
MonitorPanel.defaultProps = {
  title: '设备间',
  num: 1
}
