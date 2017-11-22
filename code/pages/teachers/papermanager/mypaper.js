/*
 * @Author: 储奎 / GoDotDotDot
 * @Date: 2017-09-28 10:32:21
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-18 19:42:57
 */

import CusLayout from '../../../teachersLayout.js'
import React from 'react'
// import scss from '../public/styles/index/index.scss'
import {message, Layout, Table, Popconfirm, Button,Modal} from 'antd'
import Head from 'next/head'
import {ctx} from 'md_public/scripts/golbalStatic'
import mdAjax from 'md_utils/md-service/md-ajax'
import Link from 'next/link'
import WrappedNormalSearchForm from 'com_common/PaperSearch'
import WrappedNormalEdithForm from 'com_common/PaperSearch/edit'


export default class Index extends React.Component {
  static async getInitialProps ({ req, pathname }) {
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { pathname }
  }
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      visible:false,
      editDefaultData:{}
    }
    this.columns = [
      {
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher'
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      }, {
        title: '职称/学历',
        dataIndex: 'professional',
        key: 'professional'
      }, {
        title: '题目名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '题目来源',
        dataIndex: '_from',
        key: '_from'
      }, {
        title: '题目类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '社会实践',
        dataIndex: 'hasAction',
        key: 'hasAction'
      },
      //  {
      //   title: '题目简介',
      //   dataIndex: 'brief',
      //   key: 'brief'
      // }, 
      // {
      //   title: '题目要求',
      //   dataIndex: '_require',
      //   key: '_require'
      // }, {
      //   title: '预期成果',
      //   dataIndex: 'achieve',
      //   key: 'achieve'
      // },
       {
        title: '与专业符合度',
        dataIndex: 'conformity',
        key: 'conformity'
      }, {
        title: '预计难易程度',
        dataIndex: 'degree',
        key: 'degree'
      }, {
        title: '预计工作量大小',
        dataIndex: 'workload',
        key: 'workload'
      }, {
        title: '操作',
        key: 'operator',
        render: (text, record) => {
          return (<Button onClick={(record,a,b)=>{
            debugger
            this.editPaperHandle(record)}}>编辑</Button>)
        }
      }]
  }
  editPaperHandle = (record)=>{
    this.editId = record.id
    mdAjax.get(`${ctx}api/teachers/paper/byId?id=${record.id}`)
    .then((rst)=>{
      if(rst.success){
        this.setState({visible:true,editDefaultData:rst.data[0]})
      }
    })
  }
  handleCancel=()=>{
    this.setState({visible:false})
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  paperEditSubmit = (values)=>{
    mdAjax.post(`${ctx}api/teachers/paper/update`,{
     ...values,
     id:this.editId
    })
    .then(rst=>{
      if(rst.success){
        const {dataSource} = this.state
        const editItemIndex = dataSource.findIndex(ele=>ele.id === this.editId)
        dataSource[editItemIndex] = {id:this.editId,...values}
        this.setState({dataSource,visible:false})
      }
      console.log(rst)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  formSubmit = (values)=>{
    mdAjax.get(`${ctx}api/teachers/paper?grade=${values.grade}&master=${values.master}&teacher=${values.teacher}&title=${values.title}`)
    .then(rst=>{
      if(rst.success){
        const dataSource = rst.data
        this.setState({dataSource})
      }
      console.log(rst)
    })
  }
  deletePaperHandle= ()=>{
    const id = this.state.selectedRowKeys
    mdAjax.post(`${ctx}api/teachers/paper/delete`,{id})
    .then(rst=>{
      if(rst.success){
        const {dataSource} = this.state
        const dt = dataSource.filter((ele)=>{
          return !id.some((_ele)=>_ele===ele.id)
        })
        message.success(rst.message)
        this.setState({dataSource:dt,selectedRowKeys:[]})
      }else{
        message.error(rst.message)
        
      }
      console.log(rst)
    })
    .catch(err=>{
      console.log(err)
      message.success('发生了一点错误：'+err)
      
    })
  }
  render () {
    const {pathname} = this.props
    const {dataSource,selectedRowKeys,editDefaultData} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: false,
    };
    const columns = [
      {
        title: '指导教师',
        dataIndex: 'teacher',
        key: 'teacher'
      }, {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      }, {
        title: '职称/学历',
        dataIndex: 'professional',
        key: 'professional'
      }, {
        title: '题目名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '题目来源',
        dataIndex: '_from',
        key: '_from'
      }, {
        title: '题目类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '社会实践',
        dataIndex: 'hasAction',
        key: 'hasAction'
      },
      //  {
      //   title: '题目简介',
      //   dataIndex: 'brief',
      //   key: 'brief'
      // }, 
      // {
      //   title: '题目要求',
      //   dataIndex: '_require',
      //   key: '_require'
      // }, {
      //   title: '预期成果',
      //   dataIndex: 'achieve',
      //   key: 'achieve'
      // },
       {
        title: '与专业符合度',
        dataIndex: 'conformity',
        key: 'conformity'
      }, {
        title: '预计难易程度',
        dataIndex: 'degree',
        key: 'degree'
      }, {
        title: '预计工作量大小',
        dataIndex: 'workload',
        key: 'workload'
      }, {
        title: '操作',
        key: 'operator',
        dataIndex: 'operator',        
        render: (text, record,index) => {
          return (<Button onClick={()=>{
            console.log(text,record,index)
            this.editPaperHandle(record)}}>编辑</Button>)
        }
      }]
    // const {sensor,warn,person} = this.state;
    return (
      <CusLayout className='ant-layout-has-sider' pathname={pathname}>
        <style jsx>{`.search{
          // height:100px;
          background:#fff;
          padding:20px
        }
        .result{
          padding:20px;
          margin:20px;
          background:#fff;
          min-height:300px;
          .operator{
            margin:10px;
            margin-left:0px
          }
        }
      `
      }</style>
        <div className='search'>
          <span>请输入查询条件：</span>
          <WrappedNormalSearchForm formSubmit={this.formSubmit} />
        </div>
        <Modal
          title="命题编辑"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
        
       <WrappedNormalEdithForm onEditSubmitHandle={this.paperEditSubmit} dataSource={editDefaultData}/>
        </Modal>
        <div className='result'>
          <div className='operator'>
            <Button type='danger' disabled={selectedRowKeys.length === 0} style={{marginRight: 20}} onClick={this.deletePaperHandle}>删除命题</Button>
          </div>
          <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} rowKey={r=>r.id} size='small'/>
        </div>
      </CusLayout>
    )
  }
}
