/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 18:00:00
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-26 19:14:52
 */
import React from 'react'
import { Menu, Modal } from 'antd'
// import Head from 'next/head'
// import scss from './styles/index.scss'
import axios from 'axios'
import {ctx} from 'md_public/scripts/golbalStatic'

const avatar = '/static/images/b1.jpg'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const logOutHandle = () => {
  console.log('未找到注销处理器')
  axios.get(`${ctx}api/users/logout`)
  .then(res => {
    const { data } = res
    if (!data.success) {
      return Modal.warn({
        title: '警告',
        content: data.message
      })
    }
    window.location.href = '/login'
  }).catch(err => {
    Modal.warn({
      title: '警告',
      content: err.message
    })
  })
}
export default class HeaderInfo extends React.Component {
  state = {
    userName:''
  }
  componentDidMount () {
    const ls = window.localStorage.getItem('userInfo')
    const userInfo = JSON.parse(ls)||{}
    const {name} = userInfo
    this.setState({userName:name})
  }
  editPsw=()=>{
    window.location.href='/reset'
  }
  render () {
    const {className,logOut} = this.props
    const {userName} = this.state
    return (
      <Menu mode='horizontal' className={className}>
        <SubMenu
          title={
            <span className='avatar'>
              <img src={avatar} alt='头像' />
              <i className='on bottom b-white' />
            </span>
                  }
                >
          <MenuItemGroup title='用户中心'>
            <Menu.Item key='setting:1'>你好，{userName || ''} </Menu.Item>
            <Menu.Item key='logout'>
              <span onClick={logOut || logOutHandle}>退出登录</span>
            </Menu.Item>
            <Menu.Item key='editpsw'>
              <span onClick={this.editPsw}>修改密码</span>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>)
  }
}
