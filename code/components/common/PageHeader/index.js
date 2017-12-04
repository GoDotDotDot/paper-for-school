import React from 'react'
import {Row, Col} from 'antd'
export default (props) => {
  const {title, content, extraContent} = props
  return (<div>
    <style jsx>{`
    .title{
      margin-bottom:10px;
    }
    `
    }

    </style>
    <div>
      <h1 className='title'>{title || '标题'}</h1>
      <div className='content'>
        <Row>
          <Col span={extraContent ? 18 : 24}>{content || ''}</Col>
          {extraContent && <Col span={6}>{extraContent || ''}</Col>}
        </Row>
      </div>
    </div>
  </div>)
}
