import React from 'react'
import scss from './style/index.scss'
import Head from 'next/head'

const PopCard = (props)=>{
    return(
        <div className='popCard'>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>         
            <div className='title_card' >  
                <span style={{background:`url('../../../static/images/icons.png') ${props.left}px  0px  no-repeat`,color:'#858585',width:'25px',height:"25px",display:'block',float:'left',marginRight:"8px"}}>

                </span>
                <span style={{display:'block',float:'left',fontSize:'18px'}}>
                    {props.title}   
                </span>
                      
            </div>
            <div className='popCard_con'>
                {props.children}
            </div>                
           
        </div>
    )
}

export default PopCard;