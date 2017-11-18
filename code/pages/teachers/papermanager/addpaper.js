/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-16 22:10:38
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import { message, Layout, Table, Popconfirm, Button } from 'antd'
import Head from 'next/head'
import { ctx } from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalAddForm from 'com_common/PaperAdd'
import Result from 'com_common/Result'
import stylesheet from 'styles/ant-design-pro.min.css'
export default class Index extends React.Component {
  static async getInitialProps({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      result: {
        type: 'success',
        title: '上传成功！'
      },
      showResult: false
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
  onSubmitHandle = (value) => {
    console.log(value)
    mdAjax.post(`${ctx}api/teachers/paper/form`, value).then(rst => { 
      message.success(`添加成功！`);
      console.log(rst)      
     }).catch(err => { 
      message.error(`添加失败！`);      
      })
  }
  uploadHandle = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
      // this.setState({showResult:true,result:{type}})
    }
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功！`);
      this.setState({ showResult: true, result: { type: 'success', title: `${info.file.name} 上传成功！` } })

    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败！`);
      this.setState({ showResult: true, result: { type: 'error', title: `${info.file.name} 上传失败！` } })

    }
  }
  render() {
    const { pathname } = this.props
    const { dataSource, result, showResult } = this.state
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
            <WrappedNormalAddForm onSubmitHandle={this.onSubmitHandle} uploadHandle={this.uploadHandle} />
          </div>
        </div>
        {
          showResult &&
          <div className='result'>
            <div className='operator'>
              <Result
                type={result.type}
                title={result.title}
                description='您可以在下面的表格中查看上传成功的数据'
                style={{ width: '100%' }}
              />
            </div>
            <Table dataSource={dataSource} columns={this.columns} />
          </div>
        }
      </CusLayout>
    )
  }
}
