/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-26 19:06:07
 */

import CusLayout from '../../studentsLayout'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import { Layout } from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import axios from 'axios'
const { Content } = Layout

export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  state={
    notice:''
  }
  componentDidMount () {
    axios.get(`${ctx}api/notice/students`).then(rst => {
      const {data} = rst
      if (data.success) {
        this.setState({notice: data.data.content})
      }
    })
  }
  render () {
    const { pathname } = this.props
    const {notice} = this.state
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
        <style jsx global>{`
        .w-e-text-contianer{
          h4{
            margin:10px 0;
            font-size: 14px;
            font-weight: 500;
          }
        }
        
        `}</style>
        <div className='search w-e-text-contianer' dangerouslySetInnerHTML={{__html: notice}} >
         
          </div>
      </CusLayout>
    )
  }
}

/**
 * 
 *  
 <div className='w-e-text' id='text-elem4778077254192581'>
            <h1 style="text-align: center">致2017届地理信息科学专业的同学们</h1>
            <h4>亲爱的同学们：</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 你们好，欢迎使用《资源环境学院教务辅助系统》！很荣幸你们成为了第一届使用本系统的同学，下面将由我向大家简单介绍下该系统：</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 目前，该系统只有论文选题这一个子系统（以下系统特指论文选题系统）。该子系统为了解决往年论文选题耗时、选题不公等现象，在吸取了往年经验教训之后我们采取了秒杀业务。论文选题由老师统一发布，在开抢前10分钟，你们将会看到本次论文题目列表，可以查看选题的详细信息。开抢时间一到，系统将会开启枪题通道，此时充分利用你们的电脑吧。在确认选题之后在规定时间内允许退选，建议需要退选课的同学同时开启两个浏览器（注意是两个浏览器不是两个标签页面），在退选之后第一时间抢选其他选题（如果有的话），祝你们好运！</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 建议大家在开抢前15分钟打开系统页面，系统默认开启WebSocket通信，即不需要手动刷新页面来开始抢课，抢课页面会自动刷新状态，如果自动刷新失败请手动刷新页面。如果您的浏览器不支持WebSocket，将不能使用本系统，切记！</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 建议的浏览器：Chrome 55以上、Firefox、360（需开启极速模式）、IE 11、Safari、Edge等现代浏览器，检测是否可用，请点击这里查看<a href='https://caniuse.com/#search=websocket' target='_blank' style="background-color: rgb(255, 255, 255)">Can I use</a>。</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 希望大家在抢课的过程中如果遇到什么问题，请及时与我取得联系，我的联系方式在页面的最下方，谢谢。</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 这里，我还提供了一份系统使用教程（视频版），请点击<a href=''>教程视频</a>查看。</h4>
            <h4>&nbsp; &nbsp; &nbsp; &nbsp; 最后，预祝大家都能抢到自己喜欢的课题，顺顺利利毕业！</h4>
            <h4 style="text-align: right">储奎</h4>
            <h4 style="text-align: right">2017年11月27日</h4>

 */