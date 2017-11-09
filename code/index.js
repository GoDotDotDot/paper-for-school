/*
 * @Author: 储奎 / GoDotDotDot 
 * @Date: 2017-09-26 17:59:49 
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-09 22:57:23
 */
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout, Icon, Menu, Breadcrumb } from "antd";
import SiderCustom from "./components/common/SiderCustom/SiderCustom";
import HeaderInfo from "./components/common/HeaderInfo/HeaderInfo";
import CusBreadcrumb from "./components/common/Breadcrumb/Breadcrumb";

const { Content, Footer, Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
        position: absolute;
        bottom: 7px;
        line-height: initial
    }
    .custom-trigger {
        position: absolute;
        margin-left: 36px;
        display: inline-block;
        font-size: 20px;
        bottom: 15px;
        cursor: pointer
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

.ant-menu-submenu-horizontal>.ant-menu {
    width: 120px;
    left: -45px;
}

.ant-layout-has-sider {
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100%;
    .ant-layout-sider {
        // background: #fff;
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
            width: 64px
        }
    }
    .custom-trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 16px;
        cursor: pointer;
        -webkit-transition: color .3s;
        -o-transition: color .3s;
        transition: color .3s;
    }
    .logo {
        height: 32px;
        background: #333;
        border-radius: 6px;
        margin: 16px;
    }
    .link {
        display: inline-block
    }
    .ant-menu-item {
        text-overflow: initial !important;
        span,
        a {
            display: inline-block;
            width: 100%;
        }
        a {
            color: #989898
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
} `}
                </style>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <link
                        rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css"
                    />
                </Head>
                <Header style={{ background: "#fff", padding: 0, width: "100%", position: 'fixed', zIndex: 101 }}>
                    <h1><img src="./static/images/logo.png" alt="" /></h1>
                    <h3>资源环境学院教务辅助系统</h3>
                    <HeaderInfo className="headerinfo" />
                </Header>
                <Layout className="ant-layout-has-sider" style={{ width: "100%", height: "100%", position: 'absolute', paddingTop: '66px', overflow: 'hidden', background: '#f8f8f8' }}>
                    <SiderCustom path={pathname} />
                    <Layout>
                        <CusBreadcrumb pathname={pathname} />
                        <Content style={{ margin: "0 47px", overflow: "initial" }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: "center" }}>技术支持：GoDotDotDot</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
