
import React from 'react'

export default class CanvasLogin extends React.Component {
  componentDidMount () {
    let canvas, ctx
    let vertexes = []
    let diffPt = []
    let autoDiff = 1000
    let verNum = 250
    let numCount = 0
    let canvasW = window.innerWidth + 40
    let inputDOms = document.getElementsByTagName('input')
        // 添加事件
    let addListener = function (e, str, func) {
      if (e.addEventListener) {
        e.addEventListener(str, func, false)
      } else if (e.attachEvent) {
        e.attachEvent('on' + str, func)
      } else {

      }
    }

    addListener(window, 'load', init)

        //
    function resize () {
      canvasW = document.getElementById('__next').offsetWidth + 40
      initCanvas(canvasW, window.innerHeight)
      let cW = canvas.width
      let cH = canvas.height
      for (let i = 0; i < verNum; i++) { vertexes[i] = new Vertex(cW / (verNum - 1) * i, cH / 2, cH / 2) }
      initDiffPt()
      let win_3 = window.innerWidth / 3
    }
    let FPS = 30
    let interval = 1000 / FPS >> 0
    let timer = setInterval(update, interval)

    function init () {
      resize()
      if (window.addEventListener)
            // addListener( window, "DOMMouseScroll", wheelHandler );
            // addListener( window, "mousewheel", wheelHandler );
              { addListener(window, 'resize', resize) }
            // input 的键盘事件

      for (let i = 0; i < inputDOms.length; i++) {
        inputDOms[i].onkeydown = function () {
          autoDiff = 1000
          xx = 125
          diffPt[xx] = autoDiff
        }
      }

            // canvas.onmousedown=function(e)
            // {
            //         //div.innerHTML=e.clientX+":"+e.clientY;
            //         //let mx = document.getElementById("mx");

            //         // alert(1);
            // let mouseX,mouseY;
            //         if (e) {
            //             mouseX = e.pageX;
            //             mouseY = e.pageY;
            //         }else {
            //         mouseX = event.x + document.body.scrollLeft;
            //         mouseY = event.y + document.body.scrollTop;
            //         }

            //         if(window.innerHeight/2 - mouseY < 50 && window.innerHeight/2 - mouseY> -50)
            //             //diffPt[150] = autoDiff;
            //             {
            //             autoDiff = 1000;
            //             if(mouseX<canvas.width-2){
            //                 xx = 125

            //                 diffPt[xx] = autoDiff;
            //             }

            //             }
            // }
    }

        // let wheelHandler = function( e ) {
        //         let s = ( e.detail ) ? -e.detail : e.wheelDelta;
        //         s > 0 ? ( dd > 15 ? dd-- :  dd=dd) : ( dd < 50 ? dd++ : dd=dd );
        // };

    function initDiffPt () {
      for (let i = 0; i < verNum; i++) { diffPt[i] = 0 }
    }
    let xx = 150
    let dd = 15
    function update () {
            // ctx.rect(50,20,280,620);
            // ctx.stroke();
            // ctx.clip();
            // console.log(1)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      autoDiff -= autoDiff * 0.9
      diffPt[xx] = autoDiff
            // 左侧
            // 差分，使得每个点都是上一个点的下一次的解，由于差分函数出来的解是一个曲线，且每次迭代后，曲线相加的结果形成了不断地波浪
      for (let i = xx - 1; i > 0; i--) {
        let d = xx - i
        if (d > dd)d = dd
        diffPt[i] -= (diffPt[i] - diffPt[i + 1]) * (1 - 0.01 * d)
      }
            // 右侧
      for (let i = xx + 1; i < verNum; i++) {
        let d = i - xx
        if (d > dd)d = dd
        diffPt[i] -= (diffPt[i] - diffPt[i - 1]) * (1 - 0.01 * d)
      }

            // 更新点Y坐标
      for (let i = 0; i < vertexes.length; i++) {
        vertexes[i].updateY(diffPt[i])
      }
      draw()
    }
    let color1 = '#6ca0f6'
    let color2 = '#0591d9'
        // 画布的绘画
    function draw () {
      ++numCount
      if (numCount > 80) {
        numCount = 0
        window.clearInterval(timer)
        timer = setInterval(update, interval)
        autoDiff = 1000
        xx = 125
        diffPt[xx] = autoDiff
      }
      ctx.beginPath()
      ctx.moveTo(0, window.innerHeight)
      ctx.fillStyle = color1
      ctx.lineTo(vertexes[0].x, vertexes[0].y)
      for (let i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x, vertexes[i].y)
      }
      ctx.lineTo(canvas.width, window.innerHeight)
      ctx.lineTo(0, window.innerHeight)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, window.innerHeight)
      ctx.fillStyle = color2
      ctx.lineTo(vertexes[0].x + 15, vertexes[0].y + 5)
      for (let i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x + 15, vertexes[i].y + 5)
      }
      ctx.lineTo(canvas.width, window.innerHeight)
      ctx.lineTo(0, window.innerHeight)
      ctx.fill()
            // ctx.fillStyle="#777";
            // ctx.font="12px sans-serif";
            // ctx.textBaseline="top";
            // ctx.fillText("点击该液体的表面",70,canvas.height/2-20);
            // ctx.fillStyle="#fff";
            // ctx.fillText("用鼠标滚轮来改变粘度",70,canvas.height/2+15);
            // ctx.fillText("滚轮改变粘稠度 / Viscosity: "+((dd-15)*20/7).toFixed(2)+"%",70,canvas.height-20);
    }
    let initCanvas = (width, height) => {
      canvas = this.refs.canvas_login
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
    }

    function Vertex (x, y, baseY) {
      this.baseY = baseY
      this.x = x
      this.y = y
      this.vy = 0
      this.targetY = 0
      this.friction = 0.15
      this.deceleration = 0.95
    }

    Vertex.prototype.updateY = function (diffVal) {
      this.targetY = diffVal + this.baseY
      this.vy += this.targetY - this.y
      this.y += this.vy * this.friction
      this.vy *= this.deceleration
    }
    let blue = function () {
      color1 = '#6ca0f6'
      color2 = '#367aec'
    }
    let black = function () {
      color1 = '#595959'
      color2 = '#000000'
    }

    let purple = function () {
      color1 = '#ff92ec'
      color2 = '#f727d2'
    }
  }
  render () {
    return (
      <canvas id='canvas' ref='canvas_login'>
                对不起！您的浏览器不支持canvas，请升级浏览器！
            </canvas>
    )
  }
}
