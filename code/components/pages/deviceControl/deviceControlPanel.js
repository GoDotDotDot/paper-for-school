/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-28 14:55:11
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-07 17:54:36
 */

import React from "react";
import ControlPanel from "../../common/ControlPanel/ControlPanel";
import {
  Switch,
  Popover,
  Radio,
  Table,
  Modal,
  Button,
  Select,
  TimePicker,
  message
} from "antd";
import PopoverContent from "./PopoverContent";
import moment from "moment";
import "isomorphic-fetch";
import { ctx } from "../../../public/scripts/golbalStatic";
import mdAjax from "md_utils/md-service/md-ajax";
import shallowEqual from "../../utils/shallowequal";
moment.locale('zh-cn');
const RadioGroup = Radio.Group;
const { Option } = Select;
const confirm = Modal.confirm;
const DATE_CODE_ZH = ["每天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
const MODE_NAME_TO_EN = { '手动': "manual", '自动': "auto" ,'delete':'delete'};
const DATE_FORMAT = {
  '每天': "everyday",
  '星期一': "monday",
  '星期二': "tuesday",
  '星期三': "wednesday",
  '星期四': "thursday",
  '星期五': "friday",
  '星期六': "saturday",
  '星期日': "sunday"
};
let diabledFlag
class AddAutoDataContent extends React.Component {
  onOkHandler() {
    const { ok } = this.props;
    if (ok) {
      const { date, startDate, endDate } = this.state;
      diabledFlag = date
      ok({
        date: DATE_CODE_ZH[date],
        startDate: startDate.format("HH:mm:ss"),
        endDate: endDate.format("HH:mm:ss")
      });
    }
  }
  onCancelHandler() {
    const { cancel } = this.props;
    cancel && cancel();
  }
  state = {
    date: "0",
    startDate: moment(),
    endDate: moment()
  };
  onDateChangeHandler = (v, opt) => {
    this.setState({ date: v });
  };
  onDateTimeChangeHandler(type, time) {
    debugger
    this.setState({ [type]: time });
  }
  render() {
    const { ok, cancel } = this.props;
    const { date, startDate, endDate } = this.state;
    return (
      <div className="add-auto-data-popover--container">
        <div className="row">
          <span className="span">日期：</span>
          <Select
            value={date}
            style={{ width: 100 }}
            onSelect={this.onDateChangeHandler}
          >
            {DATE_CODE_ZH.map((ele, index) => {
              let disabled = false
              if(diabledFlag){
                if(diabledFlag>0){
                  disabled = index === 0
                 }else{
                   disabled = index > 0
                 }
              }
              
              console.log(index,disabled)
              return (
              <Option key={`autodate${index}`} value={"" + index} disabled={disabled}>
                {ele}
              </Option>
            )})}
          </Select>
        </div>
        <div className="row">
          <span className="span">开启时间：</span>
          <TimePicker
            onChange={time => {
              this.onDateTimeChangeHandler("startDate", time);
            }}
            value={startDate}
            style={{ width: 100 }}
          />
        </div>
        <div className="row">
          <span className="span">关闭时间：</span>
          <TimePicker
            onChange={time => {
              this.onDateTimeChangeHandler("endDate", time);
            }}
            value={endDate}
            style={{ width: 100 }}
          />
        </div>
        <div className="row" style={{ textAlign: "right", padding: "5px 0px" }}>
          <Button
            size="small"
            onClick={() => {
              this.onOkHandler();
            }}
            type="primary"
            style={{ marginRight: 15 }}
          >
            确认
          </Button>
          <Button
            size="small"
            onClick={() => {
              this.onCancelHandler();
            }}
          >
            取消
          </Button>
        </div>
      </div>
    );
  }
}
export default class DeviceControlPanele extends React.Component {
  constructor(props) {
    super(props);
    const { mode, data } = this.props;
    console.log('data:',data)
    /**
     * 需要遍历data重新生成key
     */
    const tData = mode ==='自动' ?  data.map((ele,index)=>{
       ele.key = `ad${index}`
       return ele
    }) : data
    this.state = {
      data:tData,
      mode,
      visible: false,
      tableData: []
    };
    this.autoData =JSON.parse(JSON.stringify(tData))
    this.hide = this.hide.bind(this);
    this.statusChange = this.statusChange.bind(this);
  }
  /**
   * switch开关事件
   * @param {*} checked 开关状态
   */
  onModeChangeHandler = e => {
    const modeName = e.target.value;
    confirm({
      title: "切换提醒",
      content: `确定立即切换到【${modeName}】吗？`,
      onOk: async () => {
        // const data = await fetch(`${ctx}switchControlMode.action`,{
        //   method: "PUT",
        //   body: JSON.stringify({mode:modeName,id:this.props.dId}),
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   credentials: "same-origin"
        // }).then(res=>res.json()).then(d=>d)
        const data = await mdAjax
          .put(
            `${ctx}switchControlMode`,{ mode: MODE_NAME_TO_EN[modeName], equipId: this.props.dId })
          .then(dt => {
            return dt;
          })
          .catch(err => {
            console.log(err);
          });
        console.log("Switch:", data);
        this.setState({
          mode: modeName,
          data: data.data
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  async onSwitchChangeHandler(v) {
    let { mode } = this.state; // 控制模式
    const { dId } = this.props; // 设备ID
    const { data } = this.state;
    let putData;
    if (mode === "手动") {
      putData = {
        status: !data
      };
    } else {
      putData = {};
        // 删除
        for (let i = 0; i < data.length; i++) {
          let ele = data[i];
          const day = DATE_FORMAT[ele.date];
          const startTime = ele.startDate;
          const endTime = ele.endDate;
          ele.id && (putData.calendarId = ele.id)
          putData[`${day}StartTime`] = startTime;
          putData[`${day}EndTime`] = endTime;
        }
        if(data.length===0) mode='delete';putData['xxx']=1
    }
    const resData = await mdAjax.put(`${ctx}deviceControl`, {id:dId,mode:MODE_NAME_TO_EN[mode],data:putData})
      .then(dt => dt)
      .catch(err => console.log(err));
      if(resData.status){
        message.success(resData.message)
        if(mode === '手动')this.setState({data:!data})
      }else{
        message.error(resData.message)
        
      }
  }
  /**
   * 取消按钮
   */
  hide() {
    let { checked } = this.state;
    this.setState(
      {
        checked: !checked
      },
      () => {
        console.log(checked);
      }
    );
  }
  /**
   * 确定按钮
   * @param {*} hours
   * @param {*} mins
   */
  statusChange(hours, mins) {
    let { checked } = this.state;
    this.setState(
      {
        checked: !checked
      },
      () => {
        console.log(checked);
      }
    );
  }
  onDelAutoDataHandle(i) {
    confirm({
      title: "删除提醒",
      content: `确定要删除该条配置信息吗？`,
      onOk: () => {
        const { data } = this.state;
        Array.prototype.splice.call(data, i, 1);
        this.setState({ data },()=>{
          (data.length === 0) && (diabledFlag = null)
          console.log(shallowEqual(data,this.autoData))   
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  onAddAutoDataOkHandle(dt, visible) {
    console.log(dt);
    const { data } = this.state;
    dt.key = data.length;
    Array.prototype.push.call(data, dt);
    this.setState({ visible, data },()=>{
      console.log(shallowEqual(data,this.autoData))   
    });
  }
  onAddAutoDataCancelHandle = () => {
    this.setState({ visible: false });
  };
  render() {
    const { title, device } = this.props;
    const { data, mode } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const columns = [
      {
        title: "日期",
        key: "date",
        dataIndex: "date",
        render: (text, record, index) => (
          <div style={{ marginLeft: "15px" }}>
            {" "}
            <span
              style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#0599d9",
                marginRight: "30px"
              }}
            />
            {text}
          </div>
        )
      },
      {
        title: "开启时间",
        key: "startDate",
        dataIndex: "startDate"
      },
      {
        title: "关闭时间",
        key: "endDate",
        dataIndex: "endDate"
      },
      {
        title: "",
        key: "action",
        dataIndex: "action",
        render: (t, r, i) => (
          <Button
            type="danger"
            size="small"
            style={{ float: "right" }}
            onClick={() => {
              this.onDelAutoDataHandle(i);
            }}
          >
            删除
          </Button>
        )
      }
    ];
    return (
      <ControlPanel title={`编号：${title}`}>
        <p>{`设备：${device}`}</p>
        <p>控制模式：</p>
        <RadioGroup onChange={this.onModeChangeHandler} value={mode}>
          <Radio value={"手动"} style={radioStyle}>
            手动
          </Radio>
          {mode === "手动" ? (
            <Switch
              checkedChildren="已开"
              unCheckedChildren="关"
              checked={data}
              onChange={v => {
                this.onSwitchChangeHandler(v);
              }}
            />
          ) : null}
          <Radio value={"自动"} style={radioStyle}>
            自动
          </Radio>
          {mode === "自动" ? (
            <div>
              <Table
                className="control"
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered={false}
                size="small"
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  type='primary'
                  style={{marginRight:15}}
                  onClick={() => {
                    this.onSwitchChangeHandler();
                  }}
                >
                  立即启动
                </Button>
                <Popover
                  content={
                    <AddAutoDataContent
                      ok={dt => {
                        this.onAddAutoDataOkHandle(dt, false);
                      }}
                      cancel={this.onAddAutoDataCancelHandle}
                    />
                  }
                  trigger="click"
                  visible={this.state.visible}
                >
                  <Button
                    style={{ width: 70 }}
                    icon="plus"
                    onClick={() => {
                      this.setState({ visible: true });
                    }}
                  />
                </Popover>
              </div>
            </div>
          ) : null}
        </RadioGroup>
      </ControlPanel>
    );
  }
}

DeviceControlPanele.defaultProps = {
  status: false,
  title: "设备间",
  device: "增温泵",
  mode: 0,
  data: [
    {
      date: "周一",
      startDate: "22:00",
      endDate: "23:00",
      key: 0
    }
  ]
};
