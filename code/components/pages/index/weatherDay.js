import React from 'react'
import Head from 'next/head'
import scss from './style/icon.scss'
const weatherPic ={
    '晴':'#icon-tianqitubiao_qingtianbai',
    '阴':'#icon-tianqitubiao_yin',
    '雾':'#icon-tianqitubiao_wu',
    '多云':'#icon-tianqitubiao_duoyun',
    '小雨':'#icon-tianqitubiao_xiaoyu',
    '小到中雨':'#icon-tianqitubiao_xiaozhuanzhongyu',
    '中雨':'#icon-tianqitubiao_zhongyu',
    "中到大雨":'#icon-tianqitubiao_zhongzhuandayu',
    '大雨':'#icon-tianqitubiao_dayu',
    '雷阵雨':'#icon-tianqitubiao_leizhenyu',
    '阵雨':'#icon-tianqitubiao_zhenyu',
    '暴雨':'#icon-tianqitubiao_baoyu',
    "大暴雨":'#icon-tianqitubiao_baoyu',
    "特大暴雨":'#icon-tianqitubiao_baoyu',
    "大到暴雨":'#icon-tianqitubiao_dazhuanbaoyu',
    "暴雨到大暴雨":'#icon-tianqitubiao_baoyu',
    "大暴雨到特大暴雨":'#icon-tianqitubiao_baoyu',
    "阵雪":'#icon-tianqitubiao_zhenxue',
    "沙尘暴":"#icon-tianqitubiao_yangsha",
    "浮尘":'#icon-tianqitubiao_yangsha',
    "强沙尘暴":'#icon-tianqitubiao_qiangshachenbao',
    "扬沙":'#icon-tianqitubiao_yangsha',
    '雾霾':'#icon-tianqitubiao_wu',
    "冻雨":'#icon-tianqitubiao_dongyu',
    '雷阵雨伴有冰雹':'#icon-tianqitubiao_leizhenyudaibingbao',
    '雨夹雪':'#icon-tianqitubiao_yujiaxue',
    '大风':'#icon-tianqitubiao_dafeng',
    '小雪':'#icon-tianqitubiao_xiaoxue',
    "阵雪":'#icon-tianqitubiao_zhenxue',
    '小转中雪':'#icon-tianqitubiao_xiaozhuanzhongxue',
    '中雪':'#icon-tianqitubiao_zhongxue',
    "中转大雪":'#icon-tianqitubiao_zhongzhuandaxue',
    "大雪":'#icon-tianqitubiao_daxue',
    "大转暴雪":'#icon-tianqitubiao_dazhuanbaoxue',
    "暴雪":'#icon-tianqitubiao_baoxue',
    '无天气类型':'#icon-tianqizhushou',   
}
export default class WeatherDay extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {week,date,temperature,type,wind,modal,currentTem} = this.props;
   
        return(
            <div className={modal === "now" ? "nowCard_weather" : "card_weather" }>
               <Head>
                    <style dangerouslySetInnerHTML={{ __html: scss }} />
                    {<script src='../../../static/images/font/iconfont.js'></script>}
               </Head>
               { modal === "now" ? <div>
                                        <span className='pic_weather'>
                                            <svg class="icon" aria-hidden="true">
                                                <use  xlinkHref={weatherPic[type]}></use>
                                            </svg>
                                        </span>   
                                        <p style={{fontSize:'35px',lineHeight:'45px',color:"#1692f2"}}>
                                            {currentTem}
                                            <span style={{marginLeft:'8px'}}>℃(实时)</span>
                                        </p> 
                                        <span style={{lineHeight:'30px'}}>{temperature}</span>
                                        <p>{type}</p>
                                        <p>{wind}</p>      
                                    </div> 
                                  : <div>
                                        <span>{week}</span>
                                        <p>{date}</p> 
                                        <span className='pic_weather'>
                                            <svg class="icon" aria-hidden="true">
                                                <use  xlinkHref={weatherPic[type]}></use>
                                            </svg>
                                        </span>         
                                        <span style={{lineHeight:'30px'}}>{temperature}</span>
                                        <p>{type}</p>
                                        <p>{wind}</p>      
                                    </div> 
             }
               
            </div>
        )
    }
}
 
