//控制可编辑的部分
import React from 'react';
import { Table, Input, Popconfirm, Select,Modal } from 'antd';
const  {Option} = Select;

export default class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
   error(text){
    Modal.error({
      title: '发生错误啦！',
      content: `${text}`
    })
  }
  //普通input修改
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  //下拉框修改
  selectChange(data){
    const value = data;
    this.setState({ value });
  }
  phoneChange(e){
    const value = e.target.value;
   if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
          this.error('请输入正确的电话号码');
          return
        } 
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state
    let Doms
    switch(this.props.dataIndex){    
      case 'nearTime':
        Doms = <Select  mode='multiple' defaultValue={this.state.value} style={{width:'100%',textAlign:'center'}} onChange={ data => this.selectChange(data)}> 
                  <Option value='周一'>周一</Option>
                  <Option value='周二'>周二</Option>
                  <Option value='周三'>周三</Option>
                  <Option value='周四'>周四</Option>
                  <Option value='周五'>周五</Option>
                  <Option value='周六'>周六</Option>
                  <Option value='周天'>周天</Option>
               </Select>
      break;
      case 'telephone':
        Doms =<div> <Input value={value} onBlur={e => this.phoneChange(e)} onChange={e => this.handleChange(e)}/> </div>
      break;
      default:
        Doms =<div> <Input value={value} onChange={e => this.handleChange(e)}/> </div>
    }

    return (
      <div>
        {
          editable ? (Doms) : (<div className="editable-row-text"> {value.toString() || ' '} </div>)
        }
      </div>
    );
  }
}