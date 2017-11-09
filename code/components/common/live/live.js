
import React from 'react'
import Head from 'next/head'
import scss from './style/index.scss'
// import videojs from 'video.js'  

export default class Live extends React.Component {
  state =  {
    mounted:false
  }
  componentDidMount () {
    // debugger
    this.setState({mounted:true},()=>{
      var myPlayer = videojs(this.props.pid,{},function(){
        this.play();
      })
      // videojs(this.props.pid).ready(() => {
      //   videojs(this.props.pid).play()
      // })
    })
    
  }
  componentWillUnmount () {
    videojs(this.props.pid).dispose() // 不销毁要报错
  }
  render () {
    let { widths, heights, pid, videoUrl, marL, marT, marB } = this.props
    return (
      <div style={{marginBottom: '47px'}}>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: scss }} />
        </Head>
        {this.state.mounted ?<video
          style={{
            width: `${widths}`,
            height: `${heights}`,
            marginTop: `${marT}`,
            borderRadius: '10px',
            marginBottom: `${marB}`
          }}
          id={pid}
          className='video-js vjs-default-skin vjs-big-play-centered'
          controls
          preload='auto'
          poster='./images/oceans.png'
          data-setup='{"techOrder": ["html5", "flash"]}'
        >
          <source src={videoUrl} />
          <p className='vjs-no-js'>
            你的浏览器不支持此HTML播放器，请升级你的浏览器
            <a href='http://videojs.com/html5-video-support/' target='_blank'>
              supports HTML5 video
            </a>
          </p>
        </video>:null}
        
      </div>
    )
  }
}