/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-03 15:00:16
 */

import CusLayout from '../index.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message} from 'antd'
import Head from 'next/head'
import {ctx,weather} from '../public/scripts/golbalStatic'
import mdAjax  from "../components/utils/md-service/md-ajax"

import {Layout} from 'antd'
import Link from 'next/link'
const { Content, Footer } = Layout

export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }

  
  render () {
    const {pathname} = this.props;
    // const {sensor,warn,person} = this.state;
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
      <style jsx>{`
      `

      }</style>
        <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
        </Head>
          <Content style={{padding: '0 94px'}}>
            this is index 
          </Content>
        </Layout>
      </CusLayout>
    )
  }
}
