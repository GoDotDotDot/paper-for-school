import { Form, Icon, Input, Button, Checkbox, Radio, Select, InputNumber, Upload } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
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
        const plainOptions = ['Apple', 'Pear', 'Orange'];
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }
        const uploadProps = {
            name: 'file',
            multiple: true,
            showUploadList: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} className="login-form" layout='horizontal'>
                <FormItem label={'新增模式'}  {...formItemLayout}>
                    {getFieldDecorator('mode', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: mode
                    })(
                        <RadioGroup onChange={this.onChange}>
                            <Radio value={0}>导入</Radio>
                            <Radio value={1}>手动</Radio>
                        </RadioGroup>
                        )}
                </FormItem>
                {mode === 0 && (
                    <FormItem label={'文件上传'}  {...formItemLayout}>
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">请点击或者拖拽文件这里</p>
                            <p className="ant-upload-hint">请上传exls文件</p>
                        </Dragger>
                    </FormItem>)}
                {mode === 1 && ([
                    <FormItem key='0' label={'年级'}  {...formItemLayout}>
                        {getFieldDecorator('grade', {
                            rules: [{ required: true, message: '请输入年级' },
                            { type: 'number', message: '年级必须为数字' }]
                        })(
                            <InputNumber placeholder='请输入年级'></InputNumber>
                            )}
                    </FormItem>,
                    <FormItem key='1' label={'专业'}  {...formItemLayout}>
                        {getFieldDecorator('master', {
                            rules: [{ required: true, message: '请输入专业', type: 'string' }],
                            initialValue: ''
                        })(
                            <Input placeholder="请输入专业" />
                            )}
                    </FormItem>,
                    <FormItem key='2' label={'指导教师'}  {...formItemLayout}>
                        {getFieldDecorator('teacher', {
                            rules: [{ required: true, message: '请输入指导教师姓名' }],
                            initialValue: ''
                        })(
                            <Input placeholder="请输入指导教师姓名" />
                            )}
                    </FormItem>,
                    <FormItem key='3' label={'性别'}  {...formItemLayout}>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '请选择性别' }],
                            initialValue: 'male'
                        })(
                            <Select>
                                <Option value="male">男</Option>
                                <Option value="female">女</Option>
                            </Select>
                            )}
                    </FormItem>,
                    <FormItem key='4' label={'职称/学历'}  {...formItemLayout}>
                        {getFieldDecorator('professional ', {
                            rules: [{ required: true, message: '请输入职称/学历' }],
                            initialValue: ''
                        })(
                            <Input placeholder="请输入指导教师职称/学历" />
                            )}
                    </FormItem>,
                    <FormItem key='5' label={'题目名称'}  {...formItemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入题目名称' }],

                        })(
                            <Input placeholder="请输入题目名称" />
                            )}
                    </FormItem>,
                    <FormItem key='6' label={'题目来源'}  {...formItemLayout}>
                        {getFieldDecorator('from', {
                            rules: [{ required: true, message: '请选择勾选题目来源' }],

                        })(
                            <RadioGroup >
                                <Radio value={'科研项目'}>科研项目</Radio>
                                <Radio value={'社会（行业）实践'}>社会（行业）实践</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>,
                    <FormItem key='7' label={'题目类型'}  {...formItemLayout}>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请勾选!' }],
                        })(
                            <RadioGroup >
                                <Radio value={'理论研究'}>理论研究</Radio>
                                <Radio value={'应用研究'}>应用研究</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>,
                    <FormItem key='8' label={'是否在实验、实习工作、工程实践和社会调查等社会实践中完成'}  {...formItemLayout}>
                        {getFieldDecorator('hasAction', {
                            rules: [{ required: true, message: '请勾选!' }],
                            initialValue: ''
                        })(
                            <RadioGroup >
                                <Radio value={'是'}>是</Radio>
                                <Radio value={'否'}>否</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>,
                    <FormItem key='9' label={'题目简介'}  {...formItemLayout}>
                        {getFieldDecorator('brief', {
                            rules: [{ required: true, message: '请输入简介' }],
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>,
                    <FormItem key='10' label={'题目要求'}  {...formItemLayout}>
                        {getFieldDecorator('require', {
                            rules: [{ required: true, message: '请输入要求' }],
                            initialValue: ''
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>,
                    <FormItem key='11' label={'预期成果'}  {...formItemLayout}>
                        {getFieldDecorator('achieve ', {
                            rules: [{ required: true, message: '请输入预期成果' }],
                            initialValue: ''
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>,
                    <FormItem key='12' label={'与专业符合度'}  {...formItemLayout}>
                        {getFieldDecorator(' conformity ', {
                            rules: [{ required: true, message: '请勾选！' }],
                        })(
                            <RadioGroup >
                                <Radio value={'符合'}>符合</Radio>
                                <Radio value={'基本符合'}>基本符合</Radio>
                                <Radio value={'不符合'}>不符合</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>,
                    <FormItem key='13' label={'预计难易程度'}  {...formItemLayout}>
                        {getFieldDecorator('degree', {
                            rules: [{ required: true, message: '请勾选！' }],
                        })(
                            <RadioGroup >
                                <Radio value={'偏难'}>偏难</Radio>
                                <Radio value={'适中'}>适中</Radio>
                                <Radio value={'便宜'}>便宜</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>,
                    <FormItem key='14' label={'预计工作量大小'}  {...formItemLayout}>
                        {getFieldDecorator('workload', {
                            rules: [{ required: true, message: '请勾选！' }],
                        })(
                            <RadioGroup >
                                <Radio value={'偏大'}>偏大</Radio>
                                <Radio value={'适中'}>适中</Radio>
                                <Radio value={'偏小'}>便小</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                ])}

                <FormItem  {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
                        确定
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalAddForm = Form.create()(NormalLoginForm);
export default WrappedNormalAddForm