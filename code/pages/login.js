/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-10-11 14:57:55
 * @Last Modified by: 储奎 / GoDotDotDot
 * @Last Modified time: 2017-11-09 23:19:03
 */

import React from 'react'
import LoginForm from '../components/common/Login/Login'
import Head from 'next/head'
import CanvasLogin from '../components/pages/Login/canvasLogin'
// import scss from '../public/styles/login/index.scss'

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <style jsx>{`.login{
  width: 375px;
  margin-left:58% ;
  background:#ffffff;
  position: absolute;
  z-index:3;
  top: 14%;
  height: 432px;
  -moz-box-shadow:-2px -2px 21x rgba(102, 102, 102, 0.5), 2px 0px 5px rgba(102, 102, 102, 0.5); 
  -webkit-box-shadow:-2px -2px 21px rgba(102, 102, 102, 0.5), 2px 0px 5px rgba(102, 102, 102, 0.5);
  box-shadow:-2px -2px 21px rgba(102, 102, 102, 0.5), 2px 0px 5px rgba(102, 102, 102, 0.5);
}
.fish_login{
  position: absolute;
  left:23.7%;
  top:30%;
}
.foot{
  text-align: center;
  color:#d2dee4;
  position: absolute;
  bottom: 0px;
  height:70px;
  background-color: #0591d9;
  width: 100%;
  p{
    width:100%;
    height:100%;
    padding-top:10px;
  }
}
canvas{
  margin-left:-40px;
  position: absolute;
  left: 0;
  top: 0;
}
.header{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height:70px;
  h1{
    display: inline-block;
    margin-left: 50px;
    img{
      height: 70px;
      vertical-align: middle;
    }
  }
}
`}</style>
        <style jsx global>{`
body{
  overflow-x: hidden;
}`}
        </style>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link
            rel='stylesheet'
            href='//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css'
          />
        </Head>
        <div>
          <div className='header'>
            <h1><img src='././static/images/logo.png ' alt='' /></h1>
          </div>
          <img className='fish_login' src='../static/images/fish_login.png' alt='小鱼哦' />
          <div className='login'>
            <LoginForm />
          </div>
          <CanvasLogin />

          <div className='foot' >
            <p>
             川5946snw ©2017易科捷（武汉）生态科技有限公司
            </p>
          </div>
        </div>

      </div>
    )
  }
}
