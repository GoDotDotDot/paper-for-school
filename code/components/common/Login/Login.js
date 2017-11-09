import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import Head from 'next/head'
import md_ajax from 'md_utils/md-service/md-ajax'
import 'isomorphic-fetch'
const FormItem = Form.Item
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogined: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.newUserLogin = this.newUserLogin.bind(this)
  }
  componentDidMount () {

  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        // console.log('Received values of form: ', values)
      } else {
        const {account, password} = values
        md_ajax.post('http://cas.zzz.com/sso/login', {account, password})
      .then(_res => console.log(_res))
      }
    })
  }
  newUserLogin () {
    console.log('点击')
    this.setState({isLogined: false})
  }
  render () {
    const {isLogined} = this.state
    const { getFieldDecorator } = this.props.form
    const prevent = (
      <div>
        <div className='logined-title'>快速登录</div>
        <div>
          <div className='user-border' />
          <div className='user-name'><a>用户名</a></div>
        </div>
        <div className='logined-button'>
          <Button type='primary' onClick={this.newUserLogin} className='button-login'>其它账号登录</Button>
        </div>
      </div>
    )
    const newLogin = (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <div className='login-form-title'>
          <span>欢迎登录</span>
        </div>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input name='account' prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='用户名' />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input name='password' prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码' />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>记住密码</Checkbox>
            )}
          <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
          </Button>
        </FormItem>
      </Form>
    )
    let loginContent = isLogined ? prevent : newLogin
    return (
      <div>
        <style jsx global>{`
        
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  
  .login-form{
      width: 330px;
      margin: 22px;
      padding-top:10px;
      #userName,#password{
        height:36px;
        background:#f8f8f8;
      }
  }
  .login-form-button{
    display: -webkit-box;
    font-size: 20px;
    width: 330px; 
    height:50px;
  }
  .login-form-title{
    margin-bottom: 50px;
    width: 330px;
    text-align: center;
    font-size: 20px;
    color: #0591d9;
    font-weight: 600;
  }
  .logined-title{
    font-size: 20px;
    color: #0591d9;
    font-weight: 600;
    text-align: center;
    margin: 50px 0px;
    padding-top:40px;
  }
  .user-border{
    width:120px;
    height: 120px;
    border:1px solid #93cef7;
    margin: auto;
  }
  .user-name{
    width: 120px;
    margin: auto;
    text-align: center;
    margin-top: 5px;
  }
  .logined-button{
    width: 200px;
 
    margin: 50px auto ;
  }
  .button-login{
    height:35px !important;
    font-size: 14px !important;
    width: 200px;
  }
  .ant-form-item{
    margin-bottom:40px;
  }
  .ant-form-item:nth-child(3){
    margin-bottom:22px;
  }
  .ant-checkbox-wrapper{
    margin-bottom:36px; 
  }`}
        </style>
        <Head>
          <title>登录</title>
        </Head>
        {loginContent}
      </div>
    )
  }
}

const LoginForm = Form.create()(Login)

export default LoginForm
