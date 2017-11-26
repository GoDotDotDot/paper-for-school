/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-26 19:26:28
 */

import CusLayout from '../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
const { Content, Footer } = Layout

export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
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
        }
      `
      }</style>
        <style jsx global>{`
        .w-e-text-contianer{
          h4{
            margin:10px 0;
            font-size: 14px;
            font-weight: 500;
          }
        }
        
        `}</style>
        <div className='search w-e-text-contianer'>
          <div className='w-e-text' id='text-elem4778077254192581'>
            <h1 style={{textAlign: 'center'}}>系统使用说明</h1>
            <h4>尊敬的老师们：</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 你们好，欢迎使用《资源环境学院教务辅助系统》！下面将由我向大家简单介绍下该系统：</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 目前，该系统只有论文选题这一个子系统（以下系统特指论文选题系统）。该子系统为了解决往年论文选题耗时、选题不公等现象，在吸取了往年经验教训之后我们采取了秒杀业务。论文选题将由老师统一发布，在开抢前10分钟，同学们将会看到本次论文题目列表，可以查看选题的详细信息。开抢时间一到，系统将会开启抢题通道，此时学生才可以选题。在确认选题之后在规定时间内允许退选</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 这里，我还提供了一份系统使用教程（视频版），请点击<a href=''>教程视频</a>查看。</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 请老师们严格按照我提供的Excel上传，否则可能会导致数据出错，切记！<a href='/download/students.xlsx'>学生导入表下载</a>，<a href='/download/paper.xlsx'>命题导入表下载</a></h4>

            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 如遇到问题，请联系我，谢谢，恭祝老师们身体健康，万事如意！</h4>
            <h4 style={{textAlign: 'right'}}>储奎</h4>
            <h4 style={{textAlign: 'right'}}>2017年11月27日</h4>
          </div>
        </div>
      </CusLayout>
    )
  }
}
