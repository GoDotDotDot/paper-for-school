/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-18 22:04:03
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout, Table, Popconfirm, Button,Modal} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalSearchForm from 'com_common/StuSearch'
const confirm = Modal.confirm;
export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedRowKeys:[]
    }
    this.columns = [
      {
        title: '学号',
        dataIndex: 'stuNum',
        key: 'stuNum'
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      }, {
        title: '班级',
        dataIndex: 'class',
        key: 'class'
      }, {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade'
      },
      {
        title: '操作',
        key: 'operator',
        dataIndex: 'operator',        
        render: (text, record,index) => {
          return (<Button type='primary' onClick={()=>{
            this.resetPsw(record)}}>重置密码</Button>)
        }
      }]
  }
  resetPsw = (record)=>{
    confirm({
      title:`你确定要重置【${record.name}】的密码吗？`,
      content: '重置后该同学登录系统将被重定向至密码重置页面设置新密码！',
      onOk:()=> {
        const {id} = record
        mdAjax.post(`${ctx}api/teachers/students/resetPsw`,{id})
        .then(rst=>{
          if(rst.success){
            message.success(rst.message)
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }
  searchStudentsHandle = (values)=>{
    let url
    const {mode} = values
    if (mode === 0){
      let grade = values.grade || ''
      let _class = values._class || ''
      let gender = values.gender || ''
      url = `${ctx}api/teachers/students?grade=${grade}&class=${_class}&gender=${gender}`
    } 
    else if(mode ===1) {
      url = `${ctx}api/teachers/students/byStuNum?stuNum=${values.stuNum}`
    }
    else return
    mdAjax.get(url)
    .then(rst=>{
      if(rst.success){
        this.setState({dataSource:rst.data})
      }
    })
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
        mdAjax.post(`${ctx}api/teachers/students/delete`,{id})
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
  render () {
    const {pathname} = this.props
    const {dataSource,selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
    };
    // const {sensor,warn,person} = this.state;
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <style jsx>{`
        .search{
          // height:100px;
          background:#fff;
          padding:20px
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
          <span>请输入查询条件：</span>
          <WrappedNormalSearchForm searchStudents={this.searchStudentsHandle}/>
        </div>
        <div className='result'>
          <div className='operator'>
            <Button type='danger' disabled={selectedRowKeys.length === 0} onClick={this.deleteStudentsHandle}>删除用户</Button>
          </div>
          <Table rowSelection={rowSelection} dataSource={dataSource} columns={this.columns} rowKey={r=>r.id} size='small'/>
        </div>
      </CusLayout>
    )
  }
}
