import React from 'react'
const CirclePanel = (props) => {
  const {type, num, unit, name, style} = props

  const cls = 'circle-panel ' + (type ? 'circle-' + type : 'circle-primary')
  return (
    <div className={cls} style={style || null}>
      <style jsx>{`
      .circle-panel {
        width:108px;height:108px;
        border-radius: 100%;
        background: #fff;
        border: 6px solid;    
        display:inline-block；
        float:left;            
      }
      .circle-panel .circle-row{
        text-align:center        
      }
      .circle-row .circle-num{
        font-size:30px;
      }
      .circle-row .circle-unit{
        font-size:12px;
      }
      .circle-row .circle-name{
        font-size:12px;
        color:#989898;
      }
      .circle-primary{
        border-color:#e6e6e6;        
      }
      .circle-primary .circle-num, .circle-primary .circle-unit{
        color:#0599d9;
      }
      .circle-danger{
        border-color: #f58d8e;
      }
      .circle-danger .circle-num, .circle-danger .circle-unit{
          color:#f58d8e;
      }
    `}</style>
      <div className='circle-row' style={{marginTop: 10}}>
        <span className='circle-num'>{num || '0'}</span>
        <span className='circle-unit'>{unit ==='没有单位'? '':'mg/L'}</span>
      </div>
      <div className='circle-row'>
        <span className='circle-name'>{name || 'PH(酸碱度)'}</span>
      </div>
    </div>
  )
}
export default CirclePanel
