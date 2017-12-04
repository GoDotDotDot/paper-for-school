/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-26 19:33:11
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
      mdAjax.get(`${ctx}api/students/paper/result`)
      .then(rst=>{
          if(rst.success){
              this.setState({dataSource:rst.data})
          }else{
            Modal.warn({
                title:'警告',
                content:rst.message
            })
          }
      })
    const selectPaperIo = this.selectPaperIo = io('/gis')
    selectPaperIo.on('unSelectPaper',(rst)=>{
      if(rst.success){
        Modal.success({
          title:'通知',
          content:rst.message,
          onOk:()=>{
            window.location.reload()
          }
        })
      }
      else{
        Modal.warn({
          title:'通知',
          content:rst.message,
         
        })
      }
    })
    selectPaperIo.on('connect', () => {
      message.success('连接服务器成功')
      
    });
    selectPaperIo.on('connect_error', (err) => {
      message.success('连接服务器失败')
      
    })

  }


  unSelectPaper(id){
    this.selectPaperIo.emit('unSelectPaper',id)
  }
  render() {
    const { pathname } = this.props
    const { selectedRowKeys, statusPanel, dataSource } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
    };
  
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <style jsx>{`
          .search{
            background:#fff;
            padding:20px;
            .form{
              // width:400px;
            }
          }
          .result{
            padding:20px;
            margin:20px;
            background:#fff;
            // min-height:300px;
            .operator{
              margin:10px;
              margin-left:0px
            }
          }
      `
        }</style>

            <div className='search' key='dt0'>
              <PageHeader
                title={`我的专业论文选题结果`}
                content={''}
                extraContent={''}
              ></PageHeader>
            </div>
            {
                dataSource.map(ele=>{
                    return ( <div key={ele.id} className='result'>
                    <Row>
                        <Col span={15}>题目：{ele.title}</Col>
                        <Col span={6}>教师：{ele.teacher}</Col>
                        <Col span={3}><Button onClick={()=>{this.unSelectPaper(ele.id)}} type='danger'>退选</Button></Col>
                    </Row>
                   </div>)
                })
            }
           
          

    

      </CusLayout>
    )
  }
}
