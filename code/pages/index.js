/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-24 20:55:21
 */

import CusLayout from '../layout.js'
import React from 'react'
import HomePage from '../components/pages/Homepage/Homepage.js'
// import scss from '../public/styles/index/index.scss'
import Head from 'next/head'
import { Layout } from 'antd'
import Link from 'next/link'
const { Content, Footer } = Layout

export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  render () {
    const { pathname } = this.props
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <style jsx>{
          `div {
    color: red;
}`
        }
        </style>
        <Layout>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <link rel='stylesheet' href='static/styles/rc-banner-anim.css' />
          </Head>
          <Content>
            <HomePage />

          </Content>
        </Layout>
      </CusLayout>
    )
  }
}
