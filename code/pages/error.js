import React from 'react'
import Head from 'next/head'
// import scss from '../public/styles/error/index.scss'

export default class Page extends React.Component {
  constructor () {
    super()
    this.click = this.click.bind(this)
  }

  static async getInitialProps ({query}) {
    const code = query.code || 500
    const {m} = query
    return { code, m }
  }
  click () {
    window.location = '/'
  }

  render () {
    const { code, m } = this.props
    return <div className='error-content'>
      <style jsx>{`
      .error-content{
        background-image:url(../static/images/errblueprint.png);
        background-color: #f2f2f2;
        width: 1920px;
        height: 1058px;
        position: relative;
        top: -21px;
        .content-border{
            width: 320px;
            padding: 90px 0;
            margin: auto;
            position: relative;
        }
        .content-errorPin{
            width: 38px;
            height: 38px;
            margin: auto;
            z-index: 10;
            position: relative;
            background: url(../static/images/errorPin.png) no-repeat center center;
            margin-bottom: -31px;
        }
        .content-errorHanger{
            width: 285px;
            height: 170px;
            padding: 127px 16px 0 16px;
            position: relative;
            margin: auto;
            margin-bottom: 20px;
            z-index: 5;
            line-height: 1;
            font-size: 32px;
            text-align: center;
            color: #444;
            background: url(../static/images/errorHanger.png) no-repeat center center;
            /*-webkit-animation: error-swing infinite 2s ease-in-out alternate;*/
            animation: error-swing infinite 2s ease-in-out alternate;
            transform-origin: center top;
        }
        @-webkit-keyframes error-swing{
            0% {transform: rotate(1deg);}
            100% {transform: rotate(-2deg);}
        }
        .content-text{
            text-align: center;
            font-size: 24px;
            color: #e15656;
        }
        .content-inline{
            position: relative;
            top: -28px;
            width: 421px;
            left: -51px;
            border: none;
            border-top: 4px dotted #444444;
            /* border-top: 6px double #444444; */
        }
        .content-buttonBorder{
            width: 100px;
            height: 27px;
            margin: auto;
            position: relative;
            top: -11px;
        }
        .content-button{
            width: 100px;
            background: #444444;
            border: 1px solid #444444;
            height: 27px;
            border-radius: 4px;
            color: #f7f2f2;
        }
    }`}</style>
      <Head>
      </Head>
      <div className='content-border'>
        <div className='content-errorPin' />
        <div className='content-errorHanger'>
          <h1>{code}</h1>
        </div>
        <h5 className='content-text'>{m}</h5>
        <hr className='content-inline' />
        <div className='content-buttonBorder'><button className='content-button' onClick={this.click}>返回首页</button></div>
      </div>
    </div>
  }
}
Page.defaultProps = {
  m: 'this is a error'
}
