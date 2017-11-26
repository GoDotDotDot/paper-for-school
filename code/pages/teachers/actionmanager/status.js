/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-25 15:07:57
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout,Table,Tag,Button,Modal} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
const { Content, Footer } = Layout
const confirm = Modal.confirm;

const STATUS_COLOR = {
'未开始':'#108ee9',
'进行中':'#87d068',
'已结束':'#f50'
}
export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    return { pathname }
  }
  state = {
    selectedRowKeys:[],
    dataSource:[]
  }
  componentDidMount(){
   
    mdAjax.get(`${ctx}api/teachers/action/status`)
    .then(rst=>{
      if(rst.success){
        this.setState({dataSource:rst.data})
      }else{
        message.error(rst.message)
      }
    })
    .catch(err=>{
      message.error(err.message)
      
    })
  }
  deleteStudentsHandle= ()=>{
    const id = this.state.selectedRowKeys
    confirm({
      title: '你确定要删除吗？',
      content: `删除操作为软删除，需要恢复请联系技术支持，联系方式在页面最底部！`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk:()=> {
        console.log('OK');
        mdAjax.post(`${ctx}api/teachers/action/delete`,{id})
        .then(rst=>{
          if(rst.success){
            const {dataSource} = this.state
            const dt = dataSource.filter((ele)=>{
              return !id.some((_ele)=>_ele===ele.id)
            })
            message.success(rst.message)
            this.setState({dataSource:dt,selectedRowKeys:[]})
          }else{
            message.error(rst.message)
            
          }
          console.log(rst)
        })
        .catch(err=>{
          console.log(err)
          message.success('发生了一点错误：'+err)
          
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
  render () {
    const {pathname} = this.props
    const {selectedRowKeys,dataSource} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
    };
    const columns = [
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
        render:(text,record)=> <Tag color={STATUS_COLOR[text]}>{text}</Tag>
      }
      ]
    // const {sensor,warn,person} = this.state;
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
            min-height:300px;
            .operator{
              margin:10px;
              margin-left:0px
            }
          }
      `

      }</style>

        <div className='search'>
          <span>已发布选题状态信息</span>
          <div className='form'>
            查询功能预留
          </div>
        </div>
        <div className='result'>
        <div className='operator'>
            <Button type='danger' disabled={selectedRowKeys.length === 0} onClick={this.deleteStudentsHandle}>删除选题</Button>
          </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} rowKey={r=>r.id} size='small'/>
        </div>
      </CusLayout>
    )
  }
}
