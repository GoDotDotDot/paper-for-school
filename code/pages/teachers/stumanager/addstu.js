/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-25 16:49:53
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout, Table, Popconfirm, Button} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalAddForm from 'com_common/StuAdd'
import Result from 'com_common/Result'
import stylesheet from 'styles/ant-design-pro.min.css'
export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  constructor (props) {
    super(props)
    this.state = {
      dataSource: []
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
      }]
  }
  onSubmitHandle = (values)=>{
    console.log(values)
    mdAjax.post(`${ctx}api/teachers/students/form`, values).then(rst => { 
      message.success(`添加成功！`);
      console.log(rst)      
     }).catch(err => { 
      message.error(`添加失败！`);      
      })
  }
  render () {
    const {pathname} = this.props
    const {dataSource} = this.state
    // const {sensor,warn,person} = this.state;
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <Head>
          <style>{stylesheet}</style>
        </Head>
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
          <span>请输入查询条件：</span>
          <div className='form'>
            <WrappedNormalAddForm onSubmitHandle={this.onSubmitHandle} />
          </div>
        </div>

      </CusLayout>
    )
  }
}
