/*
 * @Author: 璟睿 / tiramisu18
 * @Date: 2017-09-28 14:00:53
 * @Last Modified by: 璟睿 / tiramisu18
 * @Last Modified time: 2017-09-28 14:17:47
 */

import React from 'react'
import scss from './styles/SwitchStatus.scss'
import Head from 'next/head'

const SwitchStatus = (props) => {
  let switchColor, swithName
  if (props.switchStatus) {
    switchColor = '#108ee9'
    swithName = '开'
  } else {
    switchColor = '#bfbfbf'
    swithName = '关'
  }
  return (
    <span className='switchStatus' style={{background: switchColor}}>
      {swithName}
      <Head>
        <style dangerouslySetInnerHTML={{ __html: scss }} />
      </Head>
    </span>
  )
}
export default SwitchStatus
