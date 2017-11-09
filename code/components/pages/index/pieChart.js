import React from 'react'
import ReactEcharts from '../../common/Echart/echart-react'
export default class PieChart extends React.Component{
    constructor(props){
        super(props)
    }
    getOption(){
        let {title,total,okValue} =this.props;
     let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name:title,
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                     label: {
                        normal: {
                            formatter:'{b}:\n\n{c}',
                            rich: {
                                b: {
                                    fontSize:14,
                                    color:'#858585'
                                },
                                c:{
                                    align:"left",
                                }
                            }
                        }
                    },
                    data:[
                        {   value:total, 
                            name:`${title === '设备情况' ? "共有设备" : "今日报警" }`,
                            itemStyle:{
                                normal:{color:'#115b99'}
                              }

                        },
                        {
                            value:okValue,
                            name:`${title === '设备情况' ? "正在运行" : "已阅读" }`,
                            itemStyle:{
                                normal:{color:'#1692f2'}
                            }
                        },        
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }
    render(){
        return(
            <ReactEcharts option={this.getOption()} style={{marginTop:'-30px',marginLeft:'-10px',height:'166px',width:'300px'}} />
        )
    }
} 