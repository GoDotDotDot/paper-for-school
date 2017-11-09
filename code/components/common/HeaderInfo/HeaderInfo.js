/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 18:00:00
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-09-28 11:33:02
 */
import { Menu } from 'antd'
import Head from 'next/head'
// import scss from './styles/index.scss'
const avatar = '/static/images/b1.jpg'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

export default (props) => {
  const {className} = props
  return (
    <Menu mode='horizontal' className={className}>
      <Head>
      </Head>
      <SubMenu
        title={
          <span className='avatar'>
            <img src={avatar} alt='头像' />
            <i className='on bottom b-white' />
          </span>
                }
              >
        <MenuItemGroup title='用户中心'>
          <Menu.Item key='setting:1'>你好 - </Menu.Item>
          <Menu.Item key='setting:2'>个人信息</Menu.Item>
          <Menu.Item key='logout'>
            <span>退出登录</span>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title='设置中心'>
          <Menu.Item key='setting:3'>个人设置</Menu.Item>
          <Menu.Item key='setting:4'>系统设置</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>)
}
