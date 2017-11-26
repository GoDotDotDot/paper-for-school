import React, { Component } from "react";
import {
  Form,
  Input,
  Tabs,
  Button,
  Icon,
  Checkbox,
  Row,
  Col,
  Alert,
  Select
} from "antd";
import Head from 'next/head'
import axios from "axios";
// import scss from "./styles/index.scss";

const FormItem = Form.Item;
const { TabPane } = Tabs;
const {Option} = Select
class Login extends Component {
  state = {
    loginText: "修改",
    message: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.setState({ loginText: "正在修改..." });
        console.log(values);
        axios
          .post(
            `/api/users/reset`,{ ...values }
          )
          .then(res => {
            const { data } = res;
            if (data.success) {
              const message = this.renderMessage(data.message, "success");
              this.setState({ message },()=>{
                window.location.href = '/login'
              });

            } else {
              const message = this.renderMessage(data.message, "error");
              this.setState({ message,loginText: "修改" });
            }
          })
          .catch(err => {
            const message = this.renderMessage(err.message, "error");
            this.setState({ message, loginText: "修改" });
          });
      }
    });
  };

  renderMessage = (message, type) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type={type}
        closable
        showIcon
      />
    );
  };

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { loginText, message } = this.state;
    return (
      <div className="login">
          <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css"
          />
          </Head>
          <style jsx global>{`
          .login{
            height: 100%;
            background: url('/static/images/background.svg');
            padding: 100px 0 0 0;
            .title{
              text-align: center;
              padding: 20px;
              font-size: 16px;
              color: rgba(0,0,0,0.45)
            }
            .logo{
              text-align: center;
              h1{
                vertical-align: middle;
                font-size: 33px;
                color:#697b8c;
                img,span{
                  vertical-align: middle
                }
                span{
                  padding-left: 20px;
                }
              }
            }
            .ant-form-item{
              // height: 35px;
            }
            .ant-input-affix-wrapper .ant-input {
              min-height: auto;
          }
            .ant-form,.message{
              width: 265px;
              margin: auto;
            }
            .ant-row{
              // height:35px;
            }
            .ant-input{
              background:#f0f2f5;
            }
            .forgetPassword{
              // float: right;
            }
            .forgetPassword::after{
              content:'';
              height:0;
              display: block;
              clear:both;
            }
            .register{
              // float: right;
            }
            .register::after{
              content:'';
              height:0;
              display: block;
              clear:both;
            }
            .ant-btn{
              width:100%;
            }
            .otherLogin{
              width: 20%;
              margin: auto;
              padding: 40px 0px;
            }
          }
          `}</style>
        <div className="logo">
          <h1>
            <img src={'/static/images/logo.png'} alt="" style={{height:60}}/>
            {/* <span>ECOLOGY</span> */}
          </h1>
        </div>
        <div className="title">欢迎使用资源环境学院教务辅助系统</div>
        <div className="message">{message || null}</div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="用户名">
            {getFieldDecorator("account", {
              rules: [
                {
                  required: true,
                  message: "请输入用户名"
                }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="user" />}
                placeholder="请输入用户名"
              />
            )}
          </FormItem>
          <FormItem label="新密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码！"
                }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请输入新密码！"
              />
            )}
           </FormItem>
           <FormItem label="身份证号码">
            {getFieldDecorator("idcard", {
              rules: [
                {
                  required: true,
                  message: "请输入身份证号码！"
                }
              ]
            })(
              <Input
                size="large"
                prefix={<Icon type="credit-card" />}
                placeholder="请输入身份证号码！"
              />
            )}
           </FormItem>
    
          <FormItem>
            <div style={{ marginTop: "10px" }}>
              <Button size="large" type="primary" htmlType="submit">
                {loginText}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);
