/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-30 14:20:37
 */

import CusLayout from '../../../studentsLayout.js'
import React from 'react'
import { message, Layout, Table, Tag, Button, Modal, Row, Col, Tooltip,Collapse,Popover  } from 'antd'
import CountDown from 'ant-design-pro/lib/CountDown';
import format from 'date-fns/format'
import io from 'socket.io-client'

import Head from 'next/head'
import { ctx } from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import PageHeader from 'com_common/PageHeader'
import Link from 'next/link'
const { Content, Footer } = Layout
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
const STATUS_COLOR = {
  '未开始': '#108ee9',
  '进行中': '#87d068',
  '已结束': '#f50'
}
const PaperDetail = (r)=>{
  return(
    <Collapse defaultActiveKey={['1']} accordion style={{width:250}}>
    <Panel header='题目简介' key="1">
      <p>{r.brief||'无'}</p>
    </Panel>
    <Panel header="题目需求" key="2">
      <p>{r._require||'无'}</p>
    </Panel>
    <Panel header="预期成果" key="3">
      <p>{r.achieve || '无'}</p>
    </Panel>
  </Collapse>
  )
}
const COL_BASIC = [
  {
    title: '教师姓名',
    dataIndex: 'teacher',
    key: 'teacher'
  },
  {
    title: '职称',
    dataIndex: 'professional',
    key: 'professional'
  },
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '题目来源',
    dataIndex: '_from',
    key: '_from'
  },
  {
    title: '题目类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '社会实践',
    dataIndex: 'hasAction',
    key: 'hasAction'
  },
  {
    title: '专业符合度',
    dataIndex: 'conformity',
    key: 'conformity'
  },
  {
    title: '难度',
    dataIndex: 'degree',
    key: 'degree'
  },
  {
    title: '工作量',
    dataIndex: 'workload',
    key: 'workload'
  },
]

/**
 *  <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
      <Button>Arrow points to center / 箭头指向中心</Button>
    </Tooltip>
 */
const unStartColumns = [
  {
    title: '教师姓名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade'
  }, {
    title: '专业',
    dataIndex: '_master',
    key: '_master'
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime'
  }, {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => <Tag color={STATUS_COLOR[text]}>{text}</Tag>
  }
]
const PageHeaderLeft = (props) => {
  const { teacher, startTime, endTime, status } = props
  console.log('server:',new Date(endTime))
  console.log('client:',new Date())
  const formatCountDown = (time) => {
    const days = 24 * 60 * 60 * 1000
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;
    const d = fixedZero(Math.floor(time / days))
    const h = fixedZero(Math.floor((time - (d * days)) / hours));
    const m = fixedZero(Math.floor((time - (d * days) - (h * hours)) / minutes));
    const s = fixedZero(Math.floor((time - (d * days) - (h * hours) - (m * minutes)) / 1000));
    return `${d}天${h}时${m}分${s}秒`
  }
  const time = () => {
    if (status === '未开始') {
      return ([<span key='time0'>还有：</span>, <CountDown format={time => formatCountDown(time)} key='time1' style={{ fontSize: 14 }} target={new Date(startTime)}></CountDown>])
    } else if (status === '已结束') {
      return (<span >剩余 00:00:00</span>)
    } else if (status === '进行中') {
      return ([<span key='time0'>还剩：</span>, <CountDown format={time => formatCountDown(time)} key='time1' style={{ fontSize: 14 }} target={new Date(endTime)}></CountDown>])
    } else {
      return ''
    }

  }
  return (<div>
    <style jsx global>{`
    .ph-lable{
      font-size:14px;
      color:rgba(0,0,0,0.8);
      margin-bottom:5px
    }
    `}
    </style>
    <Row>
      <Col className='ph-lable' span={12}><span>创建人：</span>{teacher || ''}</Col>
      <Col className='ph-lable' span={12}>{time()}</Col>
    </Row>
    <Row>
      <Col className='ph-lable' span={12}><span>开始时间：</span>{startTime || ''}</Col>
      <Col className='ph-lable' span={12}><span>备注：请在规定时间内选题！选题开始前10分钟显示选题列表</span></Col>
    </Row>
    <Row>
      <Col className='ph-lable'><span>结束时间：</span>{endTime || ''}</Col>
    </Row>
  </div>)
}
const PageHeaderRight = (props) => {
  const { status } = props
  return (<div>
    <span className='ph-lable'>状态：{<Tag color={STATUS_COLOR[status]}>{status}</Tag>}</span>

  </div>)
}
export default class Index extends React.Component {
  static async getInitialProps({ req, pathname }) {
    return { pathname }
  }
  state = {
    selectedRowKeys: [],
    dataSource: [],
    statusPanel: []
  }
  componentDidMount() {
    const selectPaperIo = this.selectPaperIo = io('/gis')
    selectPaperIo.on('receiveActionStatus', (rst) => {
      // 获取选课状态
      if (rst.success) {
        const { data } = rst
        this.setState({ statusPanel: data })
        console.log('状态数据：', data)
      } else {
        message.error(rst.message)
      }
    })
    selectPaperIo.on('actionStart', (dt) => {
      // 抢课开始
      console.log(dt)
    })
    selectPaperIo.on('receivePaperList', (rst) => {
      // 获取选题列表
      if (rst.success) {
        const { data } = rst
        this.setState({ dataSource: data })
        console.log('选课列表：', data)
      } else {
        message.error(rst.message)
      }
    })
    selectPaperIo.on('receiveSelectPaperRst',(rst)=>{
      if (rst.success) {
        Modal.success({
          title: '选题结果',
          content: rst.message,
        });
        // message.success(rst.message)
      } else {
        Modal.warning({
          title: '选题结果',
          content: rst.message,
        });
      }
    })
    selectPaperIo.on('connect', () => {
     message.success('连接服务器成功')
    });
    selectPaperIo.on('connect_error', (err) => {
     message.success('连接服务器失败')
    })

  }
  deleteStudentsHandle = () => {
    const id = this.state.selectedRowKeys
    confirm({
      title: '你确定要删除吗？',
      content: `删除操作为软删除，需要恢复请联系技术支持，联系方式在页面最底部！`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        mdAjax.post(`${ctx}api/teachers/action/delete`, { id })
          .then(rst => {
            if (rst.success) {
              const { dataSource } = this.state
              const dt = dataSource.filter((ele) => {
                return !id.some((_ele) => _ele === ele.id)
              })
              message.success(rst.message)
              this.setState({ dataSource: dt, selectedRowKeys: [] })
            } else {
              message.error(rst.message)

            }
            console.log(rst)
          })
          .catch(err => {
            console.log(err)
            message.success('发生了一点错误：' + err)

          })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  pageHeaderLeft = () => {
    return (<div>
      <Row>
        <Col span={12}>创建人：</Col>
        <Col span={12}>还剩：</Col>
      </Row>
      <Row>
        <Col span={12}>开始时间：</Col>
        <Col span={12}>备注：</Col>
      </Row>
      <Row>
        <Col>结束时间：</Col>
      </Row>
    </div>)
  }
  selecPaper(id){
    this.selectPaperIo.emit('selectPaper',id)
  }
  render() {
    const { pathname } = this.props
    const { selectedRowKeys, statusPanel, dataSource } = this.state

    const COLUMNS = {
      '进行中': [...COL_BASIC,
        {
          title:'学生姓名',
          key:'stuName',
          dataIndex:'stuName'
        },{
        title: '操作',
        key: 'opreator',
        render: (t, r) => {
          return (<Button type="primary" disabled={r.stuNum} onClick={()=>{this.selecPaper(t.id)}}>抢课</Button>)
        }
      }],
      '未开始': [...COL_BASIC, {
        title: '操作',
        key: 'opreator',
        render: (t, r) => {
          return (<Popover content={PaperDetail(r)} title="论文详情" trigger="click" placement="left">
          <Button type="primary">查看详情</Button>
        </Popover>)
        }
      }]
    }
    const ele = statusPanel[0]
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>

{ele?<div key={ele.id}>
<div  style={{background:'#fff',padding:20}}>
  <PageHeader
    title={`${ele.grade}级${ele._master}专业论文选题`}
    content={<PageHeaderLeft status={ele.status} teacher={ele.name} startTime={ele.startTime} endTime={ele.endTime} />}
    extraContent={<PageHeaderRight status={ele.status} />}
  ></PageHeader>
</div>
<div  style={{padding:20,margin:20,background:'#fff',minHeight:300}}>
  <Table dataSource={dataSource} columns={COLUMNS[ele.status]} rowKey={r => r.id} size='small' />
</div>
</div>:<div>暂无数据</div>}
          
      </CusLayout>
    )
  }
}
