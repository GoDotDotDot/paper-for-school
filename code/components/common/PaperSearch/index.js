import { Form, Icon, Input, Button, Checkbox, Radio, Select, InputNumber } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select
class NormalLoginForm extends React.Component {
    state = {
        mode: 0
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    onChange = (e) => {
        const mode = e.target.value
        this.setState({ mode })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { mode } = this.state
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
                <FormItem key='0' label={'年级'}  {...formItemLayout}>
                    {getFieldDecorator('grade', {
                        rules: [
                        { type: 'number', message: '年级必须为数字' }],
                            initialValue:2017
                    })(
                        <InputNumber placeholder='请输入年级'></InputNumber>
                        )}
                </FormItem>
                <FormItem key='1' label={'专业'}  {...formItemLayout}>
                    {getFieldDecorator('master', {
                        initialValue: ''
                    })(
                        <Input placeholder="请输入专业" />
                        )}
                </FormItem>
                <FormItem key='2' label={'指导教师'}  {...formItemLayout}>
                    {getFieldDecorator('teacher', {
                        initialValue: ''
                    })(
                        <Input placeholder="请输入指导教师姓名" />
                        )}
                </FormItem>
                <FormItem key='5' label={'题目名称'}  {...formItemLayout}>
                    {getFieldDecorator('title', {
                      
                    })(
                        <Input placeholder="请输入题目名称" />
                        )}
                </FormItem>
                <FormItem  {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        立即查询
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalSearchForm = Form.create()(NormalLoginForm);
export default WrappedNormalSearchForm