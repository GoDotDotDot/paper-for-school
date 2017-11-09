import React from 'react'
import { Form, Select, DatePicker, Button, Modal } from 'antd'
import Charts from './charts'
import moment from "moment";
import mdAjax  from "../../utils/md-service/md-ajax";
import { dateFormat } from '../../common/DataFormat/DataFormat'
import { ctx } from "../../../public/scripts/golbalStatic";
const Option = Select.Option
const FormItem = Form.Item
const currentTime = new Date()
const beforeTime = new Date(currentTime - 30 * 24 * 60 * 60 * 1000) // 获取30天之前的事件戳

class DataQuery extends React.Component {
  constructor (props) {
    super(props)
  }
    state = {
      isHide: true,
      chartData: []
    }
    getHistoryData = (startTime,endTime,stationName,stationId)=>{
      mdAjax.get(ctx+'getMontorDataQueryChartData.action', {
        params: {
          stationName,
          startTime,
          endTime,
          stationId
        }
      },{cache:true}).then((data)=>{
        if (typeof(data.data) === 'string' ){
            this.setState({
              chartData:[]
            })
            message.error('没有查到相关数据，请修改输入时间')
          
        }else{
          this.setState({
            chartData:data.data
          })
        }
      }).catch((e)=>{
          message.error(e.message);
      })
    }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      debugger
      const startTime = fieldsValue['start-picker'] // 时间的范围值
      const endTime = fieldsValue['end-picker']
      const stationName = '啦啦啦',stationId ='';
      const values = {
        ...fieldsValue,
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
      }
      // 时间大小的比对
      let startTimeOdd = values.startTime.split(' ')[0].split('-')
      let endTImeOdd = values.endTime.split(' ')[0].split('-')
      let currentTime = new Date()
      let startTimeNew = new Date(
        startTimeOdd[0],
        parseInt(startTimeOdd[1]) - 1,
        startTimeOdd[2]
      )
      let endTimeNew = new Date(
        endTImeOdd[0],
        parseInt(endTImeOdd[1]) - 1,
        endTImeOdd[2]
      )
      let timeLength = endTimeNew - startTimeNew
      if (
        startTimeNew >= endTimeNew ||
        timeLength >= 62 * 24 * 60 * 60 * 1000
      ) {
        Modal.error({
          title: '哎呀，出错啦o(╯□╰)o',
          content: '开始时间必须小于结束时间哦！并且时间间隔不能超过两个月哦！'
        })
        return
      }
      if (endTimeNew >= currentTime) {
        Modal.error({
          title: '哎呀，出错啦o(╯□╰)o',
          content: '结束时间必须小于当前时间哦'
        })
        return
      }
      this.setState({
        isHide:false
      })
      this.getHistoryData(
        values.startTime,
        values.endTime,
        stationName,
        stationId
      )
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const {chartData,isHide}= this.state;
    const config = {
      rules: [
        {
          type: 'object',
          required: true,
          message: '请选择时间！'
        }
      ]
    }
    const doms = chartData.map((ele,index)=>{
        return <Charts chartData = {ele}  key={index}/>
    })
    return (
      <div>
        <Form layout='inline' style={{ textAlign: 'center' }}>
          <FormItem label='开始' style={{ marginBottom: '20px' }}>
            {getFieldDecorator('start-picker', {initialValue: moment(beforeTime, "YYYY-MM-DD HH:mm:ss"),...config})(
              <DatePicker />
            )}
          </FormItem>
          <FormItem label='结束' style={{ marginBottom: '20px' }}>
            {getFieldDecorator('end-picker',{initialValue: moment(currentTime, "YYYY-MM-DD HH:mm:ss"),...config} )(
              <DatePicker />
            )}
          </FormItem>
          <FormItem>
            <Button type='primary' onClick={this.handleSubmit.bind(this)} size='large'>
              生成报告
            </Button>
          </FormItem>
        </Form>
        {
          isHide ? null : doms
        }
      </div>
    )
  }
}

const WrapedDatasQuery = Form.create()(DataQuery);
export default WrapedDatasQuery
