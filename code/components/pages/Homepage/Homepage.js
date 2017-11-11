import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim'
import TweenOne from 'rc-tween-one'
import { Row, Col } from 'antd'
// import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement
// import TweenOne from 'rc-tween-one'
// import 'rc-banner-anim/assets/index.css'
// const BgElement = Element.BgElement
const backgroundColor = '#eee'
export default class HomePage extends React.Component {
  render () {
    return (
      <div className='hello'>
        <style jsx>{`
            .title-head{
              font-size: 24px;
              color: #232323;
              letter-spacing: 4px;
              position: relative
            }
            .title-head::before{
              content: '';
              border-top: 1px solid #d2d2d2;
              width: 37px;
              display: block;
              position: absolute;
              right: 145px;
              top: 18px;
            }
            .title-head::after{
              content: '';
              border-top: 1px solid #d2d2d2;
              width: 37px;
              display: block;
              position: absolute;
              left: 140px;
              top: 18px;
            }
            .cus-card{
              width: 100%;
              position: relative;
              height:415px;
            }
            .cus-card-background{
              background: rgba(0, 0, 0, 0.1);
              width: 100%;
              position: absolute;
              height: 100%;
              display:inline;
            }
            .cus-text{  
              color: #fff;
              position: absolute; 
            }
            .cus-textTitle{
              font-size: 36px;
              top: 40%;
              text-align: center;
              width: 100%;
            }
            
            .card-summary{
              background: rgba(0, 0, 0, 0.4);
              width: 100%;
              position: absolute;
              height: 100%;
              display:none;
            }
            .cus-card:hover{
              .cus-card-background{
                display:none;
              }
              .card-summary{
                display:inline;
              }
            }
            .summary-border{
              top:35%;
              width: 100%;
              text-align: center;
              padding: 0px 100px;
              
            }
            .cus-textContent-title{
              font-size:28px;
            }
            .cus-textContent-summary{
              font-size:14px;
              letter-spacing: 1px;
            }
            @media screen and (max-width: 1200px) {
              .cus-textTitle{
                font-size:28px;
              }
            }
            @media screen and (max-width: 767px) {
              .cus-card {
                height:300px;
              }
              .cus-textTitle{
                font-size:35px;
              }
            }
            @media screen and (min-width: 768px) {
              .cus-card {
                height:240px;
              }
            }
            @media screen and (min-width: 992px) {
              .cus-card {
                height:315px;
              }
              
            }
            @media screen and (min-width: 1200px) {
              .cus-card {
                height:360px;
              }
            }
            @media screen and (min-width: 1400px) {
              .cus-card {
                height:380px;
              }
            }
            .cus-documentation-card{
              width: 100%;
              position: relative;
              height:188px;
            }
            .documentation-card-background{
              background: rgba(0, 0, 0, 0.2);
              width: 100%;
              position: absolute;
              height: 100%;
            }
            .documentation-textTitle{
              font-size:16px;
              color:#fff;
              top: 35%;
              position: absolute;
              width: 100%;
              text-align: center;
              letter-spacing: 3px;
              font-weight: 600;
            }
          `}
        </style>
        <style jsx global>{`
            .bg {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              overflow: hidden;
              background: #91d5a9;
            }
            .banner-user-title {
              top: 40%;
              font-size: 35px;
            }
            .banner-user-text {
              top: 40%;
              font-size: 18px;
            }
            .banner-user-elem {
              text-align: center;
              color: #fff;
            }
          `}
        </style>
        {/* banner --开始-- */}
        <div style={{ width: '100%', height: '620px' }}>
          <BannerAnim prefixCls='banner-user' autoPlay>
            <Element prefixCls='banner-user-elem' key='0'>
              <BgElement key='bg' className='bg' />
              <TweenOne
                className='banner-user-title'
                animation={{ y: 600, opacity: 0, type: 'from' }}
              >
                Ant Motion Banner
              </TweenOne>
              <TweenOne
                className='banner-user-text'
                animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
                The Fast Way Use Animation In React
              </TweenOne>
            </Element>
            <Element prefixCls='banner-user-elem' key='1'>
              <BgElement key='bg' className='bg' />
              <TweenOne
                className='banner-user-title'
                animation={{ y: 30, opacity: 0, type: 'from' }}
              >
                Ant Motion Banner
              </TweenOne>
              <TweenOne
                className='banner-user-text'
                animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
                The Fast Way Use Animation In React
              </TweenOne>
            </Element>
          </BannerAnim>
        </div>
        {/* banner --结束-- */}
        <div style={{ background: '#fff' }} className='content'>
          主页内容区域
        </div>
      </div>
    )
  }
}
