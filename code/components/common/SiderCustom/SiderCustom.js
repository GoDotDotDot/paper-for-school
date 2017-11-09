/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 17:59:39
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-09 22:59:26
 */

import React, { Component } from 'react'
import Head from 'next/head'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
// import scss from './styles/index.scss'
const { Sider } = Layout

Router.onRouteChangeStart = url => {
  console.log('App is changing to: ', url)
  NProgress.start()
}
Router.onRouteChangeComplete = url => {
  console.log('App has changed to: ', url)
  NProgress.done()
}
class SiderCustom extends Component {
  render () {
    const {path} = this.props
    const pathSnippets = path.split('/').filter(i => i)
    const selectedKeys = pathSnippets.map((_, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`)
    if (selectedKeys.length === 0)selectedKeys.push('/')
    // if (path === '/') {
    //   selectedKeys = [path]
    // } else {
    //   const keys = String.prototype.split.call(path, '/')
    //   selectedKeys = Array.prototype.slice.call(keys, 1) || ['/']
    // }
    return (
      <Sider
        breakpoint='lg'
        collapsed={this.props.collapsed}
        style={{ overflowY: 'auto', background: '#fff' }}
        trigger={null}
      >
        <Menu
          theme='light'
          mode='inline'
          selectedKeys={selectedKeys}
        >
          <Menu.Item key='/'>
            <Icon type='home' />
            <Link href={'/'}>
              <span><a href='' >首页</a></span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/monitorVideo'>
            <Icon type='video-camera' />
            <Link href={'/monitorVideo'}>
              <span><a href=''>学生管理</a></span>
            </Link>
          </Menu.Item>
          <Menu.Item key='/deviceStatus'>
            <Icon type='usb' />
            <Link href={'/deviceStatus'}>
              <span><a href=''>命题管理</a></span>
            </Link>
          </Menu.Item>

        </Menu>
      </Sider>
    )
  }
}

export default SiderCustom
