import React from 'react'
import classNames from 'classnames'
import { Icon } from 'antd'

export default function Result ({
  className, type, title, description, extra, actions, ...restProps
}) {
  const iconMap = {
    error: <Icon className={'antd-pro-error'} type='close-circle' />,
    success: <Icon className={'antd-pro-success'} type='check-circle' />
  }
  const clsString = classNames('antd-pro-result', className)
  return (
    <div className={clsString} {...restProps}>
      <div className={'antd-pro-icon'}>{iconMap[type]}</div>
      <div className={'antd-pro-title'}>{title}</div>
      {description && <div className={'antd-pro-description'}>{description}</div>}
      {extra && <div className={'antd-pro-extra'}>{extra}</div>}
      {actions && <div className={'antd-pro-actions'}>{actions}</div>}
    </div>
  )
}
