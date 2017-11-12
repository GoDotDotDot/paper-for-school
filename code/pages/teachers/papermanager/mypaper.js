/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-12 14:38:00
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout, Table, Popconfirm, Button} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalSearchForm from 'com_common/PaperSearch'
const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}]

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
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher'
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      }, {
        title: '职称/学历',
        dataIndex: 'professional',
        key: 'professional'
      }, {
        title: '题目名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '题目来源',
        dataIndex: 'from',
        key: 'from'
      }, {
        title: '题目类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '社会实践',
        dataIndex: 'hasAction',
        key: 'hasAction'
      }, {
        title: '题目简介',
        dataIndex: 'brief',
        key: 'brief'
      }, {
        title: '题目要求',
        dataIndex: 'require',
        key: 'require'
      }, {
        title: '预期成果',
        dataIndex: 'achieve',
        key: 'achieve'
      }, {
        title: '与专业符合度',
        dataIndex: 'conformity',
        key: 'conformity'
      }, {
        title: '预计难易程度',
        dataIndex: 'degree',
        key: 'degree'
      }, {
        title: '预计工作量大小',
        dataIndex: 'workload',
        key: 'workload'
      }, {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator',
        render: (text, record) => {
          return (<Button>编辑</Button>)
        }
      }]
  }
  render () {
    const {pathname} = this.props
    const {dataSource} = this.state
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
          <WrappedNormalSearchForm />
        </div>
        <div className='result'>
          <div className='operator'>
            <Button type='danger' disabled={dataSource.length === 0} style={{marginRight: 20}}>删除命题</Button>
          </div>
          <Table dataSource={dataSource} columns={this.columns} />
        </div>
      </CusLayout>
    )
  }
}
