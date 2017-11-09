/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-28 10:54:00
 * @Last Modified by: 璟睿 / tiramisu18
 * @Last Modified time: 2017-09-28 13:47:47
 */

import React from 'react'
import scss from './styles/ControlPanel.scss'
import Head from 'next/head'

const ControlPanel = (props) => (
  <div className='controlPanel'>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: scss }} />
    </Head>
    <div className='controlPanel-title'>
      {props.title}
    </div>
    <div className='controlPanel-content'>
      {props.children}
    </div>
  </div>
)
export default ControlPanel
