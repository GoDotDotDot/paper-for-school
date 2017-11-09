
import React from 'react'
import { Form, Select, Input} from 'antd'
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 10 },
    sm: { span: 16 }
  }
}
const {Option} = Select
class PersonFrom extends React.Component {
  render () {
    const nameConfig = {
      rules: [{
        type: 'string',
        required: true,
        message: '请输入姓名！'
      }]
    }
    const ageConfig = {
      rules: [{
        type: 'string',
        required: true,
        message: '请输入年龄！'
      }]
    }
    const addressConfig = {
      rules: [{
        type: 'string',
        required: true,
        message: '请输入住址！'
      }]
    }
    const phoneConfig = {
      rules: [{
        pattern: /^1(3|4|5|7|8)\d{9}$/,
        required: true,
        message: '请输入电话号码！'
      }]
    }
    const nearTimeConfig = {
      rules: [{
        type: 'string',
        required: true,
        message: '请输入最近值班时间！'
      }]
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout='horizontal' onSubmit={this.props.handleSubmit}>
        <FormItem label='姓名' {...formItemLayout} >
          {getFieldDecorator('name', nameConfig)(
            <Input />
                )}
        </FormItem>
        <FormItem label='年龄' {...formItemLayout}>
          {getFieldDecorator('age', ageConfig)(
            <Input />
                )}
        </FormItem>
        <FormItem label='住址' {...formItemLayout}>
          {getFieldDecorator('address', addressConfig)(
            <Input />
                )}
        </FormItem>
        <FormItem label='电话' {...formItemLayout}>
          {getFieldDecorator('telephone', phoneConfig)(
            <Input />
                )}
        </FormItem>
        <FormItem label='值班时间' {...formItemLayout}>
          {getFieldDecorator('nearTime', nearTimeConfig)(
            <Select style={{width: '85%', textAlign: 'center'}}>
              <Option value='周一'>周一</Option>
              <Option value='周二'>周二</Option>
              <Option value='周三'>周三</Option>
              <Option value='周四'>周四</Option>
              <Option value='周五'>周五</Option>
              <Option value='周六'>周六</Option>
              <Option value='周天'>周天</Option>
            </Select>
                    )}
        </FormItem>
      </Form>
    )
  }
}
const PersonFroms = Form.create()(PersonFrom)
export default PersonFroms
