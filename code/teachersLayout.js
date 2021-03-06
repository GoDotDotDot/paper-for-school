/*
 * @Author: 储奎 / GoDotDotDot 
 * @Date: 2017-09-26 17:59:49 
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-30 14:04:12
 */
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout, Icon, Menu, Breadcrumb } from "antd";
import SiderCustom from "./components/common/SiderCustom/SiderCustom";
import HeaderInfo from "./components/common/HeaderInfo/HeaderInfo";
import CusBreadcrumb from "./components/common/Breadcrumb/Breadcrumb";
import flush from "styled-jsx/server";
import MDSider from "com_common/MDSider";
const { Content, Footer, Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const ROUTES = [
  {
    route: "/teachers/index",
    title: "首页"
  },
  {
    route: "/teachers/stumanager",
    title: "学生管理",
    child: [
      {
        route: "/teachers/stumanager/mystu",
        title: "我的学生"
      },
      {
        route: "/teachers/stumanager/addstu",
        title: "新增学生"
      }
    ]
  },
  {
    route: "/teachers/papermanager",
    title: "命题管理",
    child: [
      {
        route: "/teachers/papermanager/mypaper",
        title: "我的命题"
      },
      {
        route: "/teachers/papermanager/addpaper",
        title: "新增命题"
      }
    ]
  },
  {
    route: "/teachers/actionmanager",
    title: "选题管理",
    child: [
      {
        route: "/teachers/actionmanager/publish",
        title: "发布选题"
      },
      {
        route: "/teachers/actionmanager/status",
        title: "选题状态"
      },
      {
        route: "/teachers/actionmanager/export",
        title: "结果导出"
      }
    ]
  }
];
export default class CusLayout extends React.Component {
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { pathname } = this.props;
    return (
      <Layout style={{ minHeight: "100%" }}>
        <style jsx global>{`
          .root,
          #__next,
          .custom_class {
            min-height: 100%;
            max-height: 100%;
            height: 100%;
            overflow: hidden;
            background: #f8f8f8;
          }

          [data-reactroot] {
            min-height: 100%;
            max-height: 100%;
            height: 100%;
          }

          .ant-layout-header {
            h1 {
              display: inline-block;
              margin-left: 50px;
              img {
                width: 172px;
                height: 35px;
                vertical-align: middle;
              }
            }
            h3 {
              display: inline-block;
              margin-left: 40px;
              font-size: 20px;
              color: #0499d9;
            }
            .custom-trigger {
              position: absolute;
              margin-left: 36px;
              display: inline-block;
              font-size: 20px;
              bottom: 15px;
              cursor: pointer;
            }
          }

          .breadcrumb-container {
            height: 50px;
            padding: 5px 0px;
            line-height: 50px;
            margin-bottom: 20px;
            .ant-breadcrumb a {
              padding-left: 47px;
              color: #119edb !important;
              font-size: 14px;
              font-weight: 500;
            }
          }

          .headerinfo {
            float: right;
            line-height: 64px;
            height: 65px;
          }

          .avatar {
            position: relative;
            display: inline-block;
            width: 40px;
            line-height: 1;
            border-radius: 500px;
            white-space: nowrap;
            font-weight: bold;
            img {
              border-radius: 100px;
              width: 100%;
              vertical-align: middle;
            }
          }

          .ant-menu-submenu-horizontal > .ant-menu {
            width: 120px;
            left: -45px;
          }

          .ant-layout-has-sider {
            -ms-flex-direction: row;
            flex-direction: row;
            height: 100%;
            .ant-layout-sider {
              .ant-layout-sider-children {
                flex: 0 0 200px;
                max-width: 200px;
                min-width: 200px;
                width: 200px;
              }
            }
            .ant-layout-sider-collapsed {
              .ant-layout-sider-children {
                flex: 0 0 64px;
                max-width: 64px;
                min-width: 64px;
                width: 64px;
              }
            }
            .custom-trigger {
              font-size: 18px;
              line-height: 64px;
              padding: 0 16px;
              cursor: pointer;
              -webkit-transition: color 0.3s;
              -o-transition: color 0.3s;
              transition: color 0.3s;
            }
            .logo {
              height: 32px;
              background: #333;
              border-radius: 6px;
              margin: 16px;
            }
            .link {
              display: inline-block;
            }
            .ant-menu-item {
              text-overflow: initial !important;
              span,
              a {
                display: inline-block;
                width: 100%;
              }
              a {
                color: #989898;
              }
              &:hover a {
                background-color: transparent;
                color: #129edb;
              }
            }
            .ant-layout-sider-collapsed {
              .ant-menu-item {
                text-overflow: ellipsis !important;
                span,
                a {
                  display: inline;
                }
              }
            }
            .ant-menu-item-selected {
              a {
                background-color: transparent;
                color: #129edb;
              }
            }
          }
        `}</style>
         <style jsx global>{`
             .aboutme{
                padding:10px;
                font-size:14px
             }
                .aboutme-list{
                    span{
                        
                    }
                    .split{
                        padding:5px 10px;
                        
                    }
                }
             `}
            </style>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css"
          />
        </Head>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            width: "100%",
            position: "fixed",
            zIndex: 101,
            boxShadow: "2px 0 6px rgba(0, 21, 41, 0.35)"
          }}
        >
          <h1>
            <img src="/static/images/logo.png" alt="" />
          </h1>
          <h3>资源环境学院教务辅助系统</h3>
          <HeaderInfo className="headerinfo" />
        </Header>
        <Layout
          className="ant-layout-has-sider"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            paddingTop: "66px",
            overflow: "hidden",
            background: "#f8f8f8"
          }}
        >
          <Sider
            style={{
              overflowY: "auto",
              background: "#fff",
              boxShadow: "2px 0 6px rgba(0, 21, 41, 0.35)"
            }}
          >
            <MDSider data={ROUTES} />
          </Sider>
          <Layout>
            <Content style={{ margin: "0", overflow: "initial" }}>
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <div className="aboutme">关于我</div>
              <div className="aboutme-list">
                <span>
                  <a target="_blank" href="https://github.com/GoDotDotDot">
                    GitHub
                  </a>
                </span>
                <span className="split">|</span>
                <span>
                  <a target="_blank" href="http://blog.godotdotdot.com/">
                    博客
                  </a>
                </span>
                <span className="split">|</span>
                <span>
                  <a target="_blank" href="https://www.weibo.com/godotdotdot">
                    新浪微博
                  </a>
                </span>
                <span className="split">|</span>
                <span>
                  <a href="javascript:void()">QQ：854025808</a>
                </span>
              </div>
              <div className="aboutme">
                储奎(GoDotDotDot) All Rights Reserved
              </div>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
