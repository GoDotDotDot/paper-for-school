import React from "react";
import { Button, Table } from "antd";
import md_ajax from "md_utils/md-service/md-ajax";
const columnsAll = [
  {
    title: "预警信息",
    dataIndex: "message",
    key: "message"
  },
  {
    title: "时间",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "读取情况",
    dataIndex: "readStatus",
    key: "readStatus",
    render: (t, r, i) => {
      return t ? (
        <span style={{ color: "#0599d9" }}>已读</span>
      ) : (
        <span style={{ color: "#f24343" }}>未读</span>
      );
    }
  },
  {
    title: "操作人员",
    dataIndex: "operator",
    key: "operator"
  }
];
const parseWarnData = (d)=> Array.prototype.map.call(d, (ele, index) => {
  ele.key = index
  return ele
})
export default class WarnLogs extends React.Component {
  state = {
    currentWarnLogs: this.props.currentWarnLogs,
    currentPage: this.props.currentPage,
    warnData: []
  };
 
  componentDidMount() {
    const { currentWarnLogs, currentPage } = this.state;
    md_ajax
      .get(
        `https://www.easy-mock.com/mock/599a8991059b9c566dc99744/recyledwater/warnLog/${currentWarnLogs}`
      )
      .then(res => {
        const data = parseWarnData(res.data);
        this.setState({ warnData: data });
      });
  }
  componentWillReceiveProps(nextProps) {
    // 需要做浅度对比
    // if(nextProps !== this.props)
  }
  switchWarnLogsTable = ()=>{
    const {warnData,currentWarnLogs} = this.state    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.readStatus
      })
    };
    const tables = {
      all:(<Table
      className='logs-ant-table'
        rowClassName={(r, i) => {
          return r.readStatus ? 'readed' : 'unread'
        }}
        bordered columns={columnsAll} dataSource={warnData} rowSelection={rowSelection}
        footer={(d) => { return (<div><Button  style={{marginRight:7,backgroundColor:'#efefef'}}>标记已读</Button><Button style={{backgroundColor:'#efefef'}}>全部已读（当前页）</Button></div>) }} />),
      readed:(<Table
        rowClassName={(r, i) => {
          return  'readed'
        }}
        bordered columns={columnsAll} dataSource={warnData}
     />),
      unread:(<Table
        rowClassName={(r, i) => {
          return 'unread'
        }}
        bordered columns={columnsAll} dataSource={warnData }
        rowSelection={rowSelection}
        footer={(d) => { return (<div><Button style={{marginRight:7,backgroundColor:'#efefef'}}>标记已读</Button><Button style={{backgroundColor:'#efefef'}}>全部已读（当前页）</Button></div>) }} />)
    }
    return tables[currentWarnLogs]
  }
  async switchWarnLogs(currentWarnLogs) {
    this.setState({ currentWarnLogs,warnData:[] });
    const jsonData = await fetch(
      `https://www.easy-mock.com/mock/599a8991059b9c566dc99744/recyledwater/warnLog/${currentWarnLogs}`
    ).then(res => res.json());
    const warnData = parseWarnData(jsonData.data);
    this.setState({ warnData });
  }
  render() { 
    // const {currentWarnLogs} = this.props
    const { currentWarnLogs,warnData } = this.state;
    return (
      <div>
        <Button
          style={
            currentWarnLogs === "all"
              ? { marginRight: 4 }
              : { backgroundColor: "#d6d6d6", marginRight: 4 }
          }
          type={currentWarnLogs === "all" ? "primary" : "default"}
          onClick={()=>{this.switchWarnLogs('all')}}
        >
          全部报警日志
        </Button>
        <Button
          style={
            currentWarnLogs === "readed"
              ? { marginRight: 4 }
              : { backgroundColor: "#d6d6d6", marginRight: 4 }
          }
          type={currentWarnLogs === "readed" ? "primary" : "default"}
          onClick={()=>{this.switchWarnLogs('readed')}}
        >
          已读
        </Button>
        <Button
          style={
            currentWarnLogs === "unread"
              ? { marginRight: 4 }
              : { backgroundColor: "#d6d6d6", marginRight: 4 }
          }
          type={currentWarnLogs === "unread" ? "primary" : "default"}
          onClick={()=>{this.switchWarnLogs('unread')}}
        >
          未读
        </Button>
        <div style={{ marginTop: 10 }}>
        {this.switchWarnLogsTable()}
        </div>
      </div>
    );
  }
}
