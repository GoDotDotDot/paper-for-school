import { Form, Icon, Input, Button, Checkbox, Radio, Select, InputNumber, Upload } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select
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
                {mode === 1 && ([<FormItem key='4' label={'学号'}  {...formItemLayout}>
                    {getFieldDecorator('stuNum', {
                        rules: [{ required: true, message: '请输入学号' },
                        { message: '学号必须为数字！', type: 'number' }],
                        initialValue: ''
                    })(
                        <InputNumber placeholder='请输入学号'></InputNumber>
                        )}
                </FormItem>,
                <FormItem key='0' label={'年级'}  {...formItemLayout}>
                    {getFieldDecorator('grade', {
                        rules: [{ required: true, message: '请输入年级' },
                        { type: 'number', message: '年级必须为数字' }]
                    })(
                        <InputNumber placeholder='请输入年级'></InputNumber>
                        )}
                </FormItem>,
                <FormItem key='1' label={'班级'}  {...formItemLayout}>
                    {getFieldDecorator('class', {
                        rules: [{ required: true, message: '请输入班级', type: 'string' }],
                        initialValue: ''
                    })(
                        <Input placeholder="请输入班级" />
                        )}
                </FormItem>,
                 <FormItem key='3' label={'专业'}  {...formItemLayout}>
                 {getFieldDecorator('class', {
                     rules: [{ required: true, message: '请选择专业', type: 'string' }],
                     initialValue: ''
                 })(
                     <Input placeholder="请输入专业，专业必须和导入时专业一致，否则将无法选题" />
                     )}
             </FormItem>,
                <FormItem key='2' label={'性别'}  {...formItemLayout}>
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请选择性别' }],
                        initialValue: 'male'
                    })(
                        <Select>
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                        </Select>
                        )}
                </FormItem>
                ])}

                <FormItem  {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginTop:20}}>
                        确定
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalAddForm = Form.create()(NormalLoginForm);
export default WrappedNormalAddForm