/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-26 17:59:49
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-11 16:28:59
 */
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout, Button, Icon, Menu, Breadcrumb, Row, Col } from "antd";

const { Content, Footer, Header } = Layout;
const SubMenu = Menu.SubMenu;
const { Item } = Menu;
const MenuItemGroup = Menu.ItemGroup;

const ROUTES = [
  {
    route: "/",
    title: "首页"
  },
  {
    route: "/about",
    title: "简介"
  },
  {
    route: "/products",
    title: "产品",
    child: [
      {
        route: "/products/fish",
        title: "鱼道监测系统"
      },
      {
        route: "/products/elec",
        title: "电赶拦鱼系统"
      },
      {
        route: "/products/rececle",
        title: "循环水质监测系统"
      }
    ]
  },
  {
    route: "/porjects",
    title: "项目"
  },
  {
    route: "/news",
    title: "新闻"
  },
  {
    route: "/contacts",
    title: "联系我们"
  }
];
const loop = (routes, isSub, pathname) => {
  const cls = isSub ? "sub-item" : "menu";
  return (
    <ul className={cls}>
      {routes.map((ele, i) => {
        if (ele.child) {
          return (
            <li className="item has-sub" key={i}>
              <span>{ele.title}</span>
              {loop(ele.child, true)}
            </li>
          );
        }
        return (
          <li className="item" key={i}>
            <Link href={ele.route}>
              <a className={pathname === ele.route ? "active" : ""}>
                {ele.title}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default class CusLayout extends React.Component {
  static async getInitialProps({ pathname }) {
    return { pathname };
  }
  state = {
    navToggle: false
  };
  navToggle = () => {
    const { navToggle } = this.state;
    this.setState({ navToggle: !navToggle });
  };
  render() {
    const { pathname } = this.props;
    const { navToggle } = this.state;
    const navCls = navToggle ? "nav" : "nav hide";
    return (
      <Layout style={{ minHeight: "100%" }}>
        <style jsx global>{`
            html,
            body,
            #__next,
            .ant-layout {
              background: #fff;
            }
            .cus-header {
              margin: 0 auto;
              display: block;
              height: 50px;
              padding: 0 30px;
              position: relative;
              .phone-nav-toggle {
                display: none;
                position: absolute;
                background-color: transparent;
                right: 30px;
                top: 13px;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
              }
              .logo,
              .nav {
                display: block;
                height: 50px;
              }
              .logo {
                left: 0;
              }
              .nav {
                position: absolute;
              }
              h1 {
                height: 50px;
              }
              .menu {
                display: inline-block;
                position: relative;
                background: #2f2e2e;
                .item {
                  line-height: 50px;
                  height: 50px;
                  span {
                    font-size: 15px;
                  }
                  .active {
                    color: #fff;
                  }
                }
                .has-sub {
                  .sub-item {
                    .item {
                      clear: both;
                      width: 100%;
                    }
                  }
                }
              }
              @media only screen and (max-width: 768px) {
                .nav {
                  top: 50px;
                  left: 0px;
                  width: 100%;
                }
                .phone-nav-toggle {
                  display: inline-block;
                }
                .hide {
                  display: none;
                }
                .menu {
                  width: 100%;
                  padding-left: 60px;
                  .item {
                    clear: both;
                  }
                  .has-sub {
                    height: auto;
                    .sub-item {
                      margin-left: 30px;
                    }
                  }
                }
              }

              @media only screen and (min-width: 767px) {
                .nav {
                  top: 0px;
                  right: 30px;
                }
                .menu {
                  .item {
                    float: left;
                  }
                }
                .item {
                  position: relative;
                  padding: 0 30px;
                  .sub-item {
                    position: absolute;
                    z-index: -1;
                    top: 100%;
                    left: 0;
                    display: none;
                    border-radius: 0 0px 2px 2px;
                    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.35);
                    background: #fff;
                    .item:hover,
                    .active {
                      color: #fff;
                      background: #31a2ec;
                    }
                  }
                }
                .has-sub:hover {
                  background: #fff;
                  span {
                    color: #646464;
                  }
                  .sub-item {
                    display: block;
                    .item {
                      clear: both;
                    }
                  }
                }
              }
            }
            .ant-layout-header {
              a,
              span {
                width: 100%;
                height: 100%;
                font-size: 15px;
                display: block;
                color: #b7b7b7;
                letter-spacing: 0.5px;
                -webkit-transition: color 0.45s
                  cubic-bezier(0.215, 0.61, 0.355, 1);
                transition: color 0.45s cubic-bezier(0.215, 0.61, 0.355, 1);
                white-space: nowrap;
              }
              a:hover,
              span:hover {
                color: #fff;
                cursor: pointer;
              }
            }
            .content {
              max-width: 1200px;
              margin: 0 auto;
            }
            .footer {
              height: 350px;
              background: #33343c;
            }
            @media only screen and (min-width: 1200px) {
              .cus-header {
                max-width: 1200px;
              }
            }

            .ant-layout-header {
              a {
                width: 100%;
                height: 100%;
                font-size: 14px;
                display: block;
                color: #b7b7b7;
                letter-spacing: 0.5px;
                -webkit-transition: color 0.45s
                  cubic-bezier(0.215, 0.61, 0.355, 1);
                transition: color 0.45s cubic-bezier(0.215, 0.61, 0.355, 1);
              }
              a:hover {
                color: #fff;
              }
            }
            .content {
              max-width: 1200px;
              margin: 0 auto;
            }
            .foot {
              background: #33343c;
            }
            .foot-border {
              color: #999aa6;
              font-size: 14px;
              margin: 20px 0px;
            }
            .linkStyle {
              color: #999aa6;
            }
            .foot-image::after {
              content: "";
              height: 0;
              display: none;
              clear: both;
              zoom: 1;
            }
            .foot-content{
              width: 65%;
              margin: auto;
            }
            @media screen and (max-width: 1400px) {
              .foot-content{
                width: 90%;
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
            background: "#2f2e2e",
            padding: 0,
            width: "100%",
            height: "50px",
            position: "fixed",
            zIndex: 101
          }}
        >
          <header className="cus-header">
            <div className="logo">
              <h1>
                <img src="/static/images/logo.png" alt="" />
              </h1>
            </div>
            {/* <Button shape='circle' icon='bars' className='phone-nav-toggle' /> */}
            <Icon
              type="bars"
              className="phone-nav-toggle"
              onClick={this.navToggle}
            />
            <nav className={navCls}>
              {loop(ROUTES, false, pathname)}
              {/* <ul className=''>
                {ROUTES.map((ele, i) => {
                  return (<li key={`header${i}`}>
                    <Link><a href={ele.route} className={pathname === ele.route && 'active'}>{ele.title}</a></Link>
                  </li>)
                })}

              </ul> */}
            </nav>
          </header>
        </Header>
        <Content style={{ padding: "50px 0", minHeight: "100vh" }}>
          {this.props.children}
        </Content>
        <Footer className="foot">
          <div className='foot-content' style={{  }}>
            this is footer
          </div>
        </Footer>
      </Layout>
    );
  }
}
