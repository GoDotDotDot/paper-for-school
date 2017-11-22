import { Form, Icon, Input, Button, Checkbox, Radio, Select } from 'antd';
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
                this.props.searchStudents(values)
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
                <FormItem label={'查询模式'}  {...formItemLayout}>
                    {getFieldDecorator('mode', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: mode
                    })(
                        <RadioGroup onChange={this.onChange}>
                            <Radio value={0}>模糊查询</Radio>
                            <Radio value={1}>精确查询</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                {mode === 1 && (<FormItem label={'学号'}  {...formItemLayout}>
                    {getFieldDecorator('stuNum', {
                            rules: [{ required: true, message: '请输入学号!' }],                            
                    })(
                        <Input placeholder="请输入学号" />
                        )}
                </FormItem>)}
                {mode === 0 && ([
                    <FormItem key='0' label={'年级'}  {...formItemLayout}>
                        {getFieldDecorator('grade', {
                        })(
                            <Input placeholder="请输入年级" />
                            )}
                    </FormItem>,
                    <FormItem key='1' label={'班级'}  {...formItemLayout}>
                        {getFieldDecorator('class', {
                        })(
                            <Input placeholder="请输入班级" />
                            )}
                    </FormItem>,
                    <FormItem key='2' label={'性别'}  {...formItemLayout}>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            initialValue: 'all'
                        })(
                            <Select>
                                <Option value="all">全部</Option>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                            )}
                    </FormItem>
                ])}

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