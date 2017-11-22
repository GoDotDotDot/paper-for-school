import { Form, Icon, Input, Button, Checkbox, Radio, Select ,DatePicker } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  function onOk(value) {
    console.log('onOk: ', value);
  }
  
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {submitForm} = this.props
                submitForm && submitForm(values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
                <FormItem label={'年级'}  {...formItemLayout}>
                    {getFieldDecorator('grade', {
                        rules: [{ required: true, message: '请输入年级!' }],
                    })(
                        <Input placeholder="请输入年级" />
                        )}
                </FormItem>
                <FormItem label={'专业'}  {...formItemLayout}>
                    {getFieldDecorator('_master', {
                        rules: [{ required: true, message: '请输入专业!' }],
                    })(
                        <Input placeholder="请输入专业" />
                        )}
                </FormItem>
                <FormItem label={'开始时间'}  {...formItemLayout}>
                    {getFieldDecorator('startTime', {
                        rules: [{ required: true, message: '请选择开始时间!' }],
                    })(
                        <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="开始时间"
                        onChange={onChange}
                        onOk={onOk}
                      />
                        )}
                </FormItem>
                <FormItem label={'结束时间'}  {...formItemLayout}>
                    {getFieldDecorator('endTime', {
                        rules: [{ required: true, message: '请选择结束时间!' }],
                    })(
                        <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="结束时间"
                        onChange={onChange}
                        onOk={onOk}
                      />
                        )}
                </FormItem>

                <FormItem  {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        立即发布
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalPublishForm = Form.create()(NormalLoginForm);
export default WrappedNormalPublishForm