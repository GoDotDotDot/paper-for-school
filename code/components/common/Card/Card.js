import React from 'react'
import scss from './styles/Card.scss'
import Head from 'next/head'

const Card = (props) => {
  return (
    <div className='card-body'>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: scss }} />
      </Head>
      {props.children}
    </div>
  )
}
export default Card
