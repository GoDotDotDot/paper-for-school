import React from 'react'
import ReactEcharts from '../../common/Echart/echart-react'
import {message} from 'antd'
import mdAjax  from "../../../components/utils/md-service/md-ajax" 
import {ctx} from '../../../public/scripts/golbalStatic'
export default class TemperatureChart extends React.Component{
    constructor(props){
        super(props)
    }
    state={
        chartData:{
            xAxis:[],
            series:[]
        }
    }
    componentDidMount(){
        mdAjax.get(ctx+'getIndexTemperatureChartData',{cache:false})
                .then((data)=>{
                    this.setState({
                        chartData:data.chartData
                    })
                }).catch((e)=>{
                    message.error(e.message);
                })
    }
    
    getOption(){
       let {chartData} = this.state;
       let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#2699f3'
                    }
                }
            },
         
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : chartData.xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'温度',
                    type:'line',
                    stack: '总量',
                    itemStyle:{
                        normal:{color:'#2699f3'}
                    },
                    areaStyle: {normal: {
                       color: "#b2daf9"
                    }},
                    data:chartData.series
                }
            ]
        };  
        return option       
    }
    render(){
        return(
            <ReactEcharts option={this.getOption()}  style={{height:"300px"}}/>
        )
    }
}