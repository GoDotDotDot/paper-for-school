/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-28 14:35:35
 * @Last Modified by: 谢海龙 / Jamesxiehailong
 * @Last Modified time: 2017-11-03 14:24:26
 */

import React from 'react'
import ControlPanel from '../../common/ControlPanel/ControlPanel'
import {Table} from 'antd'

// 解析自动模式下的表格数据
const cutTableData = data => {
  let tableData = []
  if (data === null) {
    return tableData
  } else {
    data[0].week.map((ele, index) => {
      tableData.push({
        'key': index,
        'week': ele,
        'openTime': data[0].openTime[index],
        'closeTime': data[0].closeTime[index]
      })
    })
    return tableData
  }
}
class DeviceStatusPanel extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const columns = [{
      title: '时期',
      dataIndex: 'week',
      key: 'week',
      render: text => <div style={{marginLeft: '15px'}}> <span style={{display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#0599d9', marginRight: '20px'}} />{text}</div>
    }, {
      title: '开启时间',
      dataIndex: 'openTime',
      key: 'openTime'
    }, {
      title: '关闭时间',
      dataIndex: 'closeTime',
      key: 'closeTime'
    }]
    let {num, controlType, mode, status, tableData} = this.props
    return (
      <ControlPanel title={`编号:${num}号`}>
        <p>设备:<span>{`${controlType}`}</span></p>
        <p>模式:<span>{`${mode}`}</span></p>
        <p>状态:<span>{`${mode}模式${status ? '已开启' : '已关闭'}`}</span></p>
        {
            mode === '自动'
            ? <Table dataSource={cutTableData(tableData)} columns={columns} pagination={false} bordered={false} /> : null
          }
      </ControlPanel>

    )
  }
}

export default DeviceStatusPanel
