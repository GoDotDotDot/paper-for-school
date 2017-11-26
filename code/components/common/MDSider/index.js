import React from 'react'
import Link from 'next/link'
import { Menu } from 'antd'
const { SubMenu } = Menu
let arr = []

export default class MDSider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedKey:'',
      openKeys: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.subMenuClick = this.subMenuClick.bind(this)
  }
  subMenuClick (eventKey, domEvent) {
    console.log(eventKey, domEvent)
  }
  handleClick (e) {
    console.log(e)

  //   this.setState({
  //     selectedKey: e.selectedKeys 
  // });
    const onMenuClickHandle = this.props.onMenuClickHandle
    if (onMenuClickHandle) {
      onMenuClickHandle(e)
    }
  }
  componentDidMount(){
    this.setMenuOpen()
  }
  setMenuOpen = () => {
    // 为解决next.js路径后面加'/' bug
    const path = window.location.pathname
    const len = path.length
    const openKeys = path.substr(0, path.lastIndexOf('/',len-2))
    const selectedKey = path.substr(0,len-1);
    this.setState({
        openKeys,
        selectedKey
    });
}
openMenu = v => {
  console.log(v);
  this.setState({
      openKeys: v[v.length - 1],
  })
}
  render () {
    const loop = (data) => {
      return data.map((item, index) => {
        if (item.child) {
          return (
            <SubMenu key={item.route} title={item.title}>
              {loop(item.child)}
            </SubMenu >
          )
        }
        return <Menu.Item img_src={index} key={item.route} ><Link href={item.route}><a>{item.title}</a></Link> </Menu.Item>
      })
    }
    const {selectedKey,openKeys} = this.state
    console.log(selectedKey,openKeys)
    return (
      <Menu
        mode='inline'
        openKeys={[openKeys]}
        selectedKeys= {[selectedKey]}
        style={{ width: 'auto' }}
        onClick={this.handleClick}
        onOpenChange={this.openMenu}
      >
        {loop(this.props.data)}
      </Menu>
    )
  }
}
