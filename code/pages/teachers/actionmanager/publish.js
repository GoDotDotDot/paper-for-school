/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-19 17:26:29
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalPublishForm from 'com_common/ActionPublish'
const { Content, Footer } = Layout

export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  submitFormHandle=(values)=>{
    debugger
    
    mdAjax.post(`${ctx}api/teachers/action/publish`,{...values})
    .then(rst=>{
        debugger
        if(rst.success){
            message.success(rst.message)
        }
        else
        message.error(rst.message)
    })
.catch(err=>{
    debugger
    message.error('发生了一点小错误：'+err.message)
})
  }

  render () {
    const {pathname} = this.props
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
      `

      }</style>

        <div className='search'>
          <span>请输入发布选题参数：</span>
          <div className='form'>
            <WrappedNormalPublishForm submitForm={this.submitFormHandle}/>
          </div>
        </div>
      </CusLayout>
    )
  }
}
