/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-11 16:14:18
 */

import CusLayout from '../layout.js'
import React from 'react'
import HomePage from '../components/Homepage/Homepage.js'
// import scss from '../public/styles/index/index.scss'
import Head from 'next/head'
import Router from 'next/router'
import { Layout } from 'antd'
// import Link from 'next/link'
import ScrollAnim from 'rc-scroll-anim'
const { Content, Footer } = Layout
const AnchorLink = ScrollAnim.Link
const Element = ScrollAnim.Element
export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  constructor (props) {
    super(props)
    this.state = {
      fixedSider: false
    }
    this.scrollHandle = this.scrollHandle.bind(this)
  }
  componentDidMount () {
    console.log('mount')
    window.addEventListener('scroll', this.scrollHandle)
  }
  componentWillUnmount () {
    console.log('unmount')
    window.removeEventListener('scroll', this.scrollHandle)
  }
  scrollHandle () {
    const sider = this.sider
    const rect = this.aboutContainer.getBoundingClientRect()
    if (rect.top <= 70) {
      this.setState({fixedSider: true})
    } else {
      this.setState({fixedSider: false})
    }
  }
  remove () {
    console.log('unmount')
  }
  render () {
    const { pathname } = this.props
    const { fixedSider } = this.state
    const siderCls = fixedSider ? 'sider fixedSider' : 'sider'
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <style jsx>{`
            .about {
              padding: 130px 20px;
              position: relative;
            }
            .fixedSider{
                top:70px;
            }
            .sider {
              width: 150px;
              position: fixed;
              li {
                height: 50px;
                line-height: 50px;
                text-align: right;
                position: relative;
              }
              .active,
              li:hover {
                div {
                  color: #31a2ec;
                }
              }
              li::before,
              li:last-child::after {
                content: "";
                display: block;
                width: 100%;
                height: 2px;
                background: linear-gradient(to left, #31a2ec, #fff);
              }
              li:last-child::after {
                position: absolute;
                bottom: 0px;
              }
            }
            .about-container {
              padding-left: 170px;
            }
          `}
        </style>
        <style jsx global>{`
        .anchorlink{
            padding-right: 8px;
            color: #6f6f6f;
            font-size: 22px;
        }
        .anchorlink:hover{
            color: #31a2ec;
            cursor:pointer;
        }
        `}</style>
        <div className='content about' id='box'>
          <div className={siderCls} ref={ref => { this.sider = ref }}>
            <ul>
              <li className={pathname === '/about' ? 'active' : ''}>
                <AnchorLink to='page0' offsetTop={70} className='anchorlink'>公司简介</AnchorLink>
              </li>
              <li className={pathname === '/about/yuanjing' ? 'active' : ''}>
                <AnchorLink to='page1' offsetTop={70} className='anchorlink'>公司愿景</AnchorLink>
              </li>
              <li className={pathname === '/about/wenhua' ? 'active' : ''}>
                <AnchorLink to='page2' offsetTop={70} className='anchorlink'>公司文化</AnchorLink>
              </li>
            </ul>
          </div>
          <div className='about-container' ref={ref => { this.aboutContainer = ref }}>
            <Element className='pack-page' id='page0' location='box'>
              公司简介
              <div style={{ height: 900 }}>
                易科捷（武汉）生态科技有限公司成立于2017年年初，隶属于武汉中科瑞华生态科技股份有限
                公司，是一家致力于过鱼设施、过鱼效果监测、集运鱼系统的技术研发、产品设备、技术服务于一体 的民营高科技公司。
                公司扎根技术研究，不仅创制出优质的硬件设备，且配套自己的在线监测软件，提供准确全面的
                数据，更好地满足客户的需求、服务于生态文明建设。公司拥有国家发明专利、自主知识产权，目前
                在鱼道观鱼设备、电赶拦鱼设备、鱼道在线监测系统、水质在线监测系统等领域均居于全国第一。
              </div>
            </Element>
            <Element className='pack-page' id='page1'>
              公司愿景
              <div style={{ height: 900 }}>
                易科捷秉持着生态保护者的责任，以尖端的科技为核心竞争力，志在推动中国水生态建设和修复行 业的创新发展，保护鱼类的生物多样性。
              </div>
            </Element>
            <Element className='pack-page' id='page2'>
              公司文化
              <div style={{ height: 900 }}>
                易科捷秉持着生态保护者的责任，以尖端的科技为核心竞争力，志在推动中国水生态建设和修复行 业的创新发展，保护鱼类的生物多样性。
              </div>
            </Element>
          </div>
        </div>
      </CusLayout>
    )
  }
}
