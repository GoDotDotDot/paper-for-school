import { Form, Icon, Input, Button, Checkbox, Radio, Select, InputNumber, Upload,message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const Dragger = Upload.Dragger;
class NormalEditForm extends React.Component {
    state = {
        mode: 1,
        paperFrom:this.props.dataSource._from ||null
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onEditSubmitHandle(values)
                this.props.form.resetFields()
            }
        });
    }
    formChangeHandle = (e) => {
        const paperFrom = e.target.value
        this.setState({ paperFrom })
     }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {dataSource} = this.props
        const { mode, paperFrom } = this.state
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
                            rules: [{ required: true, message: '请输入年级' },
                            { type: 'number', message: '年级必须为数字' }],
                            initialValue:parseInt(dataSource.grade) || null
                        })(
                            <InputNumber placeholder='请输入年级'></InputNumber>
                            )}
                    </FormItem>
                    <FormItem key='1' label={'专业'}  {...formItemLayout}>
                        {getFieldDecorator('_master', {
                            rules: [{ required: true, message: '请输入专业', type: 'string' }],
                            initialValue: dataSource._master ||''
                        })(
                            <Input placeholder="请输入专业" />
                            )}
                    </FormItem>
                    <FormItem key='2' label={'指导教师'}  {...formItemLayout}>
                        {getFieldDecorator('teacher', {
                            rules: [{ required: true, message: '请输入指导教师姓名' }],
                            initialValue:  dataSource.teacher ||''
                        })(
                            <Input placeholder="请输入指导教师姓名" />
                            )}
                    </FormItem>
                    <FormItem key='3' label={'性别'}  {...formItemLayout}>
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '请选择性别' }],
                            initialValue:  dataSource.gender ||'男'
                        })(
                            <Select>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem key='4' label={'职称/学历'}  {...formItemLayout}>
                        {getFieldDecorator('professional', {
                            rules: [{ required: true, message: '请输入职称/学历' }],
                            initialValue: dataSource.professional || ''
                        })(
                            <Input placeholder="请输入指导教师职称/学历" />
                            )}
                    </FormItem>
                    <FormItem key='5' label={'题目名称'}  {...formItemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入题目名称' }],
                            initialValue: dataSource.title || ''
                        })(
                            <Input placeholder="请输入题目名称" />
                            )}
                    </FormItem>
                    <FormItem key='6' label={'题目来源'}  {...formItemLayout}>
                        {getFieldDecorator('_from', {
                            rules: [{ required: true, message: '请选择勾选题目来源' }],
                            initialValue: dataSource._from || null
                        })(
                            <RadioGroup onChange={this.formChangeHandle}>
                                <Radio value={'科研项目'}>科研项目</Radio>
                                <Radio value={'社会（行业）实践'}>社会（行业）实践</Radio>
                                <Radio value={'教师自拟'}>教师自拟</Radio>
                                <Radio value={'学生自拟'}>学生自拟</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                {
                    paperFrom === '学生自拟' && ([<FormItem key='10' label={'学号'}  {...formItemLayout}>
                        {getFieldDecorator('stuNum', {
                            rules: [{ required: true, message: '请输入学号' }],
                            initialValue: dataSource.stuNum || null
                        })(
                            <Input placeholder="请输入学生学号" />
                            )}
                    </FormItem>, <FormItem key='11' label={'学生姓名'}  {...formItemLayout}>
                        {getFieldDecorator('stuName', {
                            rules: [{ required: true, message: '请输入学生姓名' }],
                            initialValue: dataSource.stuName ||null
                        })(
                            <Input placeholder="请输入学生姓名" />
                            )}
                    </FormItem>])
                }
                
                    <FormItem key='7' label={'题目类型'}  {...formItemLayout}>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请勾选!' }],
                            initialValue: dataSource.type || null
                        })(
                            <RadioGroup >
                                <Radio value={'理论研究'}>理论研究</Radio>
                                <Radio value={'应用研究'}>应用研究</Radio>
                                <Radio value={'设计开发'}>设计开发</Radio>
                                <Radio value={'其他'}>其他</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem key='8' label={'是否在实验、实习工作、工程实践和社会调查等社会实践中完成'}  {...formItemLayout}>
                        {getFieldDecorator('hasAction', {
                            rules: [{ required: true, message: '请勾选!' }],
                            initialValue:  dataSource.hasAction ||null
                        })(
                            <RadioGroup >
                                <Radio value={'是'}>是</Radio>
                                <Radio value={'否'}>否</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem key='9' label={'题目简介'}  {...formItemLayout}>
                        {getFieldDecorator('brief', {
                            rules: [{ required: true, message: '请输入简介' }],
                            initialValue:  dataSource.brief || ''                            
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>
                    <FormItem key='10' label={'题目要求'}  {...formItemLayout}>
                        {getFieldDecorator('_require', {
                            rules: [{ required: true, message: '请输入要求' }],
                            initialValue:  dataSource._require || ''
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>
                    <FormItem key='11' label={'预期成果'}  {...formItemLayout}>
                        {getFieldDecorator('achieve', {
                            rules: [{ required: true, message: '请输入预期成果' }],
                            initialValue: dataSource.achieve || ''
                        })(
                            <TextArea rows={4} />
                            )}
                    </FormItem>
                    <FormItem key='12' label={'与专业符合度'}  {...formItemLayout}>
                        {getFieldDecorator('conformity', {
                            rules: [{ required: true, message: '请勾选！' }],
                            initialValue: dataSource.conformity || null
                        })(
                            <RadioGroup >
                                <Radio value={'符合'}>符合</Radio>
                                <Radio value={'基本符合'}>基本符合</Radio>
                                <Radio value={'不符合'}>不符合</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem key='13' label={'预计难易程度'}  {...formItemLayout}>
                        {getFieldDecorator('degree', {
                            rules: [{ required: true, message: '请勾选！' }],
                            initialValue: dataSource.degree || null
                        })(
                            <RadioGroup >
                                <Radio value={'偏难'}>偏难</Radio>
                                <Radio value={'适中'}>适中</Radio>
                                <Radio value={'便宜'}>便宜</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem key='14' label={'预计工作量大小'}  {...formItemLayout}>
                        {getFieldDecorator('workload', {
                            rules: [{ required: true, message: '请勾选！' }],
                            initialValue: dataSource.workload || null
                        })(
                            <RadioGroup >
                                <Radio value={'偏大'}>偏大</Radio>
                                <Radio value={'适中'}>适中</Radio>
                                <Radio value={'偏小'}>便小</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>

                   <FormItem  {...buttonItemLayout}>
                   <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
                       确定
                   </Button>
               </FormItem>
            </Form>
        );
    }
}

const WrappedNormalEditForm = Form.create()(NormalEditForm);
export default WrappedNormalEditForm