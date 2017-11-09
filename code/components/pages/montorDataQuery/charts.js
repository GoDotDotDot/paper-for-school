import React from 'react'
import ReactEcharts from '../../common/Echart/echart-react'
import Card from '../../common/Card/Card'
import Head from 'next/head'
import scss from './style/index.scss'

export default class Charts extends React.Component {
  constructor (props) {
    super(props)
  }
  getOption () {
     let {chartData} = this.props;
     let option = {
        title: {
            text:chartData.type
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:chartData.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData.xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };
     chartData.series.map((ele,index)=>{
        option.series.push({
                name:chartData.legend[index],
                type:'line',
                data:ele.data
        })
     })

    return option
  }

  render () {
    return (
      <Card>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
        <ReactEcharts option={this.getOption()} />
      </Card>
    )
  }
}
