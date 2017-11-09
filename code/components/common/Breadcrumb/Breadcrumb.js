import { Breadcrumb } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
// import scss from './styles/index.scss'
export const breadcrumbNameMap = {
  '/': '首页',
  '/monitorVideo': '监控视频',
  '/deviceStatus': '设备运行状态',
  '/deviceControl': '设备运行控制',
  '/monitorData': '监测数据',
  '/thresholdSetting': '阀值设置',
  '/montorDataQuery': '监测数据查询',
  '/operatorSetting': '值班人员设置',
  '/logs': '日志'
}
const CusBreadcrumb = props => {
  const { pathname } = props
  const pathSnippets = pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link href={url}>
          <a>{breadcrumbNameMap[url]}</a>
        </Link>
      </Breadcrumb.Item>
    )
  })
  return extraBreadcrumbItems.length === 0 ? null : (
    <div className='breadcrumb-container'>
      <Head>
      </Head>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>{' '}
    </div>
  )
}
export default CusBreadcrumb
