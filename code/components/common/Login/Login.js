import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import scss from './styles/index.scss'
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
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
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
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
        <div className='login-form-title'>
          <span>循环水及水质在线监测系统</span>
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
        {loginContent}
      </div>
    )
  }
}

const LoginForm = Form.create()(Login)

export default LoginForm
