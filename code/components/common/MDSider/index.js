import React from 'react'
import Link from 'next/link';
import { Menu } from 'antd'
const { SubMenu } = Menu
let arr = []

export default class MDSider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // current: '0',
      // openKeys: ['0', '0']
    }
    this.handleClick = this.handleClick.bind(this)
    this.subMenuClick = this.subMenuClick.bind(this)
  }
  subMenuClick (eventKey, domEvent) {
    console.log(eventKey, domEvent)
  }
  handleClick (e) {
    console.log(e)
    // this.setState({
    //   openKeys: e.keyPath
    // })
    const onMenuClickHandle = this.props.onMenuClickHandle
    if (onMenuClickHandle) {
      onMenuClickHandle(e)
    }
  }
  render () {
    // let subIndex = 0
    let menuIndex = 0
    const loop = (data) => {
      return data.map((item, index) => {
        if (item.child) {
          return (
            <SubMenu key={`sub-${index + 1}`} title={item.title} onTitleClick={this.subMenuClick}>
              {loop(item.child)}
            </SubMenu >
          )
        }
        menuIndex++
        return <Menu.Item img_src={index} key={`menu-${menuIndex}-${index + 1}`} ><Link href={item.route}><a>{item.title}</a></Link> </Menu.Item>
      })
    }
    return (
      <Menu
        mode='inline'
        defaultOpenKeys={['sub-1']}
        defaultSelectedKeys={['menu-1-1']}
        // openKeys={this.state.openKeys}
        style={{ width: 'auto' }}
        onClick={this.handleClick}
      >
        {loop(this.props.data)}
      </Menu>
    )
  }
}
